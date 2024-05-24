import { HttpContext } from '@adonisjs/core/http'
import Chapter from '#models/chapter'

export default class IndexChapterController {
  async handleAction({ inertia, request }: HttpContext) {
    const chapterId = request.param('chapterId')

    const currentChapter = await Chapter.query().where('id', chapterId).firstOrFail()

    return inertia.render('chapter/index', {
      chapter: currentChapter,
    })
  }
}
