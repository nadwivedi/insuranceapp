import { Link, useLocation } from 'react-router-dom'

const sidebarItems = [
  { title: 'Add Vehicle', path: '/vehicle', image: '/buttons/add vehicle.png' },
  { title: 'Add Fitness', path: '/fitness', image: '/buttons/add fitness.png' },
  { title: 'Add Tax', path: '/tax', image: '/buttons/add tax.png' },
  { title: 'Add PUC', path: '/puc', image: '/buttons/add puc.png' },
  { title: 'Add GPS', path: '/gps', image: '/buttons/add gps.png' },
  { title: 'Add Insurance', path: '/insurance', image: '/buttons/add insurance.png' },
]

const Sidebar = ({ onAddVehicle, onAddFitness, onAddTax, onAddPuc, onAddGps, onAddInsurance }) => {
  const location = useLocation()

  return (
    <aside className='w-full rounded-[28px] border border-slate-200 bg-white/90 p-3 shadow-sm backdrop-blur lg:sticky lg:top-24'>
      <div className='grid grid-cols-1 gap-3'>
        {sidebarItems.map((item) => {
          const isActive = location.pathname === item.path

          if (item.path === '/vehicle') {
            return (
              <button
                key={item.path}
                type='button'
                onClick={onAddVehicle}
                className={`block overflow-hidden rounded-2xl border transition-all duration-200 ${
                  isActive
                    ? 'border-indigo-300 bg-indigo-50 shadow-sm'
                    : 'border-slate-200 bg-white hover:-translate-y-0.5 hover:border-indigo-200'
                }`}
              >
                <img src={item.image} alt={item.title} className='block h-auto w-full object-cover' />
              </button>
            )
          }

          if (item.path === '/fitness') {
            return (
              <button
                key={item.path}
                type='button'
                onClick={onAddFitness}
                className={`block overflow-hidden rounded-2xl border transition-all duration-200 ${
                  isActive
                    ? 'border-indigo-300 bg-indigo-50 shadow-sm'
                    : 'border-slate-200 bg-white hover:-translate-y-0.5 hover:border-indigo-200'
                }`}
              >
                <img src={item.image} alt={item.title} className='block h-auto w-full object-cover' />
              </button>
            )
          }

          if (item.path === '/tax') {
            return (
              <button
                key={item.path}
                type='button'
                onClick={onAddTax}
                className={`block overflow-hidden rounded-2xl border transition-all duration-200 ${
                  isActive
                    ? 'border-indigo-300 bg-indigo-50 shadow-sm'
                    : 'border-slate-200 bg-white hover:-translate-y-0.5 hover:border-indigo-200'
                }`}
              >
                <img src={item.image} alt={item.title} className='block h-auto w-full object-cover' />
              </button>
            )
          }

          if (item.path === '/puc') {
            return (
              <button
                key={item.path}
                type='button'
                onClick={onAddPuc}
                className={`block overflow-hidden rounded-2xl border transition-all duration-200 ${
                  isActive
                    ? 'border-indigo-300 bg-indigo-50 shadow-sm'
                    : 'border-slate-200 bg-white hover:-translate-y-0.5 hover:border-indigo-200'
                }`}
              >
                <img src={item.image} alt={item.title} className='block h-auto w-full object-cover' />
              </button>
            )
          }

          if (item.path === '/gps') {
            return (
              <button
                key={item.path}
                type='button'
                onClick={onAddGps}
                className={`block overflow-hidden rounded-2xl border transition-all duration-200 ${
                  isActive
                    ? 'border-indigo-300 bg-indigo-50 shadow-sm'
                    : 'border-slate-200 bg-white hover:-translate-y-0.5 hover:border-indigo-200'
                }`}
              >
                <img src={item.image} alt={item.title} className='block h-auto w-full object-cover' />
              </button>
            )
          }

          if (item.path === '/insurance') {
            return (
              <button
                key={item.path}
                type='button'
                onClick={onAddInsurance}
                className={`block overflow-hidden rounded-2xl border transition-all duration-200 ${
                  isActive
                    ? 'border-indigo-300 bg-indigo-50 shadow-sm'
                    : 'border-slate-200 bg-white hover:-translate-y-0.5 hover:border-indigo-200'
                }`}
              >
                <img src={item.image} alt={item.title} className='block h-auto w-full object-cover' />
              </button>
            )
          }

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`block overflow-hidden rounded-2xl border transition-all duration-200 ${
                isActive
                  ? 'border-indigo-300 bg-indigo-50 shadow-sm'
                  : 'border-slate-200 bg-white hover:-translate-y-0.5 hover:border-indigo-200'
              }`}
            >
              <img src={item.image} alt={item.title} className='block h-auto w-full object-cover' />
            </Link>
          )
        })}
      </div>
    </aside>
  )
}

export default Sidebar
