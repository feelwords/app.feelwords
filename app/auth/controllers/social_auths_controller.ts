// import type { HttpContext } from '@adonisjs/core/http'

import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class SocialAuthsController {
  async redirect({ ally }: HttpContext) {
    return ally.use('google').redirect()
  }

  async callback({ ally, auth, response }: HttpContext) {
    const gg = ally.use('google')

    /**
     * User has denied access by canceling
     * the login flow
     */
    if (gg.accessDenied()) {
      return 'You have cancelled the login process'
    }

    /**
     * OAuth state verification failed. This happens when the
     * CSRF cookie gets expired.
     */
    if (gg.stateMisMatch()) {
      return 'We are unable to verify the request. Please try again'
    }

    /**
     * GitHub responded with some error
     */
    if (gg.hasError()) {
      return gg.getError()
    }

    /**
     * Access user info
     */
    const user = await gg.user()

    /**
     * Find user by email
     */
    const authUser = await User.findBy('email', user.email)

    /**
     * If user exists, then login
     */
    if (authUser) {
      await auth.use('web').login(authUser)
      return response.redirect().toRoute('home')
    }

    /**
     * Otherwise, create a new user
     */

    const newUser = new User()
    newUser.email = user.email
    newUser.full_name = user.name
    newUser.profile_picture = user.avatarUrl
    await newUser.save()

    await auth.use('web').login(newUser)

    return response.redirect().toRoute('home')
  }
}
