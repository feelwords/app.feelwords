import Story from '#models/story'

interface StoryProps {
  story: Story
}

export function StoryCard({ story }: StoryProps) {
  return (
    <div className={'relative p-3 flex flex-col items-center'}>
      <img src={story.cover} className={'aspect-video rounded-3xl object-cover'} alt={'cover'} />
      <div
        className={
          'absolute flex items-center justify-around bottom-4 border border-muted-foreground/70 w-[80%] m-1 px-3 py-2 backdrop-blur rounded-2xl'
        }
      >
        <span className={'font-semibold text-sm'}>{story.title.slice(0, 20)}</span>
      </div>
    </div>
  )
}
