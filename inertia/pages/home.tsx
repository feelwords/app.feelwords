import { Head } from '@inertiajs/react'
import { Header } from '~/components/commons/header'

export default function Home() {
  return (
    <>
      <Head title="Accueil" />
      <main className={'text-white'}>
        <Header />
      </main>
    </>
  )
}
