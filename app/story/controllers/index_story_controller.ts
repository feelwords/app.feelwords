import { HttpContext } from '@adonisjs/core/http'

export default class IndexStoryController {
  async index({ inertia }: HttpContext) {
    // todo: Get all my stories

    return inertia.render('story/index')
  }

  async show({ inertia }: HttpContext) {
    // todo: Get a story by id
  }

  async destroy({ response }: HttpContext) {
    // todo : Delete a story
  }
}
