/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import _logger from 'next-auth/utils/logger'
import {
  IinitializeLayerData,
  IinitialLayer,
  IlayerData,
} from '../../interfaces/Ilayers'

interface IAddLayerSlideover {
  slideoverOpen: boolean
  toggleSlideover: (state: boolean) => void
  updateLayerData: (_newLayerData: IlayerData) => void
}

const AddLayerSlideover: React.FC<IAddLayerSlideover> = ({
  slideoverOpen,
  toggleSlideover,
  updateLayerData,
}) => {
  const [layerName, setLayerName] = useState('')

  const [tempLayerAttributes, setTempLayerAttributes] = useState<
    Array<{
      layer: string
      name: string
      image: string
    }>
  >([])

  const nuller = (e: any) => {
    e.target.value = null
  }

  const onFiles = (e: any) => {
    setTempLayerAttributes([])

    for (let i = 0; i < e.target.files.length; i++) {
      const reader = new FileReader()

      reader.addEventListener('load', () => {
        if (reader.result && typeof reader.result === 'string') {
          setTempLayerAttributes((prevArray) => [
            ...prevArray,
            {
              layer: layerName,
              name: e.target.files[i].name,
              image: reader.result as string,
            },
          ])
        } else {
        }
      })

      reader.readAsDataURL(e.target.files[i])

      reader.removeEventListener('load', () => {
        if (reader.result && typeof reader.result === 'string') {
          setTempLayerAttributes((prevArray) => [
            ...prevArray,
            {
              layer: layerName,
              name: e.target.files[i].name,
              image: reader.result as string,
            },
          ])
        } else {
        }
      })
    }
  }

  const cancelSubmission = () => {
    toggleSlideover(false)
  }

  const saveSubmission = () => {
    let exists = false
    if (!layerName || layerName === '') {
      console.log('no layer name')
      return
    }

    let localAttributes = tempLayerAttributes
    localAttributes.forEach((la) => {
      la.layer = layerName
    })
    setTempLayerAttributes(localAttributes)

    const unformattedLayers = localStorage.getItem('layers')

    if (unformattedLayers) {
      console.log('made it to if in saveSubmission function')
      let layers = JSON.parse(unformattedLayers)

      layers.forEach((l: any) => {
        if (l.layerName === layerName) {
          console.error('there already exists a layer with this name')
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
        return
      }
    } else {
      console.log('made it to else in saveSubmission function')
      let newLayers = [
        {
          layerName: layerName,
          attributes: tempLayerAttributes,
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
    <Transition.Root show={slideoverOpen} as={Fragment}>
      <Dialog
        as='div'
        className='relative z-10'
        onClose={() => toggleSlideover(false)}>
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
                      <div className='relative flex-1 px-4 mt-6 sm:px-6'>
                        {/* Replace with your content */}
                        <div className='grid w-full mb-8 justify-items-end'>
                          <label
                            htmlFor='email'
                            className='block text-sm font-medium text-accent7'>
                            layer name
                          </label>
                          <div className='w-2/3 mt-1'>
                            <input
                              type='email'
                              name='email'
                              id='email'
                              className='block w-full shadow-sm text-accent7 bg-background border-accent6 sm:text-sm'
                              placeholder='hats'
                              value={layerName}
                              onChange={(e) => setLayerName(e.target.value)}
                            />
                          </div>
                        </div>
                        <label
                          htmlFor='layer-dropzone'
                          className='grid grid-rows-[max-content_max-content] content-center items-center border-2 border-dashed cursor-pointer hover:bg-accent1 justify-items-center h-1/3 border-accent2 text-accent2'
                          aria-hidden='true'>
                          <p className='mb-8'>drag & drop here</p>
                          <p>or click to upload</p>
                          <input
                            id='layer-dropzone'
                            type='file'
                            multiple
                            className='hidden'
                            onChange={(e) => onFiles(e)}
                            onClick={(e) => nuller(e)}
                          />
                        </label>
                        <div className='grid w-full py-6 justify-items-end text-accent7'>
                          {tempLayerAttributes.map((a) => (
                            <div key={a.name} className='w-max'>
                              <u>{a.name}</u>
                            </div>
                          ))}
                        </div>
                        <ul className='w-full mt-8 text-accent6'>
                          <li>- upload multiple files</li>
                          <br></br>
                          <li>
                            - layer will have the name of the uploaded folder
                          </li>
                          <br></br>
                          <li>
                            - order of the layers will determine stacking order
                          </li>
                          <br></br>
                          <li>
                            - if you want to add rarity to your attributes, do
                            so via <br></br> #{'<occurence percentage>'} after
                            the name of the attribute, followed by .png
                          </li>
                          <br></br>
                          <li className='ml-8'>
                            <span>example {'->'}</span>
                            <span className='ml-4'> tophat#15.png</span>
                          </li>
                          <br></br>
                          <li>
                            - note that percents don{"'"}t have to add up to
                            100, there{"'"}s no maximum
                          </li>
                          <br></br>
                          <li>
                            - if you want to delete or add images to layers
                            later, you can do so by navigating to that layer on
                            the left
                          </li>
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
