import axios from 'axios'
import { API_URL } from '../../utils/axios'
import { toast } from 'sonner'

export const createStory = (
  {
    data,
  }: {
    data: {
      title: string
      description: string
      cover: FileList
      ended: boolean
      categoriesValue: string[]
    }
  },
  {
    setOpen,
  }: {
    setOpen: (value: boolean) => void
  }
) => {
  const formData = new FormData()
  formData.append('title', data.title)
  formData.append('description', data.description)
  formData.append('cover', data.cover[0])
  formData.append('ended', data.ended.toString())
  formData.append('categories', data.categoriesValue.join(','))

  axios
    .post(`${API_URL}/story`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      if (response.status !== 201) {
        toast('Une erreur est survenue', {
          description: response.data.message,
        })
        return
      }
      toast('Histoire créée avec succès')
      setOpen(false)
    })
}
