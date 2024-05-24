import { HttpContext } from '@adonisjs/core/http'
import Chapter from '#models/chapter'
import ChapterService from '../services/chapter_service.js'
import { inject } from '@adonisjs/core'

@inject()
export default class DeleteChapterController {
  constructor(protected chapterService: ChapterService) {}

  async handleAction({ request, response }: HttpContext) {
    const chapterId = request.param('chapterId')

    const chapter = await Chapter.query().where('id', chapterId).firstOrFail()

    const story = await chapter.related('story').query().firstOrFail()

    await chapter.delete()

    await this.chapterService.reorderChapters(story.id)

    return response.status(200).json({ message: 'Chapter deleted' })
  }
}
