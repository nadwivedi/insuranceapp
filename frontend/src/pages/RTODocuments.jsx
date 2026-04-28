import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Sidebar from '../components/Sidebar'
import SearchBar from '../components/SearchBar'
import AddVehicleModal from './VehicleRegistration/components/AddVehicleModal'
import AddFitnessModal from './Fitness/components/AddFitnessModal'
import AddTaxModal from './Tax/components/AddTaxModal'
import AddPucModal from './Puc/components/AddPucModal'
import AddGpsModal from './Gps/components/AddGpsModal'
import AddInsuranceModal from './Insurance/components/AddInsuranceModal'

const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'

const RTODocuments = () => {
  const navigate = useNavigate()
  const [vehicles, setVehicles] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showAddVehicleModal, setShowAddVehicleModal] = useState(false)
  const [showAddFitnessModal, setShowAddFitnessModal] = useState(false)
  const [showAddTaxModal, setShowAddTaxModal] = useState(false)
  const [showAddPucModal, setShowAddPucModal] = useState(false)
  const [showAddGpsModal, setShowAddGpsModal] = useState(false)
  const [showAddInsuranceModal, setShowAddInsuranceModal] = useState(false)
  const [showMobileSidebar, setShowMobileSidebar] = useState(false)

  useEffect(() => {
    fetchVehicles()
  }, [])

  const fetchVehicles = async () => {
    try {
      setLoading(true)
      setError('')

      const response = await axios.get(`${API_URL}/api/vehicle`, {
        params: {
          page: 1,
          limit: 1000,
        },
        withCredentials: true,
      })

      if (response.data?.success) {
        setVehicles(response.data.data || [])
      } else {
        setVehicles([])
        setError('Failed to load vehicles.')
      }
    } catch (err) {
      console.error('Error fetching vehicles:', err)
      setVehicles([])
      setError('Failed to fetch registered vehicles.')
    } finally {
      setLoading(false)
    }
  }

  const filteredVehicles = vehicles.filter((vehicle) => {
    const vehicleNumber = String(vehicle.registrationNumber || vehicle.vehicleNumber || '').toUpperCase()
    return vehicleNumber.includes(searchQuery.trim().toUpperCase())
  })

  const openAddVehicleModal = () => {
    setShowMobileSidebar(false)
    setShowAddVehicleModal(true)
  }

  const openAddFitnessModal = () => {
    setShowMobileSidebar(false)
    setShowAddFitnessModal(true)
  }

  const openAddTaxModal = () => {
    setShowMobileSidebar(false)
    setShowAddTaxModal(true)
  }

  const openAddPucModal = () => {
    setShowMobileSidebar(false)
    setShowAddPucModal(true)
  }

  const openAddGpsModal = () => {
    setShowMobileSidebar(false)
    setShowAddGpsModal(true)
  }

  const openAddInsuranceModal = () => {
    setShowMobileSidebar(false)
    setShowAddInsuranceModal(true)
  }

  return (
    <div className='min-h-screen bg-[radial-gradient(circle_at_top,_#eff6ff,_#f8fafc_45%,_#ffffff_100%)]'>
      <main className='pl-2 pr-4 pt-6 pb-10 lg:pl-3 lg:pr-8 lg:pt-8'>
        <section className='w-full'>
          {showMobileSidebar && (
            <div className='fixed inset-0 z-40 bg-slate-950/45 lg:hidden' onClick={() => setShowMobileSidebar(false)} />
          )}

          <div className='mb-4 flex items-center justify-between lg:hidden'>
            <button
              type='button'
              onClick={() => setShowMobileSidebar(true)}
              className='inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-800 shadow-[0_16px_35px_-25px_rgba(15,23,42,0.55)]'
            >
              <svg className='h-5 w-5 text-indigo-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
              </svg>
              Menu
            </button>
            <h1 className='text-lg font-black text-slate-900'>RTO Documents</h1>
          </div>

          <div className={`fixed left-0 top-12 bottom-0 z-50 w-[290px] max-w-[85vw] transform overflow-y-auto bg-white p-3 shadow-[0_30px_60px_-25px_rgba(15,23,42,0.7)] transition-transform duration-300 lg:hidden ${showMobileSidebar ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className='mb-3 flex items-center justify-between px-1'>
              <p className='text-sm font-bold text-slate-800'>Quick Actions</p>
              <button
                type='button'
                onClick={() => setShowMobileSidebar(false)}
                className='rounded-xl p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800'
              >
                <svg className='h-5 w-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                </svg>
              </button>
            </div>

            <Sidebar
              onAddVehicle={openAddVehicleModal}
              onAddFitness={openAddFitnessModal}
              onAddTax={openAddTaxModal}
              onAddPuc={openAddPucModal}
              onAddGps={openAddGpsModal}
              onAddInsurance={openAddInsuranceModal}
            />
          </div>

          <div className='grid grid-cols-1 gap-6 lg:grid-cols-[300px_minmax(0,1fr)]'>
            <div className='hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_22px_50px_-32px_rgba(15,23,42,0.35)] lg:block'>
              <Sidebar
                onAddVehicle={openAddVehicleModal}
                onAddFitness={openAddFitnessModal}
                onAddTax={openAddTaxModal}
                onAddPuc={openAddPucModal}
                onAddGps={openAddGpsModal}
                onAddInsurance={openAddInsuranceModal}
              />
            </div>

            <div className='rounded-[32px] border border-slate-200 bg-white p-4 shadow-[0_28px_60px_-34px_rgba(15,23,42,0.25)] md:p-5 lg:p-6'>
              <div className='mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
                <div>
                  <h1 className='text-2xl font-black text-slate-900'>RTO Documents</h1>
                  <p className='text-sm font-medium text-slate-500'>Manage and track all vehicle documents</p>
                </div>
                <div className='flex items-center gap-2 text-sm text-slate-500'>
                  <span className='font-semibold'>{filteredVehicles.length}</span> vehicle{filteredVehicles.length === 1 ? '' : 's'}
                </div>
              </div>

              <div className='mb-6'>
                <SearchBar
                  value={searchQuery}
                  onChange={setSearchQuery}
                  placeholder='Search by vehicle number...'
                  toUpperCase={true}
                />
              </div>

              {loading ? (
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3'>
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className='h-56 animate-pulse rounded-3xl border border-slate-200 bg-slate-100' />
                  ))}
                </div>
              ) : error ? (
                <div className='rounded-3xl border border-red-200 bg-red-50 px-5 py-6 text-center text-sm font-bold text-red-600'>
                  {error}
                </div>
              ) : filteredVehicles.length === 0 ? (
                <div className='rounded-3xl border border-slate-200 bg-slate-50 px-5 py-12 text-center'>
                  <svg className='mx-auto h-12 w-12 text-slate-300 mb-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z' />
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10m1 0l-2-2m2 2l2-2m-2 2v6m0 0v6m-5-6h5m5 0V6' />
                  </svg>
                  <p className='text-base font-bold text-slate-700'>No vehicles found</p>
                  <p className='text-sm text-slate-500 mt-1'>Add a vehicle using the sidebar to get started</p>
                </div>
              ) : (
                <div className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3'>
                  {filteredVehicles.map((vehicle) => {
                    const vehicleNumber = (vehicle.registrationNumber || vehicle.vehicleNumber || 'N/A').toUpperCase()

                    return (
                      <article
                        key={vehicle._id}
                        onClick={() => navigate(`/vehicle/${vehicle._id}/detail`)}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault()
                            navigate(`/vehicle/${vehicle._id}/detail`)
                          }
                        }}
                        role='button'
                        tabIndex={0}
                        className='cursor-pointer overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_45px_-30px_rgba(15,23,42,0.6)]'
                      >
                        <div className='p-5'>
                          <div className='mx-auto max-w-[280px] rounded-[26px] border-[5px] border-slate-900 bg-gradient-to-b from-amber-200 to-yellow-300 px-5 py-5 shadow-[inset_0_2px_10px_rgba(255,255,255,0.45),0_8px_30px_-8px_rgba(0,0,0,0.25)]'>
                            <p className='text-center text-[10px] font-extrabold uppercase tracking-[0.36em] text-slate-600'>
                              Registration No
                            </p>
                            <div className='mt-3 text-center text-xl font-black tracking-[0.18em] text-slate-950 md:text-2xl'>
                              {vehicleNumber}
                            </div>
                          </div>

                          <div className='mt-3 grid grid-cols-2 gap-3'>
                            <div className='rounded-2xl border border-blue-200 bg-blue-50/70 px-3 py-2.5'>
                              <p className='text-[9px] font-bold uppercase tracking-[0.22em] text-blue-600'>Chassis</p>
                              <p className='mt-1.5 truncate font-mono text-xs font-semibold text-blue-950' title={vehicle.chassisNumber || 'N/A'}>
                                {vehicle.chassisNumber || 'N/A'}
                              </p>
                            </div>

                            <div className='rounded-2xl border border-emerald-200 bg-emerald-50/70 px-3 py-2.5'>
                              <p className='text-[9px] font-bold uppercase tracking-[0.22em] text-emerald-600'>Engine</p>
                              <p className='mt-1.5 truncate font-mono text-xs font-semibold text-emerald-950' title={vehicle.engineNumber || 'N/A'}>
                                {vehicle.engineNumber || 'N/A'}
                              </p>
                            </div>
                          </div>
                        </div>
                      </article>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      {showAddVehicleModal && (
        <AddVehicleModal
          isOpen={showAddVehicleModal}
          onClose={() => setShowAddVehicleModal(false)}
          onSuccess={() => {
            setShowAddVehicleModal(false)
            fetchVehicles()
          }}
          editData={null}
        />
      )}

      {showAddFitnessModal && (
        <AddFitnessModal
          isOpen={showAddFitnessModal}
          onClose={() => setShowAddFitnessModal(false)}
          onSubmit={() => {
            setShowAddFitnessModal(false)
          }}
        />
      )}

      {showAddTaxModal && (
        <AddTaxModal
          isOpen={showAddTaxModal}
          onClose={() => setShowAddTaxModal(false)}
          onSubmit={() => {
            setShowAddTaxModal(false)
          }}
        />
      )}

      {showAddPucModal && (
        <AddPucModal
          isOpen={showAddPucModal}
          onClose={() => setShowAddPucModal(false)}
          onSubmit={() => {
            setShowAddPucModal(false)
          }}
        />
      )}

      {showAddGpsModal && (
        <AddGpsModal
          isOpen={showAddGpsModal}
          onClose={() => setShowAddGpsModal(false)}
          onSubmit={() => {
            setShowAddGpsModal(false)
          }}
        />
      )}

      {showAddInsuranceModal && (
        <AddInsuranceModal
          isOpen={showAddInsuranceModal}
          onClose={() => setShowAddInsuranceModal(false)}
          onSubmit={() => {
            setShowAddInsuranceModal(false)
          }}
        />
      )}
    </div>
  )
}

export default RTODocuments
