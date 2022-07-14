/* eslint-disable @next/next/no-img-element */
/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
  MenuIcon,
  XIcon,
  ArchiveIcon,
  QuestionMarkCircleIcon,
  PlusIcon,
} from '@heroicons/react/outline'
import Link from 'next/link'
import NetworkDropdown from '../components/index/NetworkDropdown'
import AddLayerSlideover from '../components/index/AddLayerSlideover'
import ConfigurationBar from '../components/index/ConfigurationBar'
import DisplayDataBar from '../components/index/DisplayDataBar'
import { useEffect } from 'react'
import ErrorNotification from '../components/commons/errorNotification'

const user = {
  name: 'Emily Selman',
  email: 'emily.selman@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
  { name: 'create', href: '/', icon: PlusIcon },
  { name: 'my archive', href: '/', icon: ArchiveIcon },
  { name: 'help', href: '/', icon: QuestionMarkCircleIcon },
]

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const [showConfig, setShowConfig] = useState(false)

  const [network, setNetwork] = useState('eth')
  const [collectionName, setCollectionName] = useState('')
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState<string>('10')
  const [baseUri, setBaseUri] = useState('')
  const [width, setWidth] = useState('512')
  const [height, setHeight] = useState('512')
  const [dnaTorrance, setDnaTorrance] = useState('10000')

  const [errors, setErrors] = useState<Array<any>>([])

  const updateErrors = (_errors: Array<any>) => {
    setErrors(_errors)
  }

  const updateNetwork = (_network: string) => {
    const newErrors = errors.filter((e) => {
      return e !== 'network'
    })
    setErrors(newErrors)
    setNetwork(_network)
  }
  const updateCollectionName = (_collectionName: string) => {
    const newErrors = errors.filter((e) => {
      return e !== 'collectionName'
    })
    setErrors(newErrors)
    setCollectionName(_collectionName)
  }
  const updateDescription = (_description: string) => {
    const newErrors = errors.filter((e) => {
      return e !== 'description'
    })
    setErrors(newErrors)
    setDescription(_description)
  }
  const updateAmount = (_amount: string) => {
    const nums = /^[0-9]*\.?[0-9]*$/
    if (nums.test(_amount) || _amount === '') {
      const newErrors = errors.filter((e) => {
        return e !== 'amount'
      })
      setErrors(newErrors)
      setAmount(_amount)
    }
  }
  const updateBaseUri = (_baseUri: string) => {
    const newErrors = errors.filter((e) => {
      return e !== 'baseUri'
    })
    setErrors(newErrors)
    setBaseUri(_baseUri)
  }
  const updateWidth = (_width: string) => {
    const nums = /^[0-9]*\.?[0-9]*$/
    if (nums.test(_width) || _width === '') {
      const newErrors = errors.filter((e) => {
        return e !== 'width'
      })
      setErrors(newErrors)
      setWidth(_width)
    }
  }
  const updateHeight = (_height: string) => {
    const newErrors = errors.filter((e) => {
      return e !== 'height'
    })
    setErrors(newErrors)
    setHeight(_height)
  }
  const updateDnaTorrance = (_dnaTorrance: string) => {
    const newErrors = errors.filter((e) => {
      return e !== 'dnaTorrance'
    })
    setErrors(newErrors)
    setDnaTorrance(_dnaTorrance)
  }

  return (
    <>
      <div className='flex h-full'>
        <Transition.Root show={mobileMenuOpen} as={Fragment}>
          <Dialog as='div' className='relative z-40 lg:hidden' onClose={setMobileMenuOpen}>
            <Transition.Child
              as={Fragment}
              enter='transition-opacity ease-linear duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='transition-opacity ease-linear duration-300'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'>
              <div className='fixed inset-0 bg-opacity-50 bg-background' />
            </Transition.Child>

            <div className='fixed inset-0 z-40 flex'>
              <Transition.Child
                as={Fragment}
                enter='transition ease-in-out duration-300 transform'
                enterFrom='-translate-x-full'
                enterTo='translate-x-0'
                leave='transition ease-in-out duration-300 transform'
                leaveFrom='translate-x-0'
                leaveTo='-translate-x-full'>
                <Dialog.Panel className='relative flex flex-col flex-1 w-full max-w-xs border-r bg-background border-accent2'>
                  <Transition.Child
                    as={Fragment}
                    enter='ease-in-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in-out duration-300'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'>
                    <div className='absolute top-0 right-0 pt-4 -mr-12'>
                      <button
                        type='button'
                        className='flex items-center justify-center w-10 h-10 ml-1'
                        onClick={() => setMobileMenuOpen(false)}>
                        <span className='sr-only'>Close sidebar</span>
                        <XIcon className='w-6 h-6 text-white' aria-hidden='true' />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className='pt-5 pb-4'>
                    <Link href='/'>
                      <div className='flex items-center flex-shrink-0 px-4 cursor-pointer'>
                        <img className='w-auto h-8' src='../../ape.png' alt='Workflow' />
                      </div>
                    </Link>
                    <nav aria-label='Sidebar' className='mt-5'>
                      <div className='px-2 space-y-1'>
                        {navigation.map((item) => (
                          <Link href={item.href} key={item.name}>
                            <p className='flex items-center p-2 text-base text-gray-300 rounded-md cursor-pointer group hover:bg-accent2'>
                              <item.icon
                                className='w-6 h-6 mr-4 text-gray-400 group-hover:text-gray-400'
                                aria-hidden='true'
                              />
                              {item.name}
                            </p>
                          </Link>
                        ))}
                      </div>
                    </nav>
                  </div>
                  <div className='flex flex-shrink-0 p-4 border-t border-accent2'>
                    <Link className='flex-shrink-0 block group' href='/'>
                      <div className='flex items-center'>
                        <div>
                          <img
                            className='inline-block w-10 h-10 rounded-full'
                            src={user.imageUrl}
                            alt=''
                          />
                        </div>
                        <div className='ml-3'>
                          <p className='text-base text-gray-700 group-hover:text-gray-900'>
                            {user.name}
                          </p>
                          <p className='text-sm text-gray-500 group-hover:text-gray-700'>
                            Account Settings
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className='flex-shrink-0 w-14' aria-hidden='true'>
                {/* Force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className='hidden lg:flex lg:flex-shrink-0'>
          <div className='flex flex-col w-20'>
            <div className='flex flex-col flex-1 overflow-y-scroll border-r bg-background border-accent2'>
              <div className='flex-1'>
                <Link href='/'>
                  <div className='flex items-center justify-center py-4 cursor-pointer bg-accent1'>
                    <img className='w-auto h-8' src='../../ape.png' alt='Workflow' />
                  </div>
                </Link>
                <nav aria-label='Sidebar' className='flex flex-col items-center py-6 space-y-3'>
                  {navigation.map((item) => (
                    <Link href={item.href} key={item.name}>
                      <div className='flex items-center p-4 text-gray-300 rounded-lg cursor-pointer hover:bg-accent2'>
                        <item.icon className='w-6 h-6' aria-hidden='true' />
                        <span className='sr-only'>{item.name}</span>
                      </div>
                    </Link>
                  ))}
                </nav>
              </div>
              <div className='flex flex-shrink-0 pb-5'>
                <Link href='#'>
                  <div className='flex-shrink-0 w-full cursor-pointer'>
                    <img
                      className='block w-10 h-10 mx-auto rounded-full'
                      src={user.imageUrl}
                      alt=''
                    />
                    <div className='sr-only'>
                      <p>{user.name}</p>
                      <p>Account settings</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className='flex flex-col flex-1 h-full min-w-0 overflow-scroll lg:overflow-hidden'>
          {/* Mobile top navigation */}
          <div className='lg:hidden'>
            <div className='flex items-center justify-between px-4 py-2 bg-background sm:px-6 lg:px-8'>
              <Link href='/'>
                <div className='cursor-pointer'>
                  <img className='w-auto h-8' src='../../ape.png' alt='Workflow' />
                </div>
              </Link>
              <div>
                <button
                  type='button'
                  className='inline-flex items-center justify-center w-12 h-12 -mr-3 text-white rounded-md bg-background hover:bg-accent1'
                  onClick={() => setMobileMenuOpen(true)}>
                  <span className='sr-only'>Open sidebar</span>
                  <MenuIcon className='w-6 h-6' aria-hidden='true' />
                </button>
              </div>
            </div>
          </div>

          <main
            className={`grid ${
              showConfig ? 'grid-rows-[max-content_auto_auto]' : 'grid-rows-[max-content_auto]'
            } h-full lg:grid-cols-[max-content_auto] lg:grid-rows-1 overlow-scroll lg:overflow-hidden`}>
            {/* Primary column */}
            <div className='grid w-full lg:hidden grid-cols-[max-content_max-content] gap-4 justify-end p-8 text-2xl border-y border-accent2 bg-accent1 text-accent7 justify-items-end'>
              <div
                className='grid items-center justify-self-start text-accent7 w-max'
                onClick={() => setShowConfig((prevShow) => !prevShow)}>
                {showConfig ? (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='w-6 h-6'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth={2}>
                    <path strokeLinecap='round' strokeLinejoin='round' d='M19 9l-7 7-7-7' />
                  </svg>
                ) : (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='w-6 h-6'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth={2}>
                    <path strokeLinecap='round' strokeLinejoin='round' d='M9 5l7 7-7 7' />
                  </svg>
                )}
              </div>
              <p>configuration</p>
            </div>
            <aside
              className={`${
                showConfig ? 'block' : 'hidden'
              } lg:block lg:flex-shrink-0 lg:order-first`}>
              <div className='relative flex flex-col w-full h-full overflow-y-auto border-b lg:border-r lg:border-b-0 lg:w-96 bg-accent1 border-accent2'>
                <ConfigurationBar
                  errors={errors}
                  updateErrors={updateErrors}
                  setNetwork={updateNetwork}
                  setCollectionName={updateCollectionName}
                  setDescription={updateDescription}
                  setAmount={updateAmount}
                  setBaseUri={updateBaseUri}
                  setWidth={updateWidth}
                  setHeight={updateHeight}
                  setDnaTorrance={updateDnaTorrance}
                  network={network}
                  collectionName={collectionName}
                  description={description}
                  amount={amount}
                  baseUri={baseUri}
                  width={width}
                  height={height}
                  dnaTorrance={dnaTorrance}
                />
              </div>
            </aside>

            <section
              aria-labelledby='primary-heading'
              className='flex flex-col flex-1 h-full min-w-0 overflow-y-auto lg:order-last bg-accent1'>
              <DisplayDataBar
                updateErrors={updateErrors}
                network={network}
                collectionName={collectionName}
                description={description}
                amount={amount}
                baseUri={baseUri}
                width={width}
                height={height}
                dnaTorrance={dnaTorrance}
              />
              {/* Your content */}
            </section>

            {/* Secondary column (hidden on smaller screens) */}
          </main>
        </div>
      </div>
    </>
  )
}
