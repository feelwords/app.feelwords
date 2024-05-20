import { HttpContext } from '@adonisjs/core/http'

export default class RegistersController {
  async show({ inertia }: HttpContext) {
    return inertia.render('register')
  }
}
