import axios from 'axios'
import { toast } from 'sonner'
import { ERROR_STYLE } from '~/lib/sonnar'
import Chapter from '#models/chapter'

export async function deleteChapter({ chapter }: { chapter: Chapter }) {
  try {
    await axios.delete(`/story/${chapter.storyId}/chapter/${chapter.id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    window.location.href = '/stories'
  } catch (error) {
    toast('Une erreur est survenue lors de la suppression du chapitre', {
      className: ERROR_STYLE,
      description: error.response.data.message || 'Une erreur est survenue',
    })
  }
}
