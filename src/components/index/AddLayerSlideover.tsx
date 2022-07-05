/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'

interface IAddLayerSlideover {
  slideoverOpen: boolean
  toggleSlideover: (state: boolean) => void
}

const AddLayerSlideover: React.FC<IAddLayerSlideover> = ({
  slideoverOpen,
  toggleSlideover,
}) => {
  return (
    <Transition.Root show={slideoverOpen} as={Fragment}>
      <Dialog
        as='div'
        className='relative z-10'
        onClose={() => toggleSlideover(false)}>
        <div className='fixed inset-0' />

        <div className='fixed inset-0 overflow-hidden'>
          <div className='absolute inset-0 overflow-hidden'>
            <div className='fixed inset-y-0 right-0 flex max-w-full pl-10 pointer-events-none'>
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
                              className='rounded-md text-accent7 bg-background hover:text-accent6'
                              onClick={() => toggleSlideover(false)}>
                              <span className='sr-only'>Close panel</span>
                              <XIcon className='w-6 h-6' aria-hidden='true' />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className='relative flex-1 px-4 mt-6 sm:px-6'>
                        {/* Replace with your content */}
                        <div
                          className='h-full border-2 border-dashed border-accent2'
                          aria-hidden='true'
                        />
                        {/* /End replace */}
                      </div>
                    </div>
                    <div className='flex justify-end flex-shrink-0 px-4 py-4'>
                      <button
                        type='button'
                        className='px-4 py-2 text-sm font-medium border rounded-md shadow-sm text-accent7 border-accent7 bg-background hover:bg-accent1'
                        onClick={() => toggleSlideover(false)}>
                        cancel
                      </button>
                      <button
                        type='submit'
                        className='inline-flex justify-center px-4 py-2 ml-4 text-sm font-medium text-black border border-transparent rounded-md shadow-sm bg-accent7 hover:bg-accent6'>
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
