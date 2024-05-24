import { Head } from '@inertiajs/react'
import { Toaster } from '~/components/ui/sonner'
import { Container } from '~/components/commons/container'
import Chapter from '#models/chapter'
import { InferPageProps } from '@adonisjs/inertia/types'
import IndexChapterController from '../../../app/features/chapter/controllers/index_chapter_controller'
import { StoryHeader } from '~/components/chapter/story_header'

export default function IndexChapter({
  chapter,
}: InferPageProps<IndexChapterController, 'handleAction'>) {
  return (
    <div>
      <Head title={chapter.title} />
      <Toaster />
      <main className={'text-white'}>
        <StoryHeader chapter={chapter as Chapter} />
        <Container>
          <div>hello</div>
        </Container>
      </main>
    </div>
  )
}
