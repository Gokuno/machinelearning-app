import React, { useState } from 'react'
import Transcription from './Transcription'
import Translation from './Translation'

export default function Information(props) {
  const { output } = props
  const [tab, setTab] = useState('transcription')
  console.log(output)

  function handleCopy() {
    navigator.clipboard.writeText()
  }

  function handleDownload() {
    const element = document.createElement('a')
    const file = new Blob([], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download(`Voiscribe_${(new Date().toDateString())}.txt`)
    document.body.appendChild(element)
    element.click()
  }


  return (
    <div>
      <main className='flex-1 p-4 flex flex-col justify-center gap-3 sm:gap-4 text-center pb-20 max-w-prose w-full mx-auto'>
      <h1 className='font-semibold text-4xl sm:text-5xl md:text-6xl whitespace-nowrap'>Tu <span className='text-blue-400 bold'>Transcripcion </span></h1>

      <div className='grid grid-cols-2 mx-auto bg-white shadow rounded-full overflow-hidden items-center'>
          <button onClick={() => setTab('transcription')} className={'px-4 duration-200 py-1 font-medium ' + (tab === 'transcription' ? ' bg-blue-400 text text-white' : ' text-blue-400 hover:text-blue-600')}>
              Transcripcion
          </button>
          <button onClick={() => setTab('translation')} className={'px-4 duration-200 py-1 font-medium ' + (tab === 'translation' ? ' bg-blue-400 text text-white' : ' text-blue-400 hover:text-blue-600')}>
              Traduccion
          </button>
      </div>
      <div className='my-8 flex flex-col'>
      {tab === 'transcription' ? (
          <Transcription {...props} />
      ) : (
          <Translation {...props} />
      )}
      </div>
      <div className='flex items=center gap-4 mx-auto'>
        <button title="Copy" className='bg-white hover:text-blue-600 duration-200 px-2 aspect-square grid place-items-center rounded text-blue-400'>
        <i className="fa-solid fa-copy"></i>
        </button>
        <button title="Download" className='bg-white hover:text-blue-600 duration-200 px-2 aspect-square grid place-items-center rounded text-blue-400'>
        <i className="fa-solid fa-download"></i>
        </button>
        
      </div>
      </main>
    </div>
  )
}
