import Chapter from '#models/chapter'
import { SubmitHandler, useForm } from 'react-hook-form'
import axios from 'axios'
import { toast } from 'sonner'
import { ERROR_STYLE } from '~/lib/sonnar'
import { cn } from '~/lib/utils'
import { Label } from '~/components/ui/label'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'

type Inputs = {
  title: string
}

export function EditForm({ className, chapter }: { className?: string; chapter: Chapter }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    axios
      .put(`/story/${chapter.storyId}/chapter/${chapter.id}`, data)
      .then(() => {
        window.location.reload()
      })
      .catch((err) => {
        console.log(err)
        toast('Une erreur est survenue lors de la modification du chapitre', {
          className: ERROR_STYLE,
          description: err.response.data.message || 'Une erreur est survenue',
        })
      })
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn('grid items-start gap-4 mx-4', className)}
    >
      <div className="grid gap-2">
        <Label htmlFor="title">Titre*</Label>
        <Input
          {...register('title', { required: true })}
          required
          type="title"
          id="title"
          defaultValue={chapter.title}
        />
        {errors.title && <span className={'text-red-500'}>Ce champs est obligatoire</span>}
      </div>
      <Button type="submit">Modifier</Button>
    </form>
  )
}
