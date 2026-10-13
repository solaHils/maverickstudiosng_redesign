import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { NAV } from '../data'

const menuBtn =
  'inline-flex items-center rounded-full border border-black/15 px-3 py-[0.3em] text-[13px] text-black transition-colors duration-200 hover:bg-black hover:text-white'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-10 bg-white flex items-center justify-between px-5 sm:px-8 h-16 border-b border-black/10">
        <Link to="/" onClick={close} className="flex items-center">
          <img src="/logo_name.png" alt="Maverick Studios" className="h-10 w-auto" />
        </Link>

        <nav className="hidden md:flex items-center gap-2" aria-label="Primary">
          {NAV.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) => `${menuBtn} ${isActive ? 'bg-black !text-white' : ''}`}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <Link
          to="/contact"
          className="hidden md:inline-flex items-center rounded-full bg-brand text-white text-[13px] px-4 py-[0.4em] hover:bg-black transition-colors duration-200"
        >
          Get in touch
        </Link>

        <button
          className="md:hidden flex flex-col gap-[5px] p-1"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span className={`block w-6 h-[2px] bg-black transition-all duration-300 ${open ? 'rotate-45 translate-y-[7px]' : ''}`} />
          <span className={`block w-6 h-[2px] bg-black transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-[2px] bg-black transition-all duration-300 ${open ? '-rotate-45 -translate-y-[7px]' : ''}`} />
        </button>
      </header>

      <div
        className="md:hidden fixed inset-0 z-[9] bg-black/90 backdrop-blur-md flex flex-col justify-center items-start px-8 gap-8 transition-opacity duration-300"
        style={{ opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none' }}
      >
        {NAV.map((l) => (
          <Link key={l.to} to={l.to} onClick={close} className="text-[32px] font-medium text-white">{l.label}</Link>
        ))}
        <Link to="/contact" onClick={close} className="text-[32px] font-medium text-brand underline">Get in touch</Link>
      </div>
    </>
  )
}
