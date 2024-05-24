import { HttpContext } from '@adonisjs/core/http'
import ChapterService from '../services/chapter_service.js'
import { inject } from '@adonisjs/core'

@inject()
export default class EditChapterController {
  constructor(protected chapterService: ChapterService) {}

  async handleAction({ request, response }: HttpContext) {
    const chapterId = request.param('chapterId')
    const title = request.only(['title'])

    const payload = { title: title.title, id: chapterId }

    const chapter = await this.chapterService.updateChapter(payload)

    return response.status(200).json({ chapter })
  }
}
