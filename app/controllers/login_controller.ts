import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class LoginController {
  async show({ inertia }: HttpContext) {
    return inertia.render('login')
  }

  async store({ request, response, auth }: HttpContext) {
    /**
     * Step 1: Get credentials from the request body
     */
    const { email, password } = request.only(['email', 'password'])

    /**
     * Step 2: Verify credentials
     */
    const user = await User.verifyCredentials(email, password)

    /**
     * Step 3: Login user
     */
    await auth.use('web').login(user)

    /**
     * Step 4: Send them to a protected route
     */
    response.redirect('/')
  }
}
