/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

interface INetworkDropdown {
  chooseNetwork: (network: string) => void
}

const NetworkDropdown: React.FC<INetworkDropdown> = ({ chooseNetwork }) => {
  return (
    <Menu as='div' className='relative inline-block w-32 text-left'>
      <div>
        <Menu.Button className='inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white border border-white rounded-md shadow-sm bg-background hover:bg-accent1'>
          network
          <ChevronDownIcon className='w-5 h-5 ml-2 -mr-1' aria-hidden='true' />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'>
        <Menu.Items className='absolute right-0 w-56 mt-2 origin-top-right bg-black border border-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
          <div className='py-1'>
            <Menu.Item>
              {({ active }) => (
                <a
                  href='#'
                  className={classNames(
                    active ? 'bg-accent1 text-white' : 'text-accent7',
                    'group flex items-center px-4 py-2 text-sm'
                  )}
                  onClick={() => chooseNetwork('eth')}>
                  <img src='../../ethereum.png' className='w-5 h-5 mr-3' />
                  eth
                </a>
              )}
            </Menu.Item>
          </div>
          <div className='py-1'>
            <Menu.Item>
              {({ active }) => (
                <a
                  href='#'
                  className={classNames(
                    active ? 'bg-accent1 text-white' : 'text-accent7',
                    'group flex items-center px-4 py-2 text-sm'
                  )}
                  onClick={() => chooseNetwork('sol')}>
                  <img src='../../sol.png' className='w-5 h-5 mr-3' />
                  sol
                </a>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default NetworkDropdown
