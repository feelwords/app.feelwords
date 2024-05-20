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

const RegistersController = () => import('#controllers/register_controller')

const LoginController = () => import('#controllers/login_controller')

const HomeController = () => import('#controllers/home_controller')

router.get('/login', [LoginController, 'show']).as('login')
router.get('/register', [RegistersController, 'show']).as('register')

router
  .group(() => {
    router.get('/', [HomeController, 'show']).as('home')
  })
  .use(middleware.auth())
