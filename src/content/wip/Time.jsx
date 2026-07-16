import { ApiTable, CodeBlock, Lead, Note, Section, Subheading } from './Shared.jsx'

export default function TimeChapter() {
  return (
    <Section id="wip-time" title="2.3 Time">
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
        Durations normalize nanoseconds into <code>0..999,999,999</code>. Negative fractional values carry their
        sign in the seconds field, keeping equality and arithmetic canonical.
      </p>
      <CodeBlock>{`use std.time

fin timeout = seconds(2) + milliseconds(250)
fin retryDelay = milliseconds(500)
fin remaining = timeout - retryDelay

println(remaining.inWholeMilliseconds) // 1750`}</CodeBlock>

      <Subheading>Wall clock versus monotonic clock</Subheading>
      <CodeBlock>{`fin started = monotonicNow()
performWork()
fin finished = monotonicNow()
fin elapsed = try finished.elapsedSince(started)
println(elapsed.inWholeMilliseconds)`}</CodeBlock>
      <Note tone="yellow">
        Measure elapsed time with <code>MonotonicInstant</code>. Wall clocks can jump because of synchronization,
        manual changes, or virtualization. Use <code>Instant</code> for timestamps that must be exchanged or stored.
      </Note>

      <Subheading>Validated civil values</Subheading>
      <CodeBlock>{`fin date = try localDate(2026, 7, 16)
fin time = try localTime(14, 30, 0, 125000000)
fin offset = try utcOffsetOf(3)
fin meeting = dateTime(date, time, offset)

fin instant = toInstant(meeting)
println(formatIsoDateTime(meeting))
// 2026-07-16T14:30:00.125+03:00`}</CodeBlock>
      <p>
        <code>localDate</code>, <code>localTime</code>, and <code>utcOffset</code> validate at construction.
        February length uses Gregorian leap-year rules. Leap seconds are intentionally not represented; host
        clocks map them onto the Unix time line.
      </p>

      <Subheading>Offsets are not named time zones</Subheading>
      <p>
        A UTC offset is a fixed displacement. It does not know daylight-saving transitions. Store an
        <code>Instant</code> for durable events and apply a named-zone database at presentation time when that
        facility becomes available. For protocols with a fixed offset, <code>DateTime</code> is unambiguous.
      </p>
      <CodeBlock>{`fin utc = try utcOffset(0)
fin bucharestSummer = try utcOffsetOf(3)
fin timestamp = now()

println(formatIsoDateTime(atOffset(timestamp, utc)))
println(formatIsoDateTime(atOffset(timestamp, bucharestSummer)))`}</CodeBlock>

      <Subheading>ISO-8601 parsing</Subheading>
      <CodeBlock>{`fin event = try parseIsoDateTime("2026-07-16T14:30:00.125+03:00")
fin stored = toInstant(event)
fin canonical = formatIsoInstant(stored)
// canonical is UTC and ends in Z`}</CodeBlock>
      <p>
        Parsing accepts four-digit years, one to nine fractional-second digits, <code>Z</code>, minute-precision
        offsets, and second-precision offsets. Invalid dates, leap days, times, offsets, and trailing text fail
        with <code>TimeError</code>.
      </p>

      <Subheading>Injectable clocks</Subheading>
      <CodeBlock>{`pack FixedClock {
    fin value: Instant
    fin monotonic: MonotonicInstant
}

impl Clock for FixedClock {
    func now(): Instant { ref self -> return self.value }
    func monotonicNow(): MonotonicInstant { ref self -> return self.monotonic }
}`}</CodeBlock>
      <p>
        Pass a <code>Clock</code> into business logic instead of calling the system clock everywhere. Tests can
        then use fixed or manually advanced clocks without sleeping.
      </p>

      <Subheading>Serialization</Subheading>
      <ApiTable rows={[
        ['InstantSerializer', 'Canonical UTC ISO-8601 string.'],
        ['DateTimeSerializer', 'Canonical offset ISO-8601 string.'],
        ['DurationSerializer', 'Object containing seconds and nanosecondAdjustment.'],
      ]} />
    </Section>
  )
}

