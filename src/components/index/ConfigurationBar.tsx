import { PlusIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import {
  IinitializeLayerData,
  IinitialLayer,
  IlayerData,
} from '../../interfaces/Ilayers'
import AddLayerSlideover from './AddLayerSlideover'
import NetworkDropdown from './NetworkDropdown'

const ConfigurationBar = () => {
  const [network, setNetwork] = useState('eth')
  const [slideoverOpen, setSlideoverOpen] = useState(false)

  const [layerData, setLayerData] = useState<IlayerData>([])

  const [layersOpen, setLayersOpen] = useState<Array<string>>([])

  const updateLayerData = (_newLayerData: IlayerData) => {
    setLayerData(_newLayerData)
  }

  useEffect(() => {
    const unformattedLayers = localStorage.getItem('layers')
    if (unformattedLayers) {
      let layers = JSON.parse(unformattedLayers)
      setLayerData(layers)
    }
  }, [])

  const toggleSlideover = (state: boolean) => {
    setSlideoverOpen(state)
  }

  const chooseNetwork = (_network: string) => {
    setNetwork(_network)
  }

  const toggleLayerOpen = (_layerName: string) => {
    if (layersOpen.includes(_layerName)) {
      let newArray = layersOpen.filter((l) => {
        if (l !== _layerName) return l
      })
      setLayersOpen(newArray)
    } else {
      setLayersOpen((prevArray) => [...prevArray, _layerName])
    }
  }

  const openBase64 = (url: string) => {
    let win = window.open()
    win?.document.write(
      '<iframe src="' +
        url +
        '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>'
    )
  }

  return (
    <div className='w-full h-full'>
      <div className='w-full p-8 border-b border-accent2'>
        <h1 className='mb-8 text-3xl text-white'>layers</h1>
        <div className='grid w-full pt-6'>
          <div className='grid w-full'>
            {layerData.map((layer, index) => (
              <div
                className='grid cursor-pointer grid-cols-[1fr_5fr] grid-rows-[auto_auto] w-full mb-6'
                key={layer.layerName}
                onClick={() => toggleLayerOpen(layer.layerName)}>
                <div className='grid items-center w-full text-accent7 justify-items-center'>
                  <div className='w-max'>
                    {layersOpen.includes(layer.layerName) ? (
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='w-6 h-6'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                        strokeWidth={2}>
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M19 9l-7 7-7-7'
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='w-6 h-6'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                        strokeWidth={2}>
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M9 5l7 7-7 7'
                        />
                      </svg>
                    )}
                  </div>
                </div>
                <div className='w-full p-2 text-right border bg-background text-accent7 justify-self-end border-accent7'>
                  {layer.layerName}
                </div>
                <div className='w-full'></div>
                {layersOpen.includes(layer.layerName) ? (
                  <div className='w-5/6 text-right justify-self-end text-accent7'>
                    {layerData[index]?.attributes.map((n) => (
                      <div className='' key={n.image}>
                        <u
                          className='cursor-pointer'
                          onClick={() => openBase64(n.image)}>
                          {n.name}
                        </u>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
          <Link href='/'>
            <button
              type='button'
              onClick={() => toggleSlideover(!slideoverOpen)}
              className='grid grid-cols-[max-content_max-content] items-center w-full px-4 py-2 font-medium text-black shadow-sm justify-end bg-accent7 hover:bg-accent6'>
              <PlusIcon className='w-5 h-5 mr-3 -ml-1' aria-hidden='true' />
              add layer
            </button>
          </Link>
        </div>
      </div>
      <div className='grid gap-6 px-8 py-6'>
        <h1 className='text-3xl text-white '>configuration</h1>
        <div className='grid grid-cols-2 py-6 text-center text-white'>
          <div className='grid items-center w-max justify-self-end'>
            {network}
          </div>
          <div className='w-max justify-self-end'>
            <NetworkDropdown chooseNetwork={chooseNetwork} />
          </div>
        </div>
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
              className='block w-full shadow-sm text-accent7 bg-background border-accent6 sm:text-sm'
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
              className='block w-full shadow-sm text-accent7 bg-background border-accent6 sm:text-sm'
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
              className='block w-full shadow-sm text-accent7 bg-background border-accent6 sm:text-sm'
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
              className='block w-full shadow-sm text-accent7 bg-background border-accent6 sm:text-sm'
              placeholder='ipfs://newuritoreplace'
            />
          </div>
        </div>
      </div>
      <div className='p-8'>
        <div className='grid justify-end justify-self-end justify-items-end'>
          <div className='grid w-5/6 grid-cols-2'>
            <div className='w-2/3'>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-right text-accent7'>
                width (px)
              </label>
              <div className='mt-1'>
                <input
                  type='email'
                  name='widthFormat'
                  id='widthFormat'
                  className='block w-full shadow-sm bg-background text-accent7 border-accent6 sm:text-sm'
                  placeholder='512'
                />
              </div>
            </div>
            <div className='w-2/3 justify-self-end'>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-right text-accent7'>
                height (px)
              </label>
              <div className='mt-1'>
                <input
                  type='text'
                  name='heightFormat'
                  id='heightFormat'
                  className='block w-full shadow-sm bg-background text-accent7 border-accent6 sm:text-sm'
                  placeholder='512'
                />
              </div>
            </div>
          </div>
        </div>
        <div className='py-5'>
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
                className='block w-full shadow-sm text-accent7 bg-background border-accent6 sm:text-sm'
                placeholder='10000'
              />
            </div>
          </div>
        </div>
      </div>
      <AddLayerSlideover
        slideoverOpen={slideoverOpen}
        toggleSlideover={toggleSlideover}
        updateLayerData={updateLayerData}
      />
    </div>
  )
}

export default ConfigurationBar
