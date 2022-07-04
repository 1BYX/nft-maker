import type { NextPage } from 'next'
import Head from 'next/head'
import { trpc } from '../utils/trpc'
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'

const Home: NextPage = () => {
  const hello = trpc.useQuery(['example.hello', { text: 'from tRPC' }])

  const { data, status } = useSession()

  const collection = trpc.useQuery([
    'restricted.get-data-by-session-email',
    {
      email: data?.user?.email,
    },
  ])

  console.log(data, status)

  return (
    <div>
      {status === 'authenticated' ? (
        <Link href='/api/auth/signout'>
          <a>Sign Out</a>
        </Link>
      ) : (
        <Link href='/api/auth/signin'>
          <a>Sign In</a>
        </Link>
      )}
      <br></br>
      <div>{hello.isSuccess ? <div>{hello.data.greeting}</div> : null}</div>
      <br></br>
      <div>{collection.data?.collections[0]?.collectionName}</div>
      <div>{collection.data?.collections[0]?.name}</div>
    </div>
  )
}

export default Home
