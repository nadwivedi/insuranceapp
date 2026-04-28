import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import DocumentMockup from '../components/DocumentMockup'

const DocumentDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  // Demo data fetching simulation
  const [doc, setDoc] = useState(null)

  useEffect(() => {
    // Simulated fetch
    setTimeout(() => {
      setDoc({
        id,
        type: 'Insurance',
        vehicleNumber: 'MH01AB1234',
        policyNumber: 'POL-88273645',
        validFrom: '01-05-2023',
        validTo: '30-04-2024',
        issuer: 'New India Assurance',
        status: 'Active',
      })
      setLoading(false)
    }, 500)
  }, [id])

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${doc.type} - ${doc.vehicleNumber}`,
          text: `Official ${doc.type} document for vehicle ${doc.vehicleNumber}.`,
          url: window.location.href,
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      alert('Link copied to clipboard!')
    }
  }

  if (loading) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-slate-100'>
        <div className='h-12 w-12 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent' />
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-slate-100 px-4 pb-32 pt-4 md:px-6 lg:px-8'>
      <div className='mx-auto max-w-xl'>
        {/* Navigation Header */}
        <div className='mb-6 flex items-center justify-between'>
          <button
            onClick={() => navigate(-1)}
            className='flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-900 shadow-sm transition-all active:scale-95'
          >
            <svg className='h-6 w-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2.5} d='M15 19l-7-7 7-7' />
            </svg>
          </button>
          <div className='text-center'>
            <h1 className='text-lg font-black text-slate-900'>{doc.type} Detail</h1>
            <p className='text-[10px] font-bold uppercase tracking-widest text-slate-500'>{doc.vehicleNumber}</p>
          </div>
          <div className='w-10' /> {/* Spacer */}
        </div>

        {/* Document Display Section */}
        <div className='relative mb-8'>
          <DocumentMockup type={doc.type} vehicleNumber={doc.vehicleNumber} />
          
          {/* Quick Actions Bar - Floating near the document */}
          <div className='absolute -bottom-6 left-1/2 flex -translate-x-1/2 gap-3'>
            <button
              onClick={handleShare}
              className='flex h-12 items-center gap-2 rounded-2xl bg-indigo-600 px-6 text-xs font-black uppercase tracking-widest text-white shadow-xl shadow-indigo-100 transition-all active:scale-95'
            >
              <svg className='h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2.5} d='M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z' />
              </svg>
              Share
            </button>
            <button className='flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-slate-900 shadow-xl shadow-slate-200 transition-all active:scale-95 border border-slate-100'>
              <svg className='h-5 w-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2.5} d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4' />
              </svg>
            </button>
          </div>
        </div>

        {/* Details Grid */}
        <div className='mt-12 space-y-4'>
           <div className='rounded-[28px] bg-white p-6 shadow-sm border border-slate-100'>
              <h2 className='mb-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400'>Extracted Metadata</h2>
              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-1'>
                  <p className='text-[9px] font-bold uppercase text-slate-400'>Valid From</p>
                  <p className='text-xs font-black text-slate-800'>{doc.validFrom}</p>
                </div>
                <div className='space-y-1'>
                  <p className='text-[9px] font-bold uppercase text-slate-400'>Valid To</p>
                  <p className='text-xs font-black text-slate-800'>{doc.validTo}</p>
                </div>
                <div className='space-y-1'>
                  <p className='text-[9px] font-bold uppercase text-slate-400'>Policy No</p>
                  <p className='text-xs font-black text-slate-800'>{doc.policyNumber}</p>
                </div>
                <div className='space-y-1'>
                  <p className='text-[9px] font-bold uppercase text-slate-400'>Issuer</p>
                  <p className='text-xs font-black text-slate-800'>{doc.issuer}</p>
                </div>
              </div>
           </div>
           
           <div className='rounded-3xl bg-emerald-50 p-5 border border-emerald-100 flex items-center justify-between'>
              <div>
                <p className='text-[10px] font-black uppercase text-emerald-600'>Verification Status</p>
                <p className='text-xs font-bold text-emerald-800'>Government Verified</p>
              </div>
              <div className='h-8 w-8 rounded-full bg-emerald-500 flex items-center justify-center text-white'>
                <svg className='h-5 w-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={3} d='M5 13l4 4L19 7' />
                </svg>
              </div>
           </div>
        </div>
      </div>
    </div>
  )
}

export default DocumentDetail
