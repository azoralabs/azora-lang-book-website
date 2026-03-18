export default function Section({ id, title, children }) {
  return (
    <section id={id}>
      <h2 className="text-2xl font-bold mb-6 text-az-10 border-b border-az-75 pb-3">
        {title}
      </h2>
      <div className="text-az-35 leading-relaxed space-y-4">
        {children}
      </div>
    </section>
  )
}
