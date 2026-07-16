import { useState, useEffect, useCallback } from 'react'
import Sidebar from './components/Sidebar.jsx'
import MobileNav from './components/MobileNav.jsx'
import { sections as sections003 } from './content/index.js'
import { sections as wipSections } from './content/wip/index.js'

const EDITIONS = {
  '0.0.3': sections003,
  wip: wipSections,
}

function editionFromUrl() {
  const requested = new URLSearchParams(window.location.search).get('edition')
  return requested === 'wip' ? 'wip' : '0.0.3'
}

function pageFromHash(available) {
  const hash = window.location.hash.replace('#', '')
  const idx = available.findIndex((section) => section.id === hash)
  return idx >= 0 ? idx : 0
}

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [edition, setEdition] = useState(editionFromUrl)
  const sections = EDITIONS[edition]

  const [page, setPage] = useState(() => pageFromHash(sections))

  useEffect(() => {
    const onHashChange = () => setPage(pageFromHash(sections))
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [sections])

  useEffect(() => {
    const onPopState = () => {
      const nextEdition = editionFromUrl()
      const nextSections = EDITIONS[nextEdition]
      setEdition(nextEdition)
      setPage(pageFromHash(nextSections))
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const changeEdition = useCallback((nextEdition) => {
    const nextSections = EDITIONS[nextEdition]
    const url = new URL(window.location.href)
    if (nextEdition === 'wip') url.searchParams.set('edition', 'wip')
    else url.searchParams.delete('edition')
    url.hash = nextSections[0].id
    window.history.pushState({}, '', url)
    setEdition(nextEdition)
    setPage(0)
    window.scrollTo({ top: 0 })
  }, [])

  const navigateTo = useCallback((id) => {
    const idx = sections.findIndex((s) => s.id === id)
    if (idx >= 0) {
      window.location.hash = id
      setPage(idx)
      window.scrollTo({ top: 0 })
    }
  }, [sections])

  const goPrev = useCallback(() => {
    if (page > 0) navigateTo(sections[page - 1].id)
  }, [page, navigateTo, sections])

  const goNext = useCallback(() => {
    if (page < sections.length - 1) navigateTo(sections[page + 1].id)
  }, [page, navigateTo, sections])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'ArrowRight') goNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goPrev, goNext])

  const current = sections[page]
  const Component = current.component

  return (
    <div className="book-shell min-h-screen bg-az-90 text-az-10 transition-colors">
      {/* Header */}
      <header className="book-topbar fixed top-0 left-0 right-0 z-30 h-14 bg-az-90/80 backdrop-blur-md border-b border-az-75 flex items-center px-4">
        <button
          onClick={() => setMobileOpen(true)}
          className="lg:hidden mr-3 p-1.5 text-az-neutral hover:text-az-25 cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="book-brand flex items-center gap-2">
          <img src="/azora_logo.svg" alt="Azora" className="book-brand__logo" />
          <span className="book-brand__name">Azora</span>
          <span className="book-brand__product">Language Book</span>
          <span className="book-edition-select">
            <select
              value={edition}
              onChange={(event) => changeEdition(event.target.value)}
              aria-label="Choose book edition"
            >
              <option value="0.0.3">v0.0.3</option>
              <option value="wip">wip</option>
            </select>
          </span>
        </div>
      </header>

      {/* Mobile nav */}
      <MobileNav
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        sections={sections}
        edition={edition}
        activeId={current.id}
        onNavigate={navigateTo}
      />

      {/* Desktop sidebar */}
      <aside className="book-sidebar hidden lg:block fixed top-14 left-0 w-72 h-[calc(100vh-3.5rem)] border-r border-az-75 bg-az-90 overflow-hidden">
        <Sidebar sections={sections} activeId={current.id} onNavigate={navigateTo} />
      </aside>

      {/* Main content */}
      <main className="book-main pt-14 lg:pl-72">
        <div className="max-w-4xl mx-auto px-6 py-10">
          <Component />

          {/* Prev / Next navigation */}
          <nav className="mt-16 flex items-center justify-between border-t border-az-75 pt-6">
            {page > 0 ? (
              <button
                onClick={goPrev}
                className="flex items-center gap-2 text-sm text-az-secondary hover:text-az-primary transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                <span>{sections[page - 1].title}</span>
              </button>
            ) : <div />}
            {page < sections.length - 1 ? (
              <button
                onClick={goNext}
                className="flex items-center gap-2 text-sm text-az-secondary hover:text-az-primary transition-colors cursor-pointer ml-auto"
              >
                <span>{sections[page + 1].title}</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ) : <div />}
          </nav>

          {/* Footer */}
          <footer className="mt-10 pt-6 border-t border-az-75 text-center text-sm text-az-neutral pb-10">
            <p>Azora Language Book {edition === 'wip' ? 'WIP' : 'v0.0.3'}, DoubleGArts</p>
          </footer>
        </div>
      </main>
    </div>
  )
}
