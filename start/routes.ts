/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const LogoutController = () => import('../app/auth/controllers/logout_controller.js')

const RegistersController = () => import('../app/auth/controllers/register_controller.js')

const LoginController = () => import('../app/auth/controllers/login_controller.js')

const HomeController = () => import('#controllers/home_controller')

// Login routes
router.group(() => {
  router.post('/login', [LoginController, 'store']).as('login.store')
  router.get('/login', [LoginController, 'show']).as('login.show')
})
// Logout route
router.get('/logout', [LogoutController, 'destroy']).as('login.destroy')

// Register routes
router.group(() => {
  router.post('/register', [RegistersController, 'store']).as('register.store')
  router.get('/register', [RegistersController, 'show']).as('register.show')
})

// Authenticated routes
router
  .group(() => {
    router.get('/', [HomeController, 'show']).as('home')
  })
  .use(middleware.auth())
