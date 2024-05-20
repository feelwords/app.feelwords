import { HttpContext } from '@adonisjs/core/http'

export default class CreateStoryController {
  async index({ inertia }: HttpContext) {
    return inertia.render('story/create')
  }

  async handleAction({}: HttpContext) {
    // todo : Create a new story
  }
}
