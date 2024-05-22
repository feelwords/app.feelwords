import { Head } from '@inertiajs/react'
import { Container } from '~/components/commons/container'
import { H1 } from '~/components/commons/H1'
import { Header } from '~/components/commons/header'
import { Toaster } from '../../../src/components/ui/sonner'
import { AddStoryButton } from '~/components/story/add_story_button'
import { ListStory } from '~/components/story/list_story'
import { InferPageProps } from '@adonisjs/inertia/types'
import IndexStoryController from '../../../app/features/story/controllers/index_story_controller'

export default function IndexStory({ stories }: InferPageProps<IndexStoryController, 'index'>) {
  console.log(stories)

  return (
    <>
      <Head title="Vos histoires" />
      <Toaster />
      <main className={'text-white'}>
        <Header />
        <Container>
          <HeaderStory />
          <ListStory stories={stories} />
        </Container>
      </main>
    </>
  )
}

function HeaderStory() {
  return (
    <header className={'flex lg:justify-around items-center w-full'}>
      <H1>Vos histoires</H1>
      <AddStoryButton />
    </header>
  )
}
