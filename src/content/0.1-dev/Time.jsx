import { ApiTable, CodeBlock, Lead, Note, Section, Subheading } from './Shared.jsx'

export default function TimeChapter() {
  return (
    <Section id="v010dev-time" title="2.16 Time">
      <Lead>
        <code>std.time</code> distinguishes elapsed time, Unix instants, monotonic readings, and civil calendar
        values. Keeping these types separate prevents accidental conversion of a stopwatch reading into a date
        and avoids applying calendar rules to a fixed duration.
      </Lead>
      <ApiTable rows={[
        ['Duration', 'Exact signed seconds plus a normalized nanosecond adjustment.'],
        ['Instant', 'A point on the Unix time line, independent of time zone.'],
        ['MonotonicInstant', 'Opaque process clock reading for elapsed-time measurement only.'],
        ['LocalDate', 'Validated proleptic-Gregorian year, month, and day.'],
        ['LocalTime', 'Validated hour, minute, second, and nanosecond.'],
        ['UtcOffset', 'Fixed offset from UTC, bounded to +/-18 hours.'],
        ['DateTime', 'LocalDate + LocalTime + UtcOffset.'],
        ['Clock', 'Injectable source of wall-clock and monotonic time.'],
      ]} />

      <Subheading>Exact durations</Subheading>
      <p>
        Build durations with <code>seconds</code>, <code>milliseconds</code>, <code>minutes</code>, and friends,
        and combine them with <code>plus</code> and <code>minus</code>. Nanoseconds are normalized into
        <code> 0..999,999,999</code>, keeping equality and arithmetic canonical.
      </p>
      <CodeBlock>{`module playground

import std.io
import std.time

func main() {
    fin timeout = seconds(2).plus(milliseconds(250))
    fin retryDelay = milliseconds(500)
    fin remaining = timeout.minus(retryDelay)
    println(remaining.inWholeMilliseconds)
}`}</CodeBlock>

      <Subheading>Wall clock versus monotonic clock</Subheading>
      <CodeBlock>{`module playground

import std.io
import std.time

func work(): Int {
    var total = 0
    for i in 0..<1000 { total += i }
    return total
}

func measure(): Long ?! TimeError {
    fin started = monotonicNow()
    println(work())
    fin finished = monotonicNow()
    fin elapsed = try finished.elapsedSince(started)
    return elapsed.inWholeMilliseconds
}

func main() {
    fin ms = measure() catch -1
    println(ms >= 0)
}`}</CodeBlock>
      <Note tone="yellow">
        Measure elapsed time with <code>MonotonicInstant</code>. Wall clocks can jump because of synchronization,
        manual changes, or virtualization. Use <code>Instant</code> (from <code>now()</code>) for timestamps that
        must be exchanged or stored.
      </Note>

      <Subheading>Validated civil values and ISO-8601</Subheading>
      <p>
        <code>localDate</code>, <code>localTime</code>, and <code>utcOffsetOf</code> validate at construction and
        fail with <code>TimeError</code>. February length follows Gregorian leap-year rules; leap seconds are not
        represented. <code>parseIsoDateTime</code> accepts four-digit years, one to nine fractional-second digits,
        <code> Z</code>, and minute- or second-precision offsets.
      </p>
      <CodeBlock>{`module playground

import std.io
import std.time

func meeting(): String ?! TimeError {
    fin date = try localDate(2026, 7, 16)
    fin time = try localTime(14, 30, 0, 125000000)
    fin offset = try utcOffsetOf(3)
    return formatIsoDateTime(dateTime(date, time, offset))
}

func stored(): String ?! TimeError {
    fin event = try parseIsoDateTime("2026-07-16T14:30:00.125+03:00")
    return formatIsoInstant(toInstant(event))
}

func main() {
    println(meeting() catch "invalid")
    println(stored() catch "invalid")
    println(isLeapYear(2028))
    println(daysInMonth(2026, 2) catch 0)
}`}</CodeBlock>

      <Subheading>Offsets are not named time zones</Subheading>
      <p>
        A UTC offset is a fixed displacement; it does not know daylight-saving transitions. Store an
        <code> Instant</code> for durable events and apply an offset at presentation time.
      </p>
      <CodeBlock>{`module playground

import std.io
import std.time

func show(): String ?! TimeError {
    fin utc = try utcOffset(0)
    fin summer = try utcOffsetOf(3)
    fin stamp = instant(1784205000)
    println(formatIsoDateTime(atOffset(stamp, utc)))
    return formatIsoDateTime(atOffset(stamp, summer))
}

func main() {
    println(show() catch "invalid")
}`}</CodeBlock>

      <Subheading>Injectable clocks</Subheading>
      <p>
        Pass a <code>Clock</code> into business logic instead of calling the system clock everywhere. Tests can
        then use a fixed or manually advanced clock without sleeping.
      </p>
      <CodeBlock>{`module playground

import std.io
import std.time

pack FixedClock {
    fin value: Instant
    fin monotonic: MonotonicInstant
}

impl Clock for FixedClock {
    func &.now(): Instant = self.value
    func &.monotonicNow(): MonotonicInstant = self.monotonic
}

func stamp(clock: Clock&): String {
    return formatIsoInstant(clock.now())
}

func main() {
    fin clock = FixedClock(instant(0), MonotonicInstant(0))
    println(stamp(clock))
}`}</CodeBlock>

      <Subheading>Serialization</Subheading>
      <ApiTable rows={[
        ['InstantSerializer', 'Canonical UTC ISO-8601 string.'],
        ['DateTimeSerializer', 'Canonical offset ISO-8601 string.'],
        ['DurationSerializer', 'Object containing seconds and nanosecondAdjustment.'],
      ]} />
    </Section>
  )
}
