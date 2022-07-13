import { PlusIcon } from '@heroicons/react/outline'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { listenerCount } from 'process'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { DragDropContext, Droppable, Draggable, resetServerContext } from 'react-beautiful-dnd'
import { IinitializeLayerData, IinitialLayer, IlayerData } from '../../interfaces/Ilayers'
import AddLayerSlideover from './AddLayerSlideover'
import NetworkDropdown from './NetworkDropdown'

interface IConfigurationBar {
  setNetwork: (param: string) => void
  setCollectionName: (param: string) => void
  setDescription: (param: string) => void
  setAmount: (param: number) => void
  setBaseUri: (param: string) => void
  setWidth: (param: number) => void
  setHeight: (param: number) => void
  setDnaTorrance: (param: number) => void

  network: string
  collectionName: string
  description: string
  amount: number
  baseUri: string
  width: number
  height: number
  dnaTorrance: number
}

const ConfigurationBar: React.FC<IConfigurationBar> = (props) => {
  const [slideoverOpen, setSlideoverOpen] = useState(false)

  const [layerData, setLayerData] = useState<IlayerData>([])

  const [layersOpen, setLayersOpen] = useState<Array<string>>([])

  const updateLayerData = (_newLayerData: IlayerData) => {
    setLayerData(_newLayerData)
  }

  const [isBrowser, setIsBrowser] = useState('undefined')

  useEffect(() => {
    const unformattedLayers = localStorage.getItem('layers')
    if (unformattedLayers) {
      let layers = JSON.parse(unformattedLayers)
      setLayerData(layers)
    }
    setIsBrowser(typeof window)
  }, [])

  const toggleSlideover = (state: boolean) => {
    setSlideoverOpen(state)
  }

  const chooseNetwork = (_network: string) => {
    props.setNetwork(_network)
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
        '" frameborder="0" style="border:0; display:grid; justify-items:center; align-items:center; background-color:black; top:50%; left:0%; bottom:0px; margin-left:0%; right:0px; width:100%; height:100%;" allowfullscreen></iframe>'
    )
  }

  return (
    <div className='w-full h-full'>
      <div className='w-full p-8 border-b border-accent2'>
        <h1 className='mb-8 text-3xl text-white'>layers</h1>
        <div className='grid w-full pt-6'>
          {isBrowser !== 'undefined' ? (
            <DragDropContext
              onDragEnd={(param) => {
                const srcI = param.source.index
                const destI = param.destination?.index
                if (destI !== undefined && layerData !== undefined && srcI !== undefined) {
                  const srcElement = layerData[srcI]
                  const destElement = layerData[destI]
                  if (destElement && srcElement) {
                    let newArray = layerData
                    newArray[srcI] = destElement
                    newArray[destI] = srcElement
                    setLayerData(newArray)
                    localStorage.setItem('layers', JSON.stringify(layerData))
                  }
                }
              }}>
              <Droppable droppableId='droppable-1'>
                {(provided, _) => (
                  <div ref={provided.innerRef} className='grid w-full' {...provided.droppableProps}>
                    {layerData.map((layer, index) => (
                      <Draggable
                        key={layer.layerName}
                        draggableId={'draggable-' + layer.layerName}
                        index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className='grid grid-cols-[1fr_5fr] grid-rows-[auto_auto] w-full mb-6'>
                            <div
                              onClick={() => toggleLayerOpen(layer.layerName)}
                              className='grid items-center w-full cursor-pointer text-accent7 justify-items-center'>
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
                            <div className='grid w-full grid-cols-[max-content_auto] p-2 text-right border bg-background text-accent7 justify-self-end border-accent7'>
                              <span
                                className='cursor-pointer text-accent5'
                                onClick={() => console.log('clicked')}>
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
                                    d='M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z'
                                  />
                                </svg>
                              </span>
                              <p>{layer.layerName}</p>
                            </div>
                            <div className='grid items-center w-full justify-items-center text-accent5'></div>
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
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          ) : null}
          <Link href='/'>
            <button
              type='button'
              onClick={() => toggleSlideover(!slideoverOpen)}
              className='grid grid-cols-[max-content_max-content] items-center w-full px-4 py-2 text-black shadow-sm justify-end bg-accent7 hover:bg-accent6'>
              <PlusIcon className='w-5 h-5 mr-3 -ml-1' aria-hidden='true' />
              add layer
            </button>
          </Link>
        </div>
      </div>
      <div className='grid gap-6 px-8 py-6'>
        <h1 className='text-3xl text-white '>configuration</h1>
        <div className='grid grid-cols-2 py-6 text-center text-white'>
          <div className='grid items-center w-max justify-self-end'>{props.network}</div>
          <div className='w-max justify-self-end'>
            <NetworkDropdown chooseNetwork={chooseNetwork} />
          </div>
        </div>
        <div className='grid w-full justify-items-end'>
          <label htmlFor='email' className='block text-sm text-accent7'>
            collection name
          </label>
          <div className='w-5/6 mt-1'>
            <input
              type='text'
              name='collectionName'
              id='collectionName'
              className='block w-full shadow-sm text-accent7 bg-background border-accent6 sm:text-sm'
              placeholder='joyful giraffe golfing club'
              onChange={(e) => props.setCollectionName(e.target.value)}
              value={props.collectionName}
            />
          </div>
        </div>
        <div className='grid w-full justify-items-end'>
          <label htmlFor='email' className='block text-sm text-accent7'>
            brief description
          </label>
          <div className='w-5/6 mt-1'>
            <input
              type='text'
              name='description'
              id='description'
              className='block w-full shadow-sm text-accent7 bg-background border-accent6 sm:text-sm'
              placeholder='soon-to-be #1 nft collection'
              onChange={(e) => props.setDescription(e.target.value)}
              value={props.description}
            />
          </div>
        </div>
        <div className='grid w-full justify-items-end'>
          <label htmlFor='email' className='block text-sm text-accent7'>
            amount of nfts
          </label>
          <div className='w-5/6 mt-1'>
            <input
              type='text'
              name='amount'
              id='amount'
              className='block w-full shadow-sm text-accent7 bg-background border-accent6 sm:text-sm'
              placeholder='3333'
              onChange={(e) => props.setAmount(Number(e.target.value))}
              value={props.amount}
            />
          </div>
        </div>
        <div className='grid w-full justify-items-end'>
          <label htmlFor='email' className='block text-sm text-accent7'>
            base uri
          </label>
          <div className='w-5/6 mt-1'>
            <input
              type='text'
              name='baseUri'
              id='baseUri'
              className='block w-full shadow-sm text-accent7 bg-background border-accent6 sm:text-sm'
              placeholder='ipfs://newuritoreplace'
              onChange={(e) => props.setBaseUri(e.target.value)}
              value={props.baseUri}
            />
          </div>
        </div>
      </div>
      <div className='p-8'>
        <div className='grid justify-end justify-self-end justify-items-end'>
          <div className='grid w-5/6 grid-cols-2'>
            <div className='w-2/3'>
              <label htmlFor='email' className='block text-sm text-right text-accent7'>
                width (px)
              </label>
              <div className='mt-1'>
                <input
                  type='text'
                  name='width'
                  id='width'
                  className='block w-full shadow-sm bg-background text-accent7 border-accent6 sm:text-sm'
                  placeholder='512'
                  onChange={(e) => props.setWidth(Number(e.target.value))}
                  value={props.width}
                />
              </div>
            </div>
            <div className='w-2/3 justify-self-end'>
              <label htmlFor='email' className='block text-sm text-right text-accent7'>
                height (px)
              </label>
              <div className='mt-1'>
                <input
                  type='text'
                  name='height'
                  id='height'
                  className='block w-full shadow-sm bg-background text-accent7 border-accent6 sm:text-sm'
                  placeholder='512'
                  onChange={(e) => props.setHeight(Number(e.target.value))}
                  value={props.height}
                />
              </div>
            </div>
          </div>
        </div>
        <div className='py-5'>
          <div className='grid w-full justify-items-end'>
            <label htmlFor='email' className='block text-sm text-accent7'>
              dna torrance
            </label>
            <div className='w-5/6 mt-1'>
              <input
                type='email'
                name='email'
                id='email'
                className='block w-full shadow-sm text-accent7 bg-background border-accent6 sm:text-sm'
                placeholder='10000'
                onChange={(e) => props.setDnaTorrance(Number(e.target.value))}
                value={props.dnaTorrance}
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
