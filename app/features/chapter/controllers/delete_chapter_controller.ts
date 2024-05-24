import { HttpContext } from '@adonisjs/core/http'
import Chapter from '#models/chapter'

export default class DeleteChapterController {
  async handleAction({ request, response, auth }: HttpContext) {
    const chapterId = request.param('id')
    const user = auth.getUserOrFail()

    // todo : move this to a middleware and use it here -> edit -> index -> delete -> update
    // todo : refactor front to split files
    // todo : split call api in action folder
    // todo: edit form handler
    // todo : order chapter by order
    // Vérification de l'existence du chapitre
    const chapter = await Chapter.query().where('id', chapterId).firstOrFail()

    // Chargement de l'histoire associée au chapitre
    const story = await chapter.related('story').query().firstOrFail()

    // Chargement de l'utilisateur associé à l'histoire
    await story.load('user')

    // Vérification que l'utilisateur est bien le propriétaire de l'histoire
    if (story.user.id !== user.id) {
      console.log('Forbidden')
      return response.status(403).json({ message: 'Forbidden' })
    }

    // Suppression du chapitre
    await chapter.delete()

    return response.status(200).json({ message: 'Chapter deleted' })
  }
}
