import { HttpContext } from '@adonisjs/core/http'
import { createStoryValidator } from '../validator/create_story.js'
import FileUploadService from '../services/file_upload_service.js'
import { inject } from '@adonisjs/core'
import StoryService from '../services/story_service.js'
import ChapterService from '../../chapter/services/chapter_service.js'

@inject()
export default class CreateStoryController {
  constructor(
    protected fileUploadService: FileUploadService,
    protected storyService: StoryService,
    protected chapterService: ChapterService
  ) {}

  async handleAction({ request, response, auth }: HttpContext) {
    try {
      const payload = await request.validateUsing(createStoryValidator)

      await this.fileUploadService.moveFile(payload.cover)

      const story = await this.storyService.createStory(payload)

      await this.storyService.handleCategoryAssociation(payload, story)

      await this.storyService.associateCreatorWithStory(story, auth)

      const countChapter = await this.chapterService.countChapter(story.id)

      // Create a default chapter for the story
      await this.chapterService.createChapter({
        title: `Chapter ${countChapter[0].$extras.total + 1}`,
        storyId: story.id,
        order: 1,
        content: '',
      })

      return response.status(201).json(story)
    } catch (error) {
      console.error(error) // Basic error logging
      return response.status(500).json({ message: error })
    }
  }
}
