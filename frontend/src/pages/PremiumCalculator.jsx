import { useState } from 'react'

const PremiumCalculator = () => {
  const [vehicleType, setVehicleType] = useState('motorcycle')
  const [idv, setIdv] = useState('')
  const [capacity, setCapacity] = useState('') // CC for bikes, GVW for trucks
  const [ncb, setNcb] = useState(0)
  const [coverageType, setCoverageType] = useState('comprehensive')
  const [result, setResult] = useState(null)

  const calculatePremium = () => {
    let odPremium = 0
    let tpPremium = 0
    const idvVal = parseFloat(idv) || 0
    const capacityVal = parseFloat(capacity) || 0

    if (vehicleType === 'motorcycle') {
      // Simple OD calculation: 2% of IDV
      odPremium = idvVal * 0.02
      
      // TP Rates based on CC
      if (capacityVal < 75) tpPremium = 538
      else if (capacityVal <= 150) tpPremium = 714
      else if (capacityVal <= 350) tpPremium = 1366
      else tpPremium = 2804
    } else {
      // Truck OD calculation: 1.5% of IDV
      odPremium = idvVal * 0.015
      
      // TP Rates based on GVW (Tonnes)
      if (capacityVal < 7.5) tpPremium = 15746
      else if (capacityVal <= 12) tpPremium = 26580
      else if (capacityVal <= 20) tpPremium = 34503
      else if (capacityVal <= 40) tpPremium = 43231
      else tpPremium = 52000
    }

    // Apply NCB to OD only
    if (coverageType === 'comprehensive') {
      odPremium = odPremium * (1 - ncb / 100)
    } else {
      odPremium = 0
    }

    const netPremium = odPremium + tpPremium
    const gst = netPremium * 0.18
    const totalPremium = netPremium + gst

    setResult({
      odPremium: Math.round(odPremium),
      tpPremium: Math.round(tpPremium),
      gst: Math.round(gst),
      totalPremium: Math.round(totalPremium)
    })
  }

  return (
    <div className='min-h-screen bg-slate-100 px-4 pb-32 pt-4 md:px-6 lg:px-8'>
      <div className='mx-auto max-w-xl'>
        <div className='mb-6'>
          <h1 className='text-2xl font-black text-slate-900'>Premium Calculator</h1>
          <p className='text-xs font-bold uppercase tracking-widest text-slate-500'>Estimate Insurance Cost</p>
        </div>

        <div className='rounded-[32px] border border-slate-200 bg-slate-50 p-6 shadow-[0_20px_50px_-30px_rgba(15,23,42,0.15)] md:p-8'>
          <div className='space-y-5'>
            {/* Vehicle Type Toggle */}
            <div className='flex gap-2 rounded-2xl bg-slate-200 p-1'>
              <button
                onClick={() => { setVehicleType('motorcycle'); setResult(null); }}
                className={`flex-1 rounded-xl py-2.5 text-xs font-black uppercase tracking-wider transition-all ${vehicleType === 'motorcycle' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'}`}
              >
                Motorcycle
              </button>
              <button
                onClick={() => { setVehicleType('truck'); setResult(null); }}
                className={`flex-1 rounded-xl py-2.5 text-xs font-black uppercase tracking-wider transition-all ${vehicleType === 'truck' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'}`}
              >
                Truck / HCV
              </button>
            </div>

            {/* Inputs */}
            <div className='grid gap-4 sm:grid-cols-2'>
              <div>
                <label className='mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-slate-500'>IDV (Vehicle Value)</label>
                <input
                  type='number'
                  value={idv}
                  onChange={(e) => setIdv(e.target.value)}
                  placeholder='e.g. 50000'
                  className='w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20'
                />
              </div>
              <div>
                <label className='mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-slate-500'>
                  {vehicleType === 'motorcycle' ? 'Engine (CC)' : 'Weight (GVW Tonnes)'}
                </label>
                <input
                  type='number'
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  placeholder={vehicleType === 'motorcycle' ? 'e.g. 150' : 'e.g. 12'}
                  className='w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20'
                />
              </div>
            </div>

            <div>
              <label className='mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-slate-500'>No Claim Bonus (NCB %)</label>
              <div className='grid grid-cols-5 gap-2'>
                {[0, 20, 25, 35, 50].map((val) => (
                  <button
                    key={val}
                    onClick={() => setNcb(val)}
                    className={`rounded-xl border py-2 text-xs font-bold transition-all ${ncb === val ? 'border-indigo-500 bg-indigo-50 text-indigo-600' : 'border-slate-200 bg-white text-slate-500'}`}
                  >
                    {val}%
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className='mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-slate-500'>Coverage Type</label>
              <div className='flex gap-3'>
                <button
                  onClick={() => setCoverageType('comprehensive')}
                  className={`flex-1 rounded-2xl border-2 p-3 text-left transition-all ${coverageType === 'comprehensive' ? 'border-indigo-500 bg-indigo-50/50' : 'border-slate-200 bg-white'}`}
                >
                  <p className='text-xs font-black text-slate-900'>Comprehensive</p>
                  <p className='text-[10px] text-slate-500'>OD + Third Party</p>
                </button>
                <button
                  onClick={() => setCoverageType('tp')}
                  className={`flex-1 rounded-2xl border-2 p-3 text-left transition-all ${coverageType === 'tp' ? 'border-indigo-500 bg-indigo-50/50' : 'border-slate-200 bg-white'}`}
                >
                  <p className='text-xs font-black text-slate-900'>Third Party</p>
                  <p className='text-[10px] text-slate-500'>Mandatory Only</p>
                </button>
              </div>
            </div>

            <button
              onClick={calculatePremium}
              className='w-full rounded-2xl bg-indigo-600 py-4 text-sm font-black uppercase tracking-widest text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-700 active:scale-[0.98]'
            >
              Calculate Premium
            </button>
          </div>

          {result && (
            <div className='mt-8 space-y-4 border-t border-slate-200 pt-8 animate-in fade-in slide-in-from-bottom-4 duration-500'>
              <div className='flex items-center justify-between'>
                <p className='text-xs font-bold text-slate-500 uppercase tracking-wider'>OD Premium ({ncb}% NCB)</p>
                <p className='text-sm font-black text-slate-900'>₹{result.odPremium}</p>
              </div>
              <div className='flex items-center justify-between'>
                <p className='text-xs font-bold text-slate-500 uppercase tracking-wider'>TP Premium</p>
                <p className='text-sm font-black text-slate-900'>₹{result.tpPremium}</p>
              </div>
              <div className='flex items-center justify-between'>
                <p className='text-xs font-bold text-slate-500 uppercase tracking-wider'>GST (18%)</p>
                <p className='text-sm font-black text-slate-900'>₹{result.gst}</p>
              </div>
              <div className='mt-4 flex items-center justify-between rounded-2xl bg-indigo-600 p-4 text-white shadow-xl shadow-indigo-100'>
                <div>
                  <p className='text-[10px] font-bold uppercase tracking-widest opacity-80'>Total Premium</p>
                  <p className='text-2xl font-black tracking-tight'>₹{result.totalPremium}</p>
                </div>
                <div className='rounded-xl bg-white/20 p-2'>
                  <svg className='h-6 w-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={3} d='M9 5l7 7-7 7' />
                  </svg>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PremiumCalculator
