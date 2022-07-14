/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationIcon } from '@heroicons/react/outline'

interface ILayerDeleteModal {
  deleteLayer: (layerName: string) => void
  layerName: string
}

const LayerDeleteModal: React.FC<ILayerDeleteModal> = ({ deleteLayer, layerName }) => {
  const [modalOpen, setModalOpen] = useState(true)

  const cancelButtonRef = useRef(null)

  return (
    <Transition.Root show={modalOpen} as={Fragment}>
      <Dialog as='div' className='relative z-30' onClose={setModalOpen}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'>
          <div className='fixed inset-0 transition-opacity bg-opacity-75 bg-background' />
        </Transition.Child>

        <div className='fixed inset-0 z-30 overflow-y-auto'>
          <div className='flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'>
              <Dialog.Panel className='relative px-4 pt-5 pb-4 overflow-hidden text-left transition-all transform border rounded-lg shadow-xl bg-background border-errorDefault sm:my-8 sm:max-w-lg sm:w-full sm:p-6'>
                <div className='sm:flex sm:items-start'>
                  <div className='flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-red-900 rounded-full sm:mx-0 sm:h-10 sm:w-10'>
                    <ExclamationIcon className='w-6 h-6 text-red-600' aria-hidden='true' />
                  </div>
                  <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                    <Dialog.Title as='h3' className='text-lg font-medium leading-6 text-accent7'>
                      delete layer
                    </Dialog.Title>
                    <div className='mt-2'>
                      <p className='text-sm text-accent6'>
                        are you sure you want to delete {layerName}?
                      </p>
                    </div>
                  </div>
                </div>
                <div className='mt-5 sm:mt-4 sm:flex sm:flex-row-reverse'>
                  <button
                    type='button'
                    className='inline-flex justify-center w-full px-4 py-2 text-base font-medium bg-red-600 border border-transparent rounded-md shadow-sm text-accent7 hover:bg-red-700 sm:ml-3 sm:w-auto sm:text-sm'
                    onClick={() => {
                      deleteLayer(layerName)
                      setModalOpen(false)
                    }}>
                    delete
                  </button>
                  <button
                    type='button'
                    className='inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium border rounded-md shadow-sm text-accent7 bg-background border-accent7 hover:bg-accent1 sm:mt-0 sm:w-auto sm:text-sm'
                    onClick={() => setModalOpen(false)}
                    ref={cancelButtonRef}>
                    cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default LayerDeleteModal
