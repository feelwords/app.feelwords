import { StoryCard } from '~/components/story/story_card'
import { DrawerDialog } from '~/components/story/drawer_dialog'
import { InferPageProps } from '@adonisjs/inertia/types'
import IndexStoryController from '../../../app/features/story/controllers/index_story_controller'
import Story from '#models/story'

export function ListStory({ stories }: InferPageProps<IndexStoryController, 'index'>) {
  return (
    <>
      <div className={'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 '}>
        {stories?.map((story) => (
          <DrawerDialog
            key={story.id}
            story={story as Story}
            trigger={<StoryCard story={story as Story} />}
          />
        ))}
      </div>
    </>
  )
}
