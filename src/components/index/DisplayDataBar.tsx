import { useEffect, useState } from 'react'

const DisplayDataBar = () => {
  const [progress, setProgress] = useState(0)

  return (
    <div className='w-full h-full'>
      <div className='grid w-full py-10 px-8 border-b border-accent2 grid-cols-[1fr_max-content_max-content] items-center justify-end'>
        <div className='grid w-full grid-cols-[max-content_max-content] items-center gap-4 text-white justify-self-start'>
          <div className='w-32 h-2.5 bg-accent2'>
            <div
              className='bg-highlightYellow h-2.5'
              style={{ width: `${progress}%` }}></div>
          </div>
          <div>{progress}%</div>
        </div>
        <div className='mr-10 w-max justify-self-end'>
          <button
            type='button'
            className='inline-flex items-center px-2 py-1 text-base font-medium border shadow-sm py text-accent7 bg-background border-accent7'>
            run sample
          </button>
        </div>
        <div className='w-max justify-self-end'>
          <button
            type='button'
            className='inline-flex items-center px-6 py-4 text-xl font-medium shadow-sm text-accent1 bg-highlightYellow'>
            generate
          </button>
        </div>
      </div>
      <div className='w-full'></div>
    </div>
  )
}

export default DisplayDataBar
