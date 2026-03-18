export default function Sidebar({ sections, activeId, onNavigate }) {
  return (
    <nav className="h-full overflow-y-auto py-4 px-3">
      <ul className="space-y-0.5 pb-16">
        {sections.map((section) => (
          <li key={section.id}>
            <button
              onClick={() => { onNavigate(section.id) }}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer ${
                activeId === section.id
                  ? 'bg-az-primary/10 text-az-primary font-medium'
                  : 'text-az-50 hover:text-az-25 hover:bg-az-80'
              }`}
            >
              <span className="mr-2 text-xs opacity-50">{section.number}.</span>
              {section.title}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
