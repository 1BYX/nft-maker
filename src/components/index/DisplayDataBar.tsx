import { useEffect, useState } from 'react'

const DisplayDataBar = () => {
  const [progress, setProgress] = useState(25)

  const updateProgress = () => {
    setInterval(() => {
      if (progress > 100) {
      } else {
        setProgress((prevProgress) => prevProgress + 1)
      }
    }, 100)
  }

  useEffect(() => {
    // updateProgress()
  }, [])

  return (
    <div className='w-full h-full p-8'>
      <div className='grid w-full py-6 border-b border-accent2 grid-cols-[1fr_max-content_max-content] items-center justify-end'>
        <div className='grid w-full grid-cols-[max-content_max-content] items-center gap-4 text-white justify-self-start'>
          <div className='w-32 rounded-full h-2.5 bg-accent2'>
            <div
              className='bg-highlightYellow h-2.5 border border-highlightYellow rounded-full'
              style={{ width: `${progress}%` }}></div>
          </div>
          <div>{progress}%</div>
        </div>
        <div className='mr-10 w-max justify-self-end'>
          <button
            type='button'
            className='inline-flex items-center px-2 py-1 text-base font-medium border rounded-md shadow-sm py text-accent7 bg-background border-accent7'>
            run sample
          </button>
        </div>
        <div className='w-max justify-self-end'>
          <button
            type='button'
            className='inline-flex items-center py-5 text-xl font-medium rounded-md shadow-sm px-7 text-accent1 bg-highlightYellow'>
            generate
          </button>
        </div>
      </div>
      <div className='w-full'></div>
    </div>
  )
}

export default DisplayDataBar
