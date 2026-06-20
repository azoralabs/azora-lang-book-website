import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function ControlFlow() {
  return (
    <Section id="control-flow" title="8. Control Flow">
      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">8.1 if / else</h3>
      <p className="mt-2 text-az-35">
        <code className="text-az-primary">if</code> runs a branch when its (boolean) condition is
        true. Chain alternatives with <code className="text-az-primary">else if</code> and{' '}
        <code className="text-az-primary">else</code>.
      </p>
      <CodeBlock>{`func classify(score: Int): String {
    if score >= 90 {
        return "A"
    } else if score >= 80 {
        return "B"
    } else if score >= 70 {
        return "C"
    } else {
        return "F"
    }
}

func main() {
    println(classify(85))   // B
    println(classify(60))   // F
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">8.2 while</h3>
      <CodeBlock>{`func main() {
    var n = 1
    var product = 1
    while n <= 5 {
        product = product * n
        n = n + 1
    }
    println(product)   // 120 (5!)
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">8.3 for</h3>
      <p className="mt-2 text-az-35">
        <code className="text-az-primary">for</code> iterates a variable over an integer range.
        <code className="text-az-primary"> ..</code> is inclusive;{' '}
        <code className="text-az-primary">..&lt;</code> is exclusive.
      </p>
      <CodeBlock>{`func main() {
    var sum = 0
    for i in 1..100 {
        sum += i
    }
    println(sum)   // 5050

    for i in 0..<3 {
        println("line \${i}")
    }
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">8.4 loop, break, continue</h3>
      <p className="mt-2 text-az-35">
        <code className="text-az-primary">loop</code> runs forever until a{' '}
        <code className="text-az-primary">break</code>.{' '}
        <code className="text-az-primary">continue</code> skips to the next iteration of any loop.
      </p>
      <CodeBlock>{`func main() {
    var i = 0
    var found = -1
    loop {
        if i >= 100 {
            break
        }
        if i * i == 64 {
            found = i
            break
        }
        i += 1
    }
    println(found)   // 8

    var sum = 0
    for n in 0..<10 {
        if n == 3 {
            continue      // skip n == 3
        }
        sum += n
    }
    println(sum)          // 42 (0+1+2+4+5+6+7+8+9)
}`}</CodeBlock>
    </Section>
  )
}
