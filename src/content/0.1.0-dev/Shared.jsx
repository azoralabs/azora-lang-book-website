import Section from '../../components/Section.jsx'
import CodeBlock from '../../components/CodeBlock.jsx'

export { Section, CodeBlock }

export function Lead({ children }) {
  return <p className="mt-2 text-az-30 text-[1.02rem] leading-7">{children}</p>
}

export function Subheading({ children }) {
  return <h3 className="text-lg font-semibold mt-8 mb-2 text-az-20">{children}</h3>
}

export function MinorHeading({ children }) {
  return <h4 className="text-base font-semibold mt-6 mb-2 text-az-25">{children}</h4>
}

export function Note({ children, tone = 'cyan' }) {
  const colors = tone === 'yellow'
    ? 'border-pastel-yellow/35 bg-pastel-yellow/8 text-az-25'
    : 'border-pastel-blue/35 bg-pastel-blue/8 text-az-25'
  return <div className={`my-5 rounded-md border px-4 py-3 text-sm leading-6 ${colors}`}>{children}</div>
}

export function ApiTable({ rows }) {
  return (
    <div className="my-5 overflow-x-auto rounded-md border border-az-75/80">
      <table className="w-full text-left text-sm">
        <thead className="bg-az-85/80 text-az-20">
          <tr><th className="px-4 py-3 font-semibold">API</th><th className="px-4 py-3 font-semibold">Meaning</th></tr>
        </thead>
        <tbody>
          {rows.map(([api, meaning]) => (
            <tr key={api} className="border-t border-az-75/70 align-top">
              <td className="px-4 py-3 font-mono text-pastel-blue whitespace-nowrap">{api}</td>
              <td className="px-4 py-3 text-az-35 leading-6">{meaning}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

