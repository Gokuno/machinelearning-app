import React, { useRef, useEffect } from 'react'

export default function FileDisplay(props) {
    const { handleAudioReset, file, audioStream, handleFormSubmission } = props
   

  return (
    <main className='flex-1 p-4 flex flex-col justify-center gap-3 sm:gap-4 text-center pb-20 w-72 sm:w-96 max-w-full mx-auto'>
        <h1 className='font-semibold text-4xl sm:text-5xl md:text-6xl'>Archivo <span className='text-blue-400 bold'>Cargado </span></h1>  
        <div className='mx-auto flex flex-col text-center my-4'>
            <h3 className='font-semibold'>Nombre del archivo</h3>
            <p>{file ? file?.name : 'Custom audio'}</p>
        </div>  
        <div className='flex items-center justify-between gap-4'>
            <button onClick={handleAudioReset} className='text-slate-400 hover:text-slate-600 duration-200'>
                Reiniciar
            </button>
        
            <button onClick={handleFormSubmission} className='specialBtn font-medium px-2 py-2 rounded-lg text-blue-400 hover:text-blue-600 duration-200 flex items-center gap-2'>
                <p>Transcribir</p>
                <i className="fa-solid fa-pen"></i>
            </button>
        </div>
    </main>
  )
}
