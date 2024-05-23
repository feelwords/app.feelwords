import { HttpContext } from '@adonisjs/core/http'
import { createStoryValidator } from '../validator/create_story.js'
import FileUploadService from '../services/file_upload_service.js'
import { inject } from '@adonisjs/core'
import StoryService from '../services/story_service.js'

@inject()
export default class CreateStoryController {
  constructor(
    protected fileUploadService: FileUploadService,
    protected storyService: StoryService
  ) {}

  async handleAction({ request, response, auth }: HttpContext) {
    try {
      const payload = await request.validateUsing(createStoryValidator)

      await this.fileUploadService.moveFile(payload)

      const story = await this.storyService.updateOrCreateStory(payload)

      await this.storyService.handleCategoryAssociation(payload, story)

      await this.storyService.associateCreatorWithStory(story, auth)

      return response.status(201).json(story)
    } catch (error) {
      console.error(error) // Basic error logging
      return response.status(500).json({ message: error })
    }
  }
}
