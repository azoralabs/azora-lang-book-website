import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function ErrorSets() {
  return (
    <Section id="error-sets" title="30. Error Sets & Failable Types">
      <p className="mt-2 text-az-35">
        Beyond <code className="text-az-primary">throw</code>/<code className="text-az-primary">try</code>/<code className="text-az-primary">catch</code>,
        Azora lets you declare a named <strong>error set</strong> and mark a function's return type
        as <strong>failable</strong> - it returns a value <em>or</em> an error from that set. This
        makes the failure modes part of the signature.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">30.1 Declaring an error set</h3>
      <p className="mt-2 text-az-35">
        <code className="text-az-primary">fail ErrSet {`{ variants }`}</code> declares the set; each
        variant names a possible error.
      </p>
      <CodeBlock>{`fail E {
    Bad
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">30.2 A failable function</h3>
      <p className="mt-2 text-az-35">
        The return type <code className="text-az-primary">Int!E</code> reads as "an{' '}
        <code className="text-az-primary">Int</code>, or an error from{' '}
        <code className="text-az-primary">E</code>". Raise one with{' '}
        <code className="text-az-primary">fail E.Bad</code>. Errors propagate through the normal{' '}
        <code className="text-az-primary">try</code>/<code className="text-az-primary">catch</code>{' '}
        machinery, so handling them looks familiar.
      </p>
      <CodeBlock>{`fail E {
    Bad
}

func f(): Int!E {
    fail E.Bad
    return 0
}

func main() {
    try {
        println(f())
    } catch {
        e -> println(e)        // Bad
    }
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">30.3 rescue and fail defer</h3>
      <p className="mt-2 text-az-35">
        <code className="text-az-primary">rescue {`{ }`}</code> catches an error and swallows it, so
        the function continues. <code className="text-az-primary">fail defer {`{ }`}</code> schedules
        cleanup that runs <em>only</em> when the function exits through an error - the error analog
        of <code className="text-az-primary">defer</code>.
      </p>
    </Section>
  )
}
