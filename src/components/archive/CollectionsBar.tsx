import { PlusIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { useState } from 'react'

const ConfigurationBar = () => {
  const [network, setNetwork] = useState('eth')
  const [slideoverOpen, setSlideoverOpen] = useState(false)

  const toggleSlideover = (state: boolean) => {
    setSlideoverOpen(state)
  }

  const chooseNetwork = (_network: string) => {
    setNetwork(_network)
  }
  return (
    <div className='w-full h-full'>
      <h1 className='text-3xl text-white '>my collections</h1>
    </div>
  )
}

export default ConfigurationBar
