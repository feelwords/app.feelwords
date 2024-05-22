import { SubmitHandler, useForm } from 'react-hook-form'
import { useState } from 'react'
import { createStory } from '~/actions/story'
import { cn } from '~/lib/utils'
import { Label } from '~/components/ui/label'
import { Input } from '~/components/ui/input'
import { Textarea } from '~/components/ui/textarea'
import { Switch } from '~/components/ui/switch'
import { Button } from '~/components/ui/button'
import { MultiSelect } from '~/components/story/multi_select_categories'

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

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (story) {
      // Update story
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
          defaultChecked={false}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="categories">Catégories</Label>
        <MultiSelect categoriesValue={categoriesValue} setCategoriesValue={setCategoriesValue} />
      </div>
      {story && (
        <div className="grid gap-2">
          <Label htmlFor="chapters">Chapitres</Label>
          todo
        </div>
      )}
      <Button type="submit">Enregistrer les modifications</Button>
    </form>
  )
}
