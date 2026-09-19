import { NavLink, Outlet } from 'react-router'

const navItems = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About', end: false },
  // { to: '/about', label: 'About', end: false },
]

export default function RootLayout() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <span className="app-title">Coding Challenge</span>
        <nav aria-label="Main">
          <ul className="nav-list">
            {navItems.map(({ to, label, end }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={end}
                  className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  )
}
