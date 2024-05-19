import { Head } from '@inertiajs/react'
import { Main_layout } from '~/layout/main_layout'

export default function Home() {
  return (
    <>
      <Head title="Accueil" />
      <Main_layout>
        <h1>hello world</h1>
      </Main_layout>
    </>
  )
}
