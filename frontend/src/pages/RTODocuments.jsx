import { useState } from 'react'
import SearchBar from '../components/SearchBar'
import AddVehicleModal from './VehicleRegistration/components/AddVehicleModal'

const RTODocuments = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [showAddVehicleModal, setShowAddVehicleModal] = useState(false)

  // Demo data for all document types
  const demoDocuments = [
    { id: 1, type: 'Tax', vehicleNumber: 'MH01AB1234', validFrom: '2023-01-01', validTo: '2023-12-31', status: 'Active' },
    { id: 2, type: 'PUC', vehicleNumber: 'MH01AB1234', validFrom: '2024-01-15', validTo: '2024-07-15', status: 'Active' },
    { id: 3, type: 'GPS', vehicleNumber: 'MH01AB1234', validFrom: '2023-06-01', validTo: '2024-06-01', status: 'Active' },
    { id: 4, type: 'Fitness', vehicleNumber: 'DL01XY9876', validFrom: '2022-10-10', validTo: '2024-10-10', status: 'Active' },
    { id: 5, type: 'Permit', vehicleNumber: 'DL01XY9876', validFrom: '2023-05-05', validTo: '2025-05-05', status: 'Active' },
    { id: 6, type: 'Tax', vehicleNumber: 'KA05CD5678', validFrom: '2023-03-01', validTo: '2024-03-01', status: 'Expired' },
    { id: 7, type: 'PUC', vehicleNumber: 'KA05CD5678', validFrom: '2023-09-01', validTo: '2024-03-01', status: 'Expiring Soon' },
    { id: 8, type: 'Insurance', vehicleNumber: 'MH12EF4321', validFrom: '2023-11-11', validTo: '2024-11-10', status: 'Active' },
  ]

  const filteredDocuments = demoDocuments.filter(doc => 
    doc.vehicleNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.type.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getStatusColor = (status) => {
    switch(status) {
      case 'Active': return 'bg-emerald-100 text-emerald-700'
      case 'Expired': return 'bg-rose-100 text-rose-700'
      case 'Expiring Soon': return 'bg-amber-100 text-amber-700'
      default: return 'bg-slate-100 text-slate-700'
    }
  }

  const getDocTypeIcon = (type) => {
    switch(type) {
      case 'Tax': return '💰'
      case 'PUC': return '🌬️'
      case 'GPS': return '📍'
      case 'Fitness': return '🔧'
      case 'Permit': return '📜'
      case 'Insurance': return '🛡️'
      default: return '📄'
    }
  }

  return (
    <div className='min-h-screen bg-slate-100 px-4 pb-32 pt-4 md:px-6 lg:px-8'>
      <div className='mx-auto max-w-5xl'>
        {/* Header Section */}
        <div className='mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
          <div>
            <h1 className='text-3xl font-black text-slate-900'>RTO Documents</h1>
            <p className='text-sm font-bold text-slate-500 uppercase tracking-widest'>Master Document Repository</p>
          </div>
          <button
            onClick={() => setShowAddVehicleModal(true)}
            className='flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-6 py-3.5 text-sm font-black uppercase tracking-widest text-white shadow-xl shadow-indigo-100 transition-all hover:bg-indigo-700 active:scale-[0.98]'
          >
            <svg className='h-5 w-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={3} d='M12 4v16m8-8H4' />
            </svg>
            Upload RC
          </button>
        </div>

        {/* Search Bar */}
        <div className='mb-8'>
          <div className='relative'>
            <div className='absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none'>
              <svg className='w-5 h-5 text-slate-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2.5} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
              </svg>
            </div>
            <input
              type='text'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='Search by Vehicle No or Doc Type...'
              className='w-full rounded-3xl border-2 border-slate-200 bg-white py-4 pl-12 pr-6 text-sm font-black text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all uppercase'
            />
          </div>
        </div>

        {/* Document Cards List */}
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {filteredDocuments.map((doc) => (
            <div
              key={doc.id}
              className='group relative overflow-hidden rounded-[32px] border-2 border-white bg-white p-5 shadow-[0_15px_40px_-20px_rgba(15,23,42,0.1)] transition-all hover:border-indigo-100 hover:shadow-[0_25px_60px_-25px_rgba(15,23,42,0.2)]'
            >
              <div className='flex items-center justify-between mb-4'>
                <div className='flex items-center gap-3'>
                  <div className='flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-2xl shadow-inner group-hover:scale-110 transition-transform'>
                    {getDocTypeIcon(doc.type)}
                  </div>
                  <div>
                    <h3 className='text-lg font-black text-slate-900'>{doc.type}</h3>
                    <p className='text-[10px] font-bold uppercase tracking-wider text-slate-400'>{doc.vehicleNumber}</p>
                  </div>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wider ${getStatusColor(doc.status)}`}>
                  {doc.status}
                </span>
              </div>

              <div className='grid grid-cols-2 gap-3 border-t border-slate-50 pt-4'>
                <div className='rounded-2xl bg-slate-50 p-3 border border-slate-100'>
                  <p className='text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1'>Valid From</p>
                  <p className='text-xs font-black text-slate-800'>{doc.validFrom}</p>
                </div>
                <div className='rounded-2xl bg-slate-50 p-3 border border-slate-100'>
                  <p className='text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1'>Valid To</p>
                  <p className='text-xs font-black text-slate-800'>{doc.validTo}</p>
                </div>
              </div>

              <div className='absolute -bottom-1 -right-1 h-12 w-12 rounded-tl-[32px] bg-slate-50/50 flex items-end justify-end p-2 opacity-0 group-hover:opacity-100 transition-opacity'>
                <svg className='h-4 w-4 text-indigo-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={3} d='M9 5l7 7-7 7' />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {filteredDocuments.length === 0 && (
          <div className='mt-12 text-center'>
            <div className='mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-slate-50 text-4xl shadow-inner grayscale opacity-50'>
              🔍
            </div>
            <h3 className='text-xl font-black text-slate-900'>No Documents Found</h3>
            <p className='text-sm font-semibold text-slate-400'>Try searching with a different vehicle number or type.</p>
          </div>
        )}
      </div>

      {showAddVehicleModal && (
        <AddVehicleModal
          isOpen={showAddVehicleModal}
          onClose={() => setShowAddVehicleModal(false)}
          onSuccess={() => setShowAddVehicleModal(false)}
        />
      )}
    </div>
  )
}

export default RTODocuments
