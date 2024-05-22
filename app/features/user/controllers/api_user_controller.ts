import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class ApiUserController {
  async me({ auth, response }: HttpContext) {
    return response.status(200).json(this.toJson(auth.getUserOrFail() as User))
  }

  private toJson(user: User) {
    return {
      id: user.id,
      full_name: user.full_name,
      email: user.email,
      profile_picture: user.profile_picture,
    }
  }
}
