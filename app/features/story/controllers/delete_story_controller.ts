import { HttpContext } from '@adonisjs/core/http'

export default class DeleteStoryController {
  async index({ inertia }: HttpContext) {
    return inertia.render('story/create')
  }

  async handleAction({}: HttpContext) {
    // todo : delete a story
  }
}
