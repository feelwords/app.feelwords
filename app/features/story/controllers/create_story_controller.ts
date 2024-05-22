import { HttpContext } from '@adonisjs/core/http'
import { createStoryValidator } from '../validator/create_story.js'
import Story from '#models/story'
import app from '@adonisjs/core/services/app'
import { cuid } from '@adonisjs/core/helpers'

export default class CreateStoryController {
  async handleAction({ request, response, auth }: HttpContext) {
    const payload = await request.validateUsing(createStoryValidator)

    // todo: move files to persistant storage
    await payload.cover.move(app.makePath('uploads'), {
      name: `${cuid()}.${payload.cover.extname}`,
    })

    const story = await Story.create({
      ...payload,
      cover: payload.cover.filePath,
    })

    // Associate creator with the story created
    await story.related('user').associate(auth.getUserOrFail())

    return response.status(201).json(story)
  }
}
