import { HttpContext } from '@adonisjs/core/http'

export default class IndexChapterController {
  async handleAction({ inertia }: HttpContext) {
    // get chapter in query depend on the storyId
    return inertia.render('chapter/index', {})
  }
}
