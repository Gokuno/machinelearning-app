import React, { useState, useEffect, useRef } from 'react'

export default function HomePage(props) {
  const { setAudioStream, setFile } = props

  const [recordingStatus, setRecordingStatus]  = useState('inactive')
  const [audioChunks, setAudioChunks]  = useState([])
  const [duration, setDuration] = useState(0)

  const mediaRecorder = useRef(null)

  const mimeType = 'audio/webm'

  async function startRecording() {
    let tempStream

    console.log('start recording') 

    try {
        const streamData = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false
        })
        tempStream = streamData
    } catch (err) {
      console.log(err.message)
      return
    }

    setRecordingStatus('grabando')

    //Crear nueva instancia de Media recorder usando el stream
    const media = new MediaRecorder(tempStream, { type: mimeType })
    mediaRecorder.current = media

    mediaRecorder.current.start()
    let localAudioChunks = []
    mediaRecorder.current.ondataavailable = (event) => {
      if (typeof event.data === 'undefined') { return }
      if (event.data.size === 0) { return }
      localAudioChunks.push(event.data)
    }
    setAudioChunks(localAudioChunks)
  }

  async function stopRecording() {
    setRecordingStatus('inactive')
    console.log('stop recording')

    mediaRecorder.current.stop()
    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(audioChunks, {type: mimeType})
      setAudioStream(audioBlob)
      setAudioChunks([])
      setDuration(0)
    }
  }

  useEffect(() => {
    if (recordingStatus === 'inactive') {return}

    const interval = setInterval(() => {
      setDuration(curr => curr + 1)
    }, 1000) 

    return () => clearInterval(interval)
  })


  return (
        <main className='flex-1 p-4 flex flex-col justify-center gap-3 sm:gap-4 text-center pb-10'>
            <h1 className='font-semibold text-5xl sm:text-6xl md:text-7xl'>Voz <span className='text-blue-400 bold'>A</span> Texto</h1>
            <h3 className='font-medium'>Graba <span 
            className='text-blue-400'>&rarr;</span> Transcribe <span 
            className='text-blue-400'>&rarr;</span> Traduce </h3>
            <button onClick={recordingStatus === 'grabando' ? stopRecording : startRecording} className='flex specialBtn px-4 py-2 rounded-xl items-center text-base justify-between gap-4 mx-auto w-72 max-w-full my-4'>
              <p className='text-blue-400'>{recordingStatus === 'inactive' ? 'Grabar' : `Detener grabacion`}</p>
              <div className='flex items-center gap-2'>
                {duration && (
                  <p className='text-sm'>{duration}s</p>
                )}
              <i className={"fa-solid duration-200 fa-microphone" + (recordingStatus === 'grabando' ? ' text-red-500' : "")}></i>
              </div>
            </button>
            <p className='text-base'>O <label className='text-blue-400 cursor-pointer hover:text-blue-600 duration-200'>carga <input onChange={(e) => {
              const tempFile = e.target.files[0]
              setFile(tempFile)
            }} className='hidden' type='file' accept='.mp3, .wave'/></label> un archivo mp3</p>
            <p className='italic text-slate-400'>Gratis y facil de usar</p>
        </main>
  )
}
