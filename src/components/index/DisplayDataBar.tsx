const DisplayDataBar = () => {
  return (
    <div className='w-full h-full p-12'>
      <div className='grid w-full py-8 border-b border-accent2 grid-cols-[1fr_max-content_max-content] items-center justify-end'>
        <div className='w-full text-white justify-self-start'>hi</div>
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