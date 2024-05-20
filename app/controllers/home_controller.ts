import { HttpContext } from '@adonisjs/core/http'
import Category from '#models/category'

export default class HomeController {
  async show({ inertia, auth }: HttpContext) {
    // Get current user (used to get profile picture and access to profile)
    const currentUser = auth.getUserOrFail()

    // Get categories for the command menu (desktop only)
    const categories = await Category.query().select('id', 'label')

    // todo : show books

    return inertia.render('home', {
      // users data
      user_profile_picture_url: currentUser.profile_picture,
      fullName: currentUser.fullName,
      user_id: currentUser.id,
      // categories data
      categories: categories,
    })
  }
}
