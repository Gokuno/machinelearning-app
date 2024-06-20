import React from 'react'

export default function Transcribing(props) {
    const { downloading } = props
    
  return (
    <div className='flex items-center flex-1 flex-col justify-center gap-10 md:gap-14 pb-24 p-4'>
        <div className='flex flex-col gap=2 sm:gap-4 text-center'>

        <h1 className='font-semibold text-4xl sm:text-5xl md:text-6xl'><span className='text-blue-400 bold'>Transcribiendo </span></h1>
        <p>{!downloading ? 'procesando' : 'procesado'}</p>

        </div>
        <div className='flex flex-col gap-2 sm:gap-3 max-w[400px] mx-auto w-full'>
            {[0, 1, 2].map(val => {
                return(
                    <div key={val} className={'rounded-full h-2 sm:h-3 bg-slate-300 loading ' + `loading${val}`}></div>
                )
            })}
        </div>
    </div>
  )
}
