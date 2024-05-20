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

const ApiCategoryController = () => import('../app/category/controllers/api_category_controller.js')

const ApiUserController = () => import('../app/user/controllers/api_user_controller.js')

const IndexStoryController = () => import('../app/story/controllers/index_story_controller.js')
const EditStoryController = () => import('../app/story/controllers/edit_story_controller.js')

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
    // Home route
    router.get('/', [HomeController, 'show']).as('home')

    // Story routes
    router.get('/stories', [IndexStoryController, 'index']).as('stories.index')
    router.get('/stories/:id', [IndexStoryController, 'show']).as('stories.show')
    router.delete('/stories/:id', [IndexStoryController, 'destroy']).as('stories.destroy')
    // Edit story routes
    router.get('/stories/:id/edit', [EditStoryController, 'index']).as('stories.edit')
    router.patch('/stories/:id', [EditStoryController, 'handleAction']).as('stories.update')
    // Create story routes
    router.get('/stories/create', [EditStoryController, 'index']).as('stories.create')
    router.post('/stories', [EditStoryController, 'handleAction']).as('stories.store')
  })
  .use(middleware.auth())

// API routes
router
  .group(() => {
    // categories
    router.get('/categories', [ApiCategoryController, 'all']).as('api.categories.all')

    // user
    router.get('/me', [ApiUserController, 'me']).as('api.user.me')
  })
  .prefix('api/v1')
  .use(middleware.auth())
