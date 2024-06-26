import axios from 'axios'
import { toast } from 'sonner'

interface StoryData {
  title: string
  description: string
  cover: FileList
  ended: boolean
  categoriesValue: string[]
  id?: number
}

function createFormData(data: StoryData) {
  const formData = new FormData()
  formData.append('title', data.title)
  formData.append('description', data.description)
  formData.append('cover', data.cover[0])
  formData.append('ended', data.ended.toString())
  formData.append('categories', data.categoriesValue.join(','))
  if (data.id) {
    formData.append('id', data.id.toString())
  }

  return formData
}

export const createStory = (
  {
    data,
  }: {
    data: StoryData
  },
  {
    setOpen,
  }: {
    setOpen: (value: boolean) => void
  }
) => {
  const formData = createFormData(data)
  axios
    .post(`/story`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(() => {
      toast('Histoire créée avec succès', {
        description: 'Veuillez rafraîchir la page pour voir les changements',
      })
      setOpen(false)
    })
    .catch((e) => {
      const errors = e.response.data.message.messages
      toast('Une erreur est survenue', {
        description: errors?.map((error: { message: string }) => error.message).join(', '),
      })
    })
}

export const editStory = (
  {
    data,
  }: {
    data: StoryData
  },
  {
    setOpen,
  }: {
    setOpen: (value: boolean) => void
  }
) => {
  const formData = createFormData(data)
  axios
    .put(`/story/${data.id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(() => {
      toast('Histoire modifiée avec succès', {
        description: 'Veuillez rafraîchir la page pour voir les changements',
      })
      setOpen(false)
    })
    .catch((e) => {
      const errors = e.response.data.message.messages
      toast('Une erreur est survenue', {
        description: errors?.map((error: { message: string }) => error.message).join(', '),
      })
    })
}
