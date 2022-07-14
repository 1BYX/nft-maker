/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from 'react'
import { Transition } from '@headlessui/react'
import { CheckCircleIcon, ExclamationIcon } from '@heroicons/react/outline'
import { XIcon } from '@heroicons/react/solid'

interface IErrorNotification {
  show: boolean
  closeShow: () => void
}

const ErrorNotification: React.FC<IErrorNotification> = ({ show, closeShow }) => {
  return (
    <>
      {/* Global notification live region, render this permanently at the end of the document */}
      <div
        aria-live='assertive'
        className='fixed inset-0 z-50 flex items-end px-4 py-6 pointer-events-none sm:p-4 sm:items-start'>
        <div className='grid items-center w-full h-full space-y-4 sm:items-end justify-items-end'>
          {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
          <Transition
            show={show}
            as={Fragment}
            enter='transform ease-out duration-300 transition'
            enterFrom='translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2'
            enterTo='translate-y-0 opacity-100 sm:translate-x-0'
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'>
            <div className='w-full max-w-sm mb-12 overflow-hidden border rounded-lg shadow-lg pointer-events-auto bg-background border-errorDefault ring-1 ring-black ring-opacity-5'>
              <div className='p-4'>
                <div className='flex items-start'>
                  <div className='flex-shrink-0'>
                    <ExclamationIcon className='w-6 h-6 text-errorDefault' aria-hidden='true' />
                  </div>
                  <div className='ml-3 w-0 flex-1 pt-0.5'>
                    <p className='text-sm font-bold text-accent7'>error while saving layer</p>
                    <p className='mt-1 text-sm text-accent7'>
                      you must provide at least one element
                    </p>
                  </div>
                  <div className='flex flex-shrink-0 ml-4'>
                    <button
                      type='button'
                      className='inline-flex rounded-md bg-background text-accent7 hover:text-accent6'
                      onClick={closeShow}>
                      <span className='sr-only'>Close</span>
                      <XIcon className='w-5 h-5' aria-hidden='true' />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  )
}

export default ErrorNotification
