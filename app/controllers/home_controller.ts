import { HttpContext } from '@adonisjs/core/http'

export default class HomeController {
  async show({ inertia, auth }: HttpContext) {
    // Get current user (used to get profile picture and access to profile)
    const currentUser = auth.getUserOrFail()

    // get categories
    // get books

    return inertia.render('home', {
      user_profile_picture_url: currentUser.profile_picture,
      fullName: currentUser.fullName,
      user_id: currentUser.id,
    })
  }
}
