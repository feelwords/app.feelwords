import { HttpContext } from '@adonisjs/core/http'
import Story from '#models/story'

export default class IndexStoryController {
  async index({ inertia, auth }: HttpContext) {
    const currentUser = auth.getUserOrFail()
    const stories = await Story.query()
      .where('user_id', currentUser.id)
      .preload('user')
      .preload('categories')
      .preload('chapters')

    return inertia.render('story/index', {
      stories,
    })
  }
}
