import { PlusIcon } from '@heroicons/react/outline'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { listenerCount } from 'process'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { DragDropContext, Droppable, Draggable, resetServerContext } from 'react-beautiful-dnd'
import { IinitializeLayerData, IinitialLayer, IlayerData } from '../../interfaces/Ilayers'
import AddLayerSlideover from './AddLayerSlideover'
import NetworkDropdown from './NetworkDropdown'
import onClickOutside from 'react-onclickoutside'
import { useClickOutside } from '../commons/useClickOutside'
import LayerDeleteModal from '../commons/layerDeleteModal'

interface IConfigurationBar {
  errors: Array<any>
  updateErrors: (errors: Array<any>) => void
  setNetwork: (param: string) => void
  setCollectionName: (param: string) => void
  setDescription: (param: string) => void
  setAmount: (param: string) => void
  setBaseUri: (param: string) => void
  setWidth: (param: string) => void
  setHeight: (param: string) => void
  setDnaTorrance: (param: string) => void

  network: string
  collectionName: string
  description: string
  amount: string
  baseUri: string
  width: string
  height: string
  dnaTorrance: string
}

const ConfigurationBar: React.FC<IConfigurationBar> = (props) => {
  const [slideoverOpen, setSlideoverOpen] = useState({
    isOpen: false,
    initialData: '',
  })
  const [layerData, setLayerData] = useState<IlayerData>([])
  const [layersOpen, setLayersOpen] = useState<Array<string>>([])
  const updateLayerData = (_newLayerData: IlayerData) => {
    setLayerData(_newLayerData)
  }
  const [isBrowser, setIsBrowser] = useState('undefined')
  const [layerOptions, setLayerOptions] = useState({
    layerName: '',
    isOpen: false,
  })

  const [isConfigSaved, setIsConfigSaved] = useState(false)

  useEffect(() => {
    const unformattedLayers = localStorage.getItem('layers')
    if (unformattedLayers) {
      let layers = JSON.parse(unformattedLayers)
      setLayerData(layers)
    }
    setIsBrowser(typeof window)

    const unformattedConfig = localStorage.getItem('config')
    if (unformattedConfig) {
      let config = JSON.parse(unformattedConfig)
      props.setNetwork(config[0].value)
      props.setCollectionName(config[1].value)
      props.setDescription(config[2].value)
      props.setAmount(config[3].value)
      props.setBaseUri(config[4].value)
      props.setWidth(config[5].value)
      props.setHeight(config[6].value)
      props.setDnaTorrance(config[7].value)
    }
  }, [])

  const toggleSlideover = (state: boolean) => {
    setSlideoverOpen({
      isOpen: state,
      initialData: '',
    })
  }

  const [layerDelete, setLayerDelete] = useState({
    layerName: '',
    isOpen: false,
  })

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

  const updateLayerOptions = (_layerName: string) => {
    if (layerOptions.layerName !== _layerName && layerOptions.layerName !== '') {
      setLayerOptions({
        layerName: '',
        isOpen: false,
      })
      setLayerOptions((prevOptions) => ({
        layerName: _layerName,
        isOpen: !prevOptions.isOpen,
      }))
    } else {
      setLayerOptions((prevOptions) => ({
        layerName: _layerName,
        isOpen: !prevOptions.isOpen,
      }))
    }
  }

  const openLayerDeleteModal = (_layerName: string) => {
    setLayerDelete({
      layerName: _layerName,
      isOpen: true,
    })
  }

  const deleteAttribute = (_layerName: string, _attributeName: string) => {
    const unformattedLayers = localStorage.getItem('layers')
    if (unformattedLayers) {
      const layers = JSON.parse(unformattedLayers)
      const newLayers = layers
      for (let i = 0; i < layers.length; i++) {
        if (layers[i].layerName == _layerName) {
          if (layers[i].attributes.length == 1) {
            deleteLayer(layers[i].layerName)
            return
          }
          const newTargetLayerAttributes = layers[i].attributes.filter((la: any) => {
            return la.name !== _attributeName
          })
          layers[i].attributes = newTargetLayerAttributes
          localStorage.setItem('layers', JSON.stringify(newLayers))
          setLayerData(newLayers)
        }
      }
    }
    return
  }

  const deleteLayer = (_layerName: string) => {
    const unformattedLayers = localStorage.getItem('layers')
    if (unformattedLayers) {
      let layers = JSON.parse(unformattedLayers)
      const newLayers = layers.filter((obj: any) => {
        return obj.layerName !== _layerName
      })
      localStorage.setItem('layers', JSON.stringify(newLayers))
      setLayerData(newLayers)
    }
  }

  const editLayer = (_layerName: string) => {
    setSlideoverOpen({
      isOpen: true,
      initialData: _layerName,
    })
  }

  const domNode = useClickOutside(() => {
    setLayerOptions({
      layerName: '',
      isOpen: false,
    })
  })

  const updateConfig = () => {
    setIsConfigSaved(true)
    const config = [
      {
        name: 'network',
        value: props.network,
      },
      {
        name: 'collectionName',
        value: props.collectionName,
      },
      {
        name: 'description',
        value: props.description,
      },
      {
        name: 'amount',
        value: props.amount,
      },
      {
        name: 'baseUri',
        value: props.baseUri,
      },
      {
        name: 'width',
        value: props.width,
      },
      {
        name: 'height',
        value: props.height,
      },
      {
        name: 'dnaTorrance',
        value: props.dnaTorrance,
      },
    ]
    localStorage.setItem('config', JSON.stringify(config))
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
                            className='grid relative grid-cols-[1fr_5fr] grid-rows-[auto_auto] gap-y-4 w-full mb-6'>
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
                            <div
                              ref={
                                layerOptions.isOpen && layerOptions.layerName == layer.layerName
                                  ? domNode
                                  : null
                              }
                              className='grid w-full grid-cols-[max-content_auto] p-2 text-right border bg-background text-accent7 justify-self-end border-accent7'>
                              <span
                                className='cursor-pointer text-accent5'
                                onClick={() => updateLayerOptions(layer.layerName)}>
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
                              {layer.layerName == layerOptions.layerName && layerOptions.isOpen ? (
                                <div className='absolute z-20 grid w-2/3 grid-cols-2 p-2 opacity-90 top-px right-1.5 bg-background text-accent7'>
                                  <u
                                    onClick={() => editLayer(layer.layerName)}
                                    className='px-4 border-r cursor-pointer border-accent7'>
                                    edit
                                  </u>
                                  <u
                                    onClick={() => openLayerDeleteModal(layer.layerName)}
                                    className='cursor-pointer'>
                                    delete layer
                                  </u>
                                </div>
                              ) : null}
                            </div>
                            {layerDelete.isOpen && layerDelete.layerName === layer.layerName ? (
                              <LayerDeleteModal
                                deleteLayer={deleteLayer}
                                layerName={layer.layerName}
                              />
                            ) : null}
                            <div className='grid items-center w-full justify-items-center text-accent5'></div>
                            {layersOpen.includes(layer.layerName) ? (
                              <div className='grid w-5/6 gap-2 mr-4 text-right justify-self-end text-accent7'>
                                {layerData[index]?.attributes.map((n) => (
                                  <div
                                    className='grid grid-cols-[auto_max-content] gap-4'
                                    key={n.image}>
                                    <u
                                      className='cursor-pointer'
                                      onClick={() => openBase64(n.image)}>
                                      {n.name}
                                    </u>
                                    <div
                                      className='cursor-pointer w-max h-max text-accent5'
                                      onClick={() => deleteAttribute(n.layer, n.name)}>
                                      <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        className='w-5 h-5'
                                        viewBox='0 0 20 20'
                                        fill='currentColor'>
                                        <path
                                          fillRule='evenodd'
                                          d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                                          clipRule='evenodd'
                                        />
                                      </svg>
                                    </div>
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
              onClick={() => toggleSlideover(!slideoverOpen.isOpen)}
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
          <label
            htmlFor='collectionName'
            className={`${
              props.errors.includes('collectionName') ? 'text-errorDefault' : 'text-accent7'
            } block text-sm`}>
            {props.errors.includes('collectionName') ? (
              <p>invalid input for collection name</p>
            ) : (
              <p>collection name</p>
            )}
          </label>
          <div className='w-5/6 mt-1'>
            <input
              type='text'
              name='collectionName'
              id='collectionName'
              className={`${
                props.errors.includes('collectionName') ? 'border-errorDefault' : 'border-accent6'
              } block w-full shadow-sm text-accent7 bg-background sm:text-sm`}
              placeholder='joyful giraffe golfing club'
              onChange={(e) => props.setCollectionName(e.target.value)}
              value={props.collectionName}
            />
          </div>
        </div>
        <div className='grid w-full justify-items-end'>
          <label
            htmlFor='email'
            className={`${
              props.errors.includes('description') ? 'text-errorDefault' : 'text-accent7'
            } block text-sm`}>
            {props.errors.includes('description') ? (
              <p>invalid input for description</p>
            ) : (
              <p>brief description</p>
            )}
          </label>
          <div className='w-5/6 mt-1'>
            <input
              type='text'
              name='description'
              id='description'
              className={`${
                props.errors.includes('description') ? 'border-errorDefault' : 'border-accent6'
              } block w-full shadow-sm text-accent7 bg-background sm:text-sm`}
              placeholder='soon-to-be #1 nft collection'
              onChange={(e) => props.setDescription(e.target.value)}
              value={props.description}
            />
          </div>
        </div>
        <div className='grid w-full justify-items-end'>
          <label
            htmlFor='email'
            className={`${
              props.errors.includes('amount') ? 'text-errorDefault' : 'text-accent7'
            } block text-sm`}>
            {props.errors.includes('amount') ? (
              <p>invalid input for the amount</p>
            ) : (
              <p>amount of nfts</p>
            )}
          </label>
          <div className='w-5/6 mt-1'>
            <input
              type='text'
              name='amount'
              id='amount'
              className={`${
                props.errors.includes('amount') ? 'border-errorDefault' : 'border-accent6'
              } block w-full shadow-sm text-accent7 bg-background sm:text-sm`}
              onChange={(e) => props.setAmount(e.target.value)}
              value={props.amount}
            />
          </div>
        </div>
        <div className='grid w-full justify-items-end'>
          <label
            htmlFor='email'
            className={`${
              props.errors.includes('baseUri') ? 'text-errorDefault' : 'text-accent7'
            } block text-sm`}>
            {props.errors.includes('baseUri') ? <p>invalid input for base uri</p> : <p>base uri</p>}
          </label>
          <div className='w-5/6 mt-1'>
            <input
              type='text'
              name='baseUri'
              id='baseUri'
              className={`${
                props.errors.includes('baseUri') ? 'border-errorDefault' : 'border-accent6'
              } block w-full shadow-sm text-accent7 bg-background sm:text-sm`}
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
              <label
                htmlFor='width'
                className={`${
                  props.errors.includes('width') ? 'text-errorDefault' : 'text-accent7'
                } block text-sm`}>
                {props.errors.includes('width') ? (
                  <p>invalid input for width</p>
                ) : (
                  <p>width (px)</p>
                )}
              </label>
              <div className='mt-1'>
                <input
                  type='text'
                  name='width'
                  id='width'
                  className={`${
                    props.errors.includes('width') ? 'border-errorDefault' : 'border-accent6'
                  } block w-full shadow-sm text-accent7 bg-background sm:text-sm`}
                  placeholder='512'
                  onChange={(e) => props.setWidth(e.target.value)}
                  value={props.width}
                />
              </div>
            </div>
            <div className='w-2/3 justify-self-end'>
              <label
                htmlFor='height'
                className={`${
                  props.errors.includes('height') ? 'text-errorDefault' : 'text-accent7'
                } block text-sm`}>
                {props.errors.includes('height') ? (
                  <p>invalid input for height</p>
                ) : (
                  <p>height (px)</p>
                )}
              </label>
              <div className='mt-1'>
                <input
                  type='text'
                  name='height'
                  id='height'
                  className={`${
                    props.errors.includes('height') ? 'border-errorDefault' : 'border-accent6'
                  } block w-full shadow-sm text-accent7 bg-background sm:text-sm`}
                  placeholder='512'
                  onChange={(e) => props.setHeight(e.target.value)}
                  value={props.height}
                />
              </div>
            </div>
          </div>
        </div>
        <div className='py-5'>
          <div className='grid w-full justify-items-end'>
            <label
              htmlFor='dnaTorrance'
              className={`${
                props.errors.includes('dnaTorrance') ? 'text-errorDefault' : 'text-accent7'
              } block text-sm`}>
              {props.errors.includes('dnaTorrance') ? (
                <p>invalid input for dna torrance</p>
              ) : (
                <p>dna torrance</p>
              )}
            </label>
            <div className='w-5/6 mt-1'>
              <input
                type='email'
                name='email'
                id='email'
                className={`${
                  props.errors.includes('dnaTorrance') ? 'border-errorDefault' : 'border-accent6'
                } block w-full shadow-sm text-accent7 bg-background sm:text-sm`}
                placeholder='10000'
                onChange={(e) => props.setDnaTorrance(e.target.value)}
                value={props.dnaTorrance}
              />
            </div>
          </div>
          <div className='pt-10 pb-5 grid grid-cols-[max-content_max-content] justify-end'>
            {isConfigSaved ? (
              <span className='text-successDefault grid items-center pr-4'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth={2}>
                  <path strokeLinecap='round' strokeLinejoin='round' d='M5 13l4 4L19 7' />
                </svg>
              </span>
            ) : null}
            <button
              onClick={updateConfig}
              className='w-max py-2.5 font-medium px-4 bg-accent7 hover:bg-accent5 text-sm text-background'>
              save
            </button>
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
