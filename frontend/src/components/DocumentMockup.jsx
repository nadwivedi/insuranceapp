const DocumentMockup = ({ type = 'Insurance', vehicleNumber = 'MH01AB1234', color = 'indigo' }) => {
  return (
    <div className={`relative aspect-[3/4] w-full overflow-hidden rounded-2xl border-4 border-white bg-white shadow-2xl shadow-slate-200`}>
      {/* Document Header */}
      <div className={`bg-${color}-600 p-4 text-white`}>
        <div className='flex items-center justify-between'>
          <div className='h-8 w-8 rounded-full bg-white/20' />
          <div className='text-right'>
            <p className='text-[8px] font-black uppercase tracking-widest opacity-80'>Official Certificate</p>
            <p className='text-xs font-black uppercase'>{type}</p>
          </div>
        </div>
      </div>

      {/* Document Body */}
      <div className='p-6'>
        <div className='mb-6 space-y-2'>
          <div className='h-1 w-20 rounded-full bg-slate-100' />
          <div className='h-1 w-32 rounded-full bg-slate-100' />
        </div>

        <div className='mb-8 rounded-xl border-2 border-dashed border-slate-100 p-4 text-center'>
          <p className='text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400'>Registration Number</p>
          <p className='text-2xl font-black tracking-widest text-slate-900'>{vehicleNumber}</p>
        </div>

        <div className='grid grid-cols-2 gap-4'>
          <div className='space-y-3'>
            <div>
              <p className='text-[8px] font-bold uppercase text-slate-400'>Chassis No</p>
              <div className='h-1 w-full rounded-full bg-slate-100' />
            </div>
            <div>
              <p className='text-[8px] font-bold uppercase text-slate-400'>Engine No</p>
              <div className='h-1 w-full rounded-full bg-slate-100' />
            </div>
          </div>
          <div className='flex items-center justify-center'>
            <div className='h-16 w-16 rounded-lg border-2 border-slate-100 bg-slate-50 flex items-center justify-center'>
               <div className='h-10 w-10 opacity-10 bg-slate-900 rounded-sm' />
            </div>
          </div>
        </div>

        <div className='mt-8 flex justify-between items-end'>
          <div className='space-y-1'>
            <div className='h-1 w-12 bg-slate-100 rounded-full' />
            <div className='h-1 w-16 bg-slate-100 rounded-full' />
          </div>
          <div className='text-center'>
            <div className='mb-1 h-6 w-16 bg-slate-50 border border-slate-100 rounded rotate-[-12deg] flex items-center justify-center'>
               <p className='text-[6px] font-bold text-slate-300'>APPROVED</p>
            </div>
            <p className='text-[6px] font-bold uppercase text-slate-400'>Auth. Signatory</p>
          </div>
        </div>
      </div>

      {/* Security Hologram */}
      <div className='absolute bottom-4 right-4 h-6 w-6 rounded-full bg-gradient-to-tr from-yellow-400 via-amber-200 to-yellow-500 opacity-30 shadow-inner' />
    </div>
  )
}

export default DocumentMockup
