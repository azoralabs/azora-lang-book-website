import Sidebar from './Sidebar.jsx'

export default function MobileNav({ open, onClose, sections, activeId, onNavigate }) {
  const handleNav = (id) => {
    onNavigate(id)
    onClose()
  }

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={onClose} />
      )}
      <div
        className={`fixed top-0 left-0 z-50 h-full w-72 bg-az-90 border-r border-az-75 transform transition-transform lg:hidden ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-az-75">
          <span className="font-bold text-az-primary">Azora Book</span>
          <button onClick={onClose} className="p-1 text-az-neutral hover:text-az-25 cursor-pointer">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="overflow-y-auto" style={{ height: 'calc(100% - 49px)' }}>
          <Sidebar sections={sections} activeId={activeId} onNavigate={handleNav} />
        </div>
      </div>
    </>
  )
}
