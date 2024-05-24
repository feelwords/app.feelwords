import Chapter from '#models/chapter'
import { ArrowLeft } from 'lucide-react'
import { DrawerDialogChapter } from '~/components/chapter/dialog_drawer_chapter'

export function StoryHeader({ chapter }: { chapter: Chapter }) {
  const goBack = () => {
    history.back()
  }

  return (
    <div className={'w-screen p-3 flex justify-between sticky border-b'}>
      <ArrowLeft onClick={goBack} />
      <h1>{chapter.title}</h1>
      <DrawerDialogChapter chapter={chapter} />
    </div>
  )
}
