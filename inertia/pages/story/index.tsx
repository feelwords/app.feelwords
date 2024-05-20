import { Head } from '@inertiajs/react'
import { Header } from '~/components/commons/header'

export default function IndexStory() {
  return (
    <>
      <Head title="Vos histoires" />
      <main className={'text-white'}>
        <Header />
      </main>
    </>
  )
}
