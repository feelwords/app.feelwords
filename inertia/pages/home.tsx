import { Head } from '@inertiajs/react'
import { Header } from '~/components/commons/header'
import { InferPageProps } from '@adonisjs/inertia/types'
import HomeController from '#controllers/home_controller'

export default function Home({
  fullName,
  user_profile_picture_url,
  user_id,
  categories,
}: InferPageProps<HomeController, 'show'>) {
  return (
    <>
      <Head title="Accueil" />
      <main className={'text-white'}>
        <Header
          user_id={user_id}
          fullName={fullName}
          user_profile_picture_url={user_profile_picture_url}
          categories={categories}
        />
      </main>
    </>
  )
}
