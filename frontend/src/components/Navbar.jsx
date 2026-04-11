import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { getTheme } from '../context/ThemeContext'

const menuItems = [
  { name: 'Home', icon: 'H', path: '/', description: 'All vehicles' },
  { name: 'Vehicle', icon: 'V', path: '/vehicle', description: 'Register vehicles' },
  { name: 'Fitness', icon: 'F', path: '/fitness', description: 'Fitness records' },
  { name: 'Tax', icon: 'T', path: '/tax', description: 'Tax records' },
  { name: 'PUC', icon: 'P', path: '/puc', description: 'PUC records' },
  { name: 'GPS', icon: 'G', path: '/gps', description: 'GPS records' },
  { name: 'Insurance', icon: 'I', path: '/insurance', description: 'Insurance records' },
]

const Navbar = () => {
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const theme = getTheme()

  const isActive = (path) => location.pathname === path

  return (
    <>
      {isMobileMenuOpen && (
        <div className='fixed inset-0 bg-black/60 z-40 lg:hidden' onClick={() => setIsMobileMenuOpen(false)} />
      )}

      <div className={`lg:hidden fixed top-0 left-0 right-0 ${theme.navbar} text-white shadow-lg z-50`}>
        <div className='flex items-center justify-between px-4 py-3'>
          <button onClick={() => setIsMobileMenuOpen(true)} className='p-2 rounded-lg hover:bg-white/10 transition-colors' aria-label='Open Menu'>
            <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
            </svg>
          </button>

          <div className='flex items-center space-x-2'>
            <div className='w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center shadow-md'>
              <span className='text-lg font-black text-white'>R</span>
            </div>
            <h1 className='text-sm font-bold text-white'>RTO Sarthi</h1>
          </div>

          <div className='w-10' />
        </div>
      </div>

      <div className={`lg:hidden fixed left-0 top-0 h-full bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 text-white transform transition-transform duration-300 ease-in-out z-50 w-64 shadow-2xl ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className='p-4 border-b border-purple-700/30'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-2'>
              <div className='w-9 h-9 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center shadow-lg'>
                <span className='text-xl font-black text-white'>R</span>
              </div>
              <div>
                <h1 className='text-base font-bold text-white'>RTO Sarthi</h1>
                <p className='text-xs text-purple-300 font-medium'>Your RTO Companion</p>
              </div>
            </div>
            <button onClick={() => setIsMobileMenuOpen(false)} className='text-purple-300 hover:text-white p-1.5 hover:bg-white/10 rounded-lg transition-colors'>
              <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
              </svg>
            </button>
          </div>
        </div>

        <nav className='p-3 space-y-2 overflow-y-auto h-[calc(100vh-80px)]'>
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 group ${
                isActive(item.path)
                  ? 'bg-gradient-to-r from-purple-600/30 to-pink-600/30 border border-purple-400/40 shadow-lg'
                  : 'hover:bg-white/10 hover:border border-transparent hover:border-purple-400/20'
              }`}
            >
              <span className={`text-sm font-bold ${isActive(item.path) ? 'text-orange-300' : 'text-purple-200 group-hover:text-orange-300'}`}>
                {item.icon}
              </span>
              <div className='flex-1'>
                <div className={`text-sm font-semibold ${isActive(item.path) ? 'text-white' : 'text-purple-100 group-hover:text-white'}`}>
                  {item.name}
                </div>
                <div className='text-xs text-purple-400 group-hover:text-purple-300'>{item.description}</div>
              </div>
            </Link>
          ))}
        </nav>
      </div>

      <nav className={`hidden lg:block fixed top-0 left-0 right-0 ${theme.navbar} text-white shadow-2xl z-50`}>
        <div className='px-3 py-2'>
          <div className='flex items-center gap-2 overflow-x-auto scrollbar-hide'>
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 whitespace-nowrap ${
                  isActive(item.path)
                    ? 'bg-gradient-to-r from-purple-600/30 to-pink-600/30 border border-purple-400/40 shadow-lg'
                    : 'hover:bg-white/10 hover:border border-transparent hover:border-purple-400/20'
                }`}
                title={item.description}
              >
                <span className='text-sm font-bold'>{item.icon}</span>
                <span className='text-sm font-semibold'>{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar

