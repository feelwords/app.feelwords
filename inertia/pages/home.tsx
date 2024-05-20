import { Head } from '@inertiajs/react'
import { MainLayout } from '~/layout/main_layout'

export default function Home() {
  return (
    <>
      <Head title="Accueil" />
      <MainLayout>
        <h1>hello world</h1>
      </MainLayout>
    </>
  )
}
