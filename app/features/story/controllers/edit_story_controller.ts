import { HttpContext } from '@adonisjs/core/http'
import FileUploadService from '#services/file_upload_service'
import { inject } from '@adonisjs/core'
import StoryService from '../services/story_service.js'
import { editStoryValidator } from '../validator/edit_story.js'

@inject()
export default class EditStoryController {
  constructor(
    protected fileUploadService: FileUploadService,
    protected storyService: StoryService
  ) {}

  async handleAction({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(editStoryValidator)
      const cover = request.file('cover')

      if (cover) {
        await this.fileUploadService.moveFile(cover)
      }

      const story = await this.storyService.updateStory({ ...payload, cover })

      await this.storyService.handleCategoryAssociation(payload, story)

      return response.status(201).json(story)
    } catch (error) {
      console.error(error) // Basic error logging
      return response.status(500).json({ message: error })
    }
  }
}
