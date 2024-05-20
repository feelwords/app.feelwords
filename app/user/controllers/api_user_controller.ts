import { HttpContext } from '@adonisjs/core/http'

export default class ApiUserController {
  async me({ auth, response }: HttpContext) {
    return response.status(200).json(auth.getUserOrFail())
  }
}
