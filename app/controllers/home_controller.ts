import { HttpContext } from '@adonisjs/core/http'

export default class HomeController {
  async show({ inertia }: HttpContext) {
    // todo : show books

    return inertia.render('home', {})
  }
}
