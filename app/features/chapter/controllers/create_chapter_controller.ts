import { HttpContext } from '@adonisjs/core/http'
import ChapterService from '../services/chapter_service.js'
import { inject } from '@adonisjs/core'

@inject()
export default class CreateChapterController {
  constructor(protected chapterService: ChapterService) {}

  async handleAction({ request, response }: HttpContext) {
    const storyId = request.input('storyId')
    const countChapter = await this.chapterService.countChapter(storyId)

    const numberOfChapter = Number.parseInt(countChapter[0].$extras.total) + 1

    // Create a default chapter for the story
    const defaultChapter = await this.chapterService.createChapter({
      title: `Chapter ${numberOfChapter}`,
      storyId: storyId,
      order: numberOfChapter,
      content: '',
    })

    return response.status(201).json({ defaultChapterId: defaultChapter.id })
  }
}
