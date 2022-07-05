import { PlusIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { useState } from 'react'
import AddLayerSlideover from './AddLayerSlideover'
import NetworkDropdown from './NetworkDropdown'

const ConfigurationBar = () => {
  const [network, setNetwork] = useState('eth')
  const [slideoverOpen, setSlideoverOpen] = useState(false)

  const toggleSlideover = (state: boolean) => {
    setSlideoverOpen(state)
  }

  const chooseNetwork = (_network: string) => {
    setNetwork(_network)
  }
  return (
    <div className='w-full h-full'>
      <h1 className='text-3xl text-white '>configuration</h1>
      <div className='grid grid-cols-2 py-6 text-center text-white border-b border-b-accent2'>
        <div className='grid items-center w-max justify-self-end'>
          {network}
        </div>
        <div className='w-max justify-self-end'>
          <NetworkDropdown chooseNetwork={chooseNetwork} />
        </div>
      </div>
      <div className='w-full py-6 border-b border-accent2'>
        <Link href='/'>
          <button
            type='button'
            onClick={() => toggleSlideover(!slideoverOpen)}
            className='grid grid-cols-[max-content_max-content] items-center w-full px-4 py-2 font-medium text-black rounded-md shadow-sm justify-end bg-accent7 hover:bg-accent6'>
            <PlusIcon className='w-5 h-5 mr-3 -ml-1' aria-hidden='true' />
            add layer
          </button>
        </Link>
      </div>
      <div className='grid gap-4 py-6 border-b border-accent2'>
        <div className='grid w-full justify-items-end'>
          <label
            htmlFor='email'
            className='block text-sm font-medium text-accent7'>
            collection name
          </label>
          <div className='w-5/6 mt-1'>
            <input
              type='email'
              name='email'
              id='email'
              className='block w-full rounded-md shadow-sm text-accent7 bg-background border-accent6 sm:text-sm'
              placeholder='joyful giraffe golfing club'
            />
          </div>
        </div>
        <div className='grid w-full justify-items-end'>
          <label
            htmlFor='email'
            className='block text-sm font-medium text-accent7'>
            brief description
          </label>
          <div className='w-5/6 mt-1'>
            <input
              type='email'
              name='email'
              id='email'
              className='block w-full rounded-md shadow-sm text-accent7 bg-background border-accent6 sm:text-sm'
              placeholder='soon-to-be #1 nft collection'
            />
          </div>
        </div>
        <div className='grid w-full justify-items-end'>
          <label
            htmlFor='email'
            className='block text-sm font-medium text-accent7'>
            amount of nfts
          </label>
          <div className='w-5/6 mt-1'>
            <input
              type='email'
              name='email'
              id='email'
              className='block w-full rounded-md shadow-sm text-accent7 bg-background border-accent6 sm:text-sm'
              placeholder='3333'
            />
          </div>
        </div>
        <div className='grid w-full justify-items-end'>
          <label
            htmlFor='email'
            className='block text-sm font-medium text-accent7'>
            base uri
          </label>
          <div className='w-5/6 mt-1'>
            <input
              type='email'
              name='email'
              id='email'
              className='block w-full rounded-md shadow-sm text-accent7 bg-background border-accent6 sm:text-sm'
              placeholder='ipfs://newuritoreplace'
            />
          </div>
        </div>
      </div>
      <div>
        <div className='grid grid-cols-2 py-6 border-b justify-items-center border-accent2'>
          <div className='w-1/2'>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-center text-accent7'>
              width (px)
            </label>
            <div className='mt-1'>
              <input
                type='email'
                name='widthFormat'
                id='widthFormat'
                className='block w-full rounded-md shadow-sm bg-background text-accent7 border-accent6 sm:text-sm'
                placeholder='512'
              />
            </div>
          </div>
          <div className='w-1/2'>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-center text-accent7'>
              height (px)
            </label>
            <div className='mt-1'>
              <input
                type='text'
                name='heightFormat'
                id='heightFormat'
                className='block w-full rounded-md shadow-sm bg-background text-accent7 border-accent6 sm:text-sm'
                placeholder='512'
              />
            </div>
          </div>
        </div>
        <div className='py-6'>
          <div className='grid w-full justify-items-end'>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-accent7'>
              dna torrance
            </label>
            <div className='w-5/6 mt-1'>
              <input
                type='email'
                name='email'
                id='email'
                className='block w-full rounded-md shadow-sm text-accent7 bg-background border-accent6 sm:text-sm'
                placeholder='10000'
              />
            </div>
          </div>
        </div>
      </div>
      <AddLayerSlideover
        slideoverOpen={slideoverOpen}
        toggleSlideover={toggleSlideover}
      />
    </div>
  )
}

export default ConfigurationBar
