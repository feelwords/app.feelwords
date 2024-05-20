/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const LoginController = () => import('#controllers/login_controller')

const HomeController = () => import('#controllers/home_controller')

router.get('/', [HomeController, 'show'])
router.get('/login', [LoginController, 'show'])
