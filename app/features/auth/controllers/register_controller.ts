import { HttpContext } from '@adonisjs/core/http'
import { createUserValidator } from '../validators/create_user.js'
import User from '#models/user'

export default class RegistersController {
  async show({ inertia }: HttpContext) {
    return inertia.render('register')
  }

  async store({ request, response, auth }: HttpContext) {
    // Validate the request
    const payload = await request.validateUsing(createUserValidator)

    // verify if the user already exists
    const userExists = await User.query().where('email', payload.email).first()
    if (userExists) {
      return response.status(400).json({ message: 'User already exists' })
    }

    // Create a new user
    const user = await User.create(payload)

    // Login the user
    await auth.use('web').login(user)

    // Redirect to the home page
    return response.status(201).json(user)
  }
}
