/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useCallback, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { FingerPrintIcon, XIcon } from '@heroicons/react/outline'
import _logger from 'next-auth/utils/logger'
import { IinitializeLayerData, IinitialLayer, IlayerData } from '../../interfaces/Ilayers'
import { useDropzone } from 'react-dropzone'
import { TrueLiteral } from 'typescript'
import ErrorNotification from '../commons/errorNotification'
import FormatErrorNotification from '../commons/formatErrorNotification'

interface IAddLayerSlideover {
  slideoverOpen: {
    isOpen: boolean
    initialData: string
  }
  toggleSlideover: (state: boolean) => void
  updateLayerData: (_newLayerData: IlayerData) => void
}

const AddLayerSlideover: React.FC<IAddLayerSlideover> = ({
  slideoverOpen,
  toggleSlideover,
  updateLayerData,
}) => {
  const [layerName, setLayerName] = useState('')
  const [layerNameError, setLayerNameError] = useState(false)

  const [tempLayerAttributes, setTempLayerAttributes] = useState<
    Array<{
      layer: string
      name: string
      image: string
    }>
  >([])

  const [showNotification, setShowNotification] = useState(false)
  const [showFormatErrorNotification, setShowFormatErrorNotification] = useState(false)

  const closeShow = () => {
    setShowNotification(false)
  }

  useEffect(() => {
    setLayerName(slideoverOpen.initialData)
  }, [slideoverOpen.initialData])

  const [files, setFiles] = useState<any>(null)

  const nuller = (e: any) => {
    e.target.value = null
  }

  const onDrop = (acceptedFiles: Array<any>) => {
    setTempLayerAttributes([])
    setShowNotification(false)
    let localLayerAttributes: Array<any> = []

    for (let i = 0; i < acceptedFiles.length; i++) {
      const reader = new FileReader()

      reader.addEventListener('load', () => {
        if (reader.result && typeof reader.result === 'string') {
          const formatArray = acceptedFiles[i].name.split('.')
          const format = formatArray[formatArray.length - 1]
          if (format !== 'png' && format !== 'jpeg' && format !== 'jpg') {
            setShowFormatErrorNotification(true)
            setTimeout(() => {
              setShowFormatErrorNotification(false)
            }, 6000)
            return
          }
          setTempLayerAttributes((prevArray) => [
            ...prevArray,
            {
              layer: layerName,
              name: acceptedFiles[i].name,
              image: reader.result as string,
            },
          ])
        } else {
        }
      })

      reader.readAsDataURL(acceptedFiles[i])
      setTempLayerAttributes(localLayerAttributes)

      reader.removeEventListener('load', () => {
        if (reader.result && typeof reader.result === 'string') {
          setTempLayerAttributes((prevArray) => [
            ...prevArray,
            {
              layer: layerName,
              name: acceptedFiles[i].name,
              image: reader.result as string,
            },
          ])
        } else {
        }
      })
    }
  }

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  const cancelSubmission = () => {
    setShowNotification(false)
    setLayerNameError(false)
    toggleSlideover(false)
    setTempLayerAttributes([])
  }

  const saveSubmission = () => {
    let exists = false
    if ((!layerName || layerName === '') && tempLayerAttributes.length < 1) {
      setLayerNameError(true)
      setShowNotification(true)
      return
    }
    if (!layerName || layerName === '') {
      setLayerNameError(true)
      return
    }
    if (tempLayerAttributes.length < 1) {
      setShowNotification(true)
      return
    }
    setLayerNameError(false)
    let localAttributes = tempLayerAttributes
    localAttributes.forEach((la) => {
      la.layer = layerName
    })
    setTempLayerAttributes(localAttributes)

    const unformattedLayers = localStorage.getItem('layers')

    if (unformattedLayers) {
      let layers = JSON.parse(unformattedLayers)

      layers.forEach((l: any) => {
        if (l.layerName === layerName) {
          exists = true
          return
        }
      })
      if (!exists) {
        layers = [
          ...layers,
          {
            layerName: layerName,
            attributes: [],
          },
        ]

        tempLayerAttributes.forEach((tl) => {
          layers[layers.length - 1].attributes = [
            ...layers[layers.length - 1].attributes,
            {
              layer: layerName,
              name: tl.name,
              image: tl.image,
            },
          ]
        })

        const stringifiedLayers = JSON.stringify(layers)
        localStorage.setItem('layers', stringifiedLayers)
      } else {
        const unformattedLayers = localStorage.getItem('layers')
        if (unformattedLayers) {
          let layers = JSON.parse(unformattedLayers)
          let targetLayerArr = layers.filter((l: any) => {
            return l.layerName === layerName
          })
          let targetLayer = targetLayerArr[0]
          for (let i = 0; i < tempLayerAttributes.length; i++) {
            targetLayer.attributes.push({
              layer: layerName,
              name: tempLayerAttributes[i]?.name,
              image: tempLayerAttributes[i]?.image,
            })
          }
          layers.forEach((l: any) => {
            if (l.layerName === layerName) {
              l = targetLayer
            }
          })
          localStorage.setItem('layers', JSON.stringify(layers))
        }
      }
    } else {
      let newLayers = [
        {
          layerName: layerName,
          attributes: tempLayerAttributes.map((tl) => ({
            layer: tl.layer,
            name: tl.name,
            image: tl.image,
          })),
        },
      ]
      const stringifiedNewLayers = JSON.stringify(newLayers)
      localStorage.setItem('layers', stringifiedNewLayers)
    }
    const unformattedNewLayerData = localStorage.getItem('layers')
    if (unformattedNewLayerData) {
      const newLayerData = JSON.parse(unformattedNewLayerData)
      if (newLayerData) {
        updateLayerData(newLayerData)
      }
    }

    setTempLayerAttributes([])
    setLayerName('')
    toggleSlideover(false)
  }

  return (
    <Transition.Root show={slideoverOpen.isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={() => toggleSlideover(false)}>
        <div className='fixed inset-0' />
        <div className='fixed inset-0 overflow-hidden'>
          <div className='absolute inset-0 overflow-hidden'>
            <div className='fixed inset-y-0 right-0 flex max-w-full pointer-events-none'>
              <Transition.Child
                as={Fragment}
                enter='transform transition ease-in-out duration-500 sm:duration-700'
                enterFrom='translate-x-full'
                enterTo='translate-x-0'
                leave='transform transition ease-in-out duration-500 sm:duration-700'
                leaveFrom='translate-x-0'
                leaveTo='translate-x-full'>
                <Dialog.Panel className='w-screen max-w-md pointer-events-auto'>
                  <div className='flex flex-col h-full border-l divide-y shadow-xl divide-accent2 border-l-accent2 bg-background'>
                    <div className='flex flex-col flex-1 min-h-0 py-6'>
                      <div className='px-4 sm:px-6'>
                        <div className='flex items-start justify-between'>
                          <Dialog.Title className='text-lg font-medium text-accent7'>
                            {' '}
                            add layer
                          </Dialog.Title>
                          <div className='flex items-center ml-3 h-7'>
                            <button
                              type='button'
                              className='text-accent7 bg-background hover:text-accent6'
                              onClick={() => toggleSlideover(false)}>
                              <span className='sr-only'>Close panel</span>
                              <XIcon className='w-6 h-6' aria-hidden='true' />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className='relative flex-1 px-4 mt-6 overflow-scroll sm:px-6'>
                        {/* Replace with your content */}
                        <div className='grid w-full mb-8 justify-items-end'>
                          <label
                            htmlFor='email'
                            className={`${
                              layerNameError ? 'text-errorDefault' : 'text-accent7'
                            } block text-sm font-medium`}>
                            {layerNameError ? (
                              <p>you must provide a layer name</p>
                            ) : (
                              <p>layer name</p>
                            )}
                          </label>
                          <div className='w-2/3 mt-1'>
                            <input
                              type='text'
                              name='layerName'
                              id='layerName'
                              className={`${
                                layerNameError ? 'border-errorDefault' : 'border-accent6'
                              } block w-full shadow-sm text-accent7 bg-background sm:text-sm`}
                              placeholder='hats'
                              value={layerName}
                              onChange={(e) => {
                                setLayerNameError(false)
                                setLayerName(e.target.value)
                              }}
                            />
                          </div>
                        </div>
                        <div
                          {...getRootProps()}
                          className='grid grid-rows-[max-content_max-content] content-center items-center border-2 border-dashed cursor-pointer hover:bg-accent1 justify-items-center h-1/3 border-accent2 text-accent2'
                          aria-hidden='true'>
                          <p className='mb-8'>drag & drop here</p>
                          <p>or click to upload</p>
                          <input {...getInputProps()} onClick={(e) => nuller(e)} />
                        </div>
                        <div className='grid w-full gap-2 py-6 justify-items-end text-accent7'>
                          {tempLayerAttributes.map((a) => (
                            <div
                              key={a.name}
                              className='w-max grid grid-cols-[max-content_max-content] items-end gap-4'>
                              <u>{a.name}</u>
                              <img src={a.image} className='w-12' alt='preview' />
                            </div>
                          ))}
                        </div>
                        <ul className='w-full mt-8 text-accent6'>
                          <li>- upload multiple files</li>
                          <br></br>
                          <li>
                            - the layers order will determine the image stacking order (the top
                            layer will be in the very back of a generated image, so it{"'"}s
                            reocommended to use it as a background), you can rearrange them by
                            dragging
                          </li>
                          <br></br>
                          <li>
                            - if you want to add rarity to your attributes, do so via <br></br> #
                            {'<occurence percentage>'} after the name of the attribute, followed by
                            .png or .jpeg
                          </li>
                          <br></br>
                          <li className='ml-8'>
                            <span>example {'->'}</span>
                            <span className='ml-4'> tophat#15.png</span>
                          </li>
                          <br></br>
                          <li>
                            - note that percents don{"'"}t have to add up to 100, there{"'"}s no
                            maximum
                          </li>
                          <br></br>
                          <li>
                            - if you want to delete or add images to layers later, you can do so by
                            navigating to that layer on the left
                          </li>
                          <br></br>
                          <li>- only images of .png or .jpeg format are supported</li>
                        </ul>
                        {/* /End replace */}
                      </div>
                    </div>
                    <div className='flex justify-end flex-shrink-0 px-4 py-4'>
                      <button
                        type='button'
                        className='px-4 py-2 text-sm font-medium border shadow-sm text-accent7 border-accent7 bg-background hover:bg-accent1'
                        onClick={cancelSubmission}>
                        cancel
                      </button>
                      <button
                        type='submit'
                        onClick={saveSubmission}
                        className='inline-flex justify-center px-4 py-2 ml-4 text-sm font-medium text-black border border-transparent shadow-sm bg-accent7 hover:bg-accent6'>
                        save
                      </button>
                      <ErrorNotification show={showNotification} closeShow={closeShow} />
                      <FormatErrorNotification
                        show={showFormatErrorNotification}
                        closeShow={() => {
                          setShowFormatErrorNotification(false)
                        }}
                      />
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default AddLayerSlideover
