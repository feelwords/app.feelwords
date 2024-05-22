import { StoryCard } from '~/components/story/story_card'
import { DrawerDialog } from '~/components/story/drawer_dialog'

export function ListStory({ stories }: { stories: any[] }) {
  return (
    <>
      <div className={'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 '}>
        {stories?.map((story) => (
          <DrawerDialog key={story.id} story={story} trigger={<StoryCard story={story} />} />
        ))}
      </div>
    </>
  )
}
