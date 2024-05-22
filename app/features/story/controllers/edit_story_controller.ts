import { HttpContext } from '@adonisjs/core/http'

export default class EditStoryController {
  async index({ inertia }: HttpContext) {
    return inertia.render('story/edit')
  }

  async handleAction({}: HttpContext) {
    // todo : Update the story
  }
}
