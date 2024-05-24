import { SubmitHandler, useForm } from 'react-hook-form'
import { useState } from 'react'
import { createStory, editStory } from '~/actions/story'
import { cn } from '~/lib/utils'
import { Label } from '~/components/ui/label'
import { Input } from '~/components/ui/input'
import { Textarea } from '~/components/ui/textarea'
import { Switch } from '~/components/ui/switch'
import { Button } from '~/components/ui/button'
import { MultiSelect } from '~/components/story/multi_select_categories'
import Chapter from '#models/chapter'
import { Eye, Heart, MessageSquareText, Plus } from 'lucide-react'
import axios from 'axios'
import { toast } from 'sonner'
import { ERROR_STYLE } from '~/lib/sonnar'

type Inputs = {
  title: string
  description: string
  cover: FileList
  ended: boolean
}

export function StoryForm({
  className,
  story,
  setOpen,
}: {
  className?: string
  story?: any
  setOpen: (value: boolean) => void
}) {
  const categories = story?.categories.map((category: any) => category?.label) || []
  const { register, handleSubmit, watch } = useForm<Inputs>()
  const [categoriesValue, setCategoriesValue] = useState<string[]>(categories)
  const [ended, setEnded] = useState<boolean>(story?.ended || false)

  console.log(story)

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    // case : edit and cover is not changed then we need to keep the current cover path
    if (story) {
      editStory(
        {
          data: {
            ...data,
            id: story.id,
            ended: ended,
            categoriesValue: categoriesValue,
          },
        },
        {
          setOpen,
        }
      )
    } else {
      createStory(
        {
          data: {
            ...data,
            ended: ended,
            categoriesValue: categoriesValue,
          },
        },
        {
          setOpen,
        }
      )
    }
  }

  const coverFile = watch('cover') // Pour prévisualiser l'image sélectionnée

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn('grid items-start gap-4 h-[450px] overflow-y-auto p-2', className)}
    >
      <div className="grid gap-2">
        <Label htmlFor="title">Titre*</Label>
        <Input
          {...register('title', { required: true })}
          type="text"
          id="title"
          required
          defaultValue={story?.title}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="description">Description*</Label>
        <Textarea
          {...register('description', { required: true })}
          id="description"
          required
          defaultValue={story?.description}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="cover">Page de couverture{!story ? '*' : ''}</Label>
        <Input {...register('cover', { required: !story })} id="cover" type="file" />
        {coverFile && coverFile.length > 0 && (
          <img
            src={URL.createObjectURL(coverFile[0])}
            alt="cover"
            className="w-32 h-32 rounded-xl object-cover"
          />
        )}
        {story?.cover && (
          <img src={story.cover} alt="cover" className="w-32 h-32 rounded-xl object-cover" />
        )}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="ended">Terminée</Label>
        <Switch
          {...register('ended')}
          id="ended"
          onCheckedChange={(e) => setEnded(e)}
          defaultChecked={story?.ended || false}
          defaultValue={story?.ended || false}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="categories">Catégories</Label>
        <MultiSelect categoriesValue={categoriesValue} setCategoriesValue={setCategoriesValue} />
      </div>
      {story && (
        <div className="grid gap-2">
          <Label htmlFor="chapters">Chapitres ({story.chapters.length})</Label>
          <ChapterList storyId={story.id} chapters={story.chapters} />
          <ChapterNew storyId={story.id} />
        </div>
      )}
      <Button type="submit">Enregistrer les modifications</Button>
    </form>
  )
}

function ChapterList({ chapters, storyId }: { chapters: Chapter[]; storyId: number }) {
  return (
    <div className="grid gap-2">
      {chapters
        .sort((a, b) => a.order - b.order)
        .map((chapter: Chapter) => (
          <a
            href={`/story/${storyId}/chapter/${chapter.id}`}
            key={chapter.id}
            className="flex gap-2 justify-between border p-4"
          >
            <span>{chapter.title}</span>
            <div className={'flex'}>
              <div className={'flex items-center mx-1'}>
                <Eye className={'mr-1 h-4 w-4'} />
                <span>{chapter.view}</span>
              </div>
              <div className={'flex items-center mx-1'}>
                <Heart className={'mr-1 h-4 w-4'} />
                <span>{chapter.like}</span>
              </div>
              <div className={'flex items-center mx-1'}>
                <MessageSquareText className={'mr-1 h-4 w-4'} />
                <span>todo</span>
              </div>
            </div>
          </a>
        ))}
    </div>
  )
}

function ChapterNew({ storyId }: { storyId: number }) {
  function handleClick() {
    axios
      .post(`/story/${storyId}/chapter`, {
        storyId,
      })
      .then((response) => {
        window.location.href = `/story/${storyId}/chapter/${response.data.defaultChapterId}`
      })
      .catch((error) =>
        toast('Une erreur est survenue lors de la création du chapitre', {
          description: error.response.data.message,
          className: ERROR_STYLE,
        })
      )
  }

  return (
    <button
      type={'button'}
      onClick={handleClick}
      className={'flex items-center justify-center border border-dashed p-4'}
    >
      <span className={'flex items-center'}>
        <Plus />
        Ajouter un chapitre
      </span>
    </button>
  )
}
