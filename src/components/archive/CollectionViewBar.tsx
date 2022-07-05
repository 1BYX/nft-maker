const CollectionViewBar = () => {
  return (
    <div className='w-full h-full p-8'>
      <div className='grid w-full py-6 border-b border-accent2 grid-cols-[1fr_max-content_max-content] items-center justify-end'>
        <div className='w-max justify-self-end'>
          <button
            type='button'
            className='inline-flex items-center py-5 text-xl font-medium rounded-md shadow-sm px-7 text-accent1 bg-successDefault'>
            download
          </button>
        </div>
      </div>
      <div className='w-full'></div>
    </div>
  )
}

export default CollectionViewBar
