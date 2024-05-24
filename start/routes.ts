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

const DeleteChapterController = () =>
  import('../app/features/chapter/controllers/delete_chapter_controller.js')

const IndexChapterController = () =>
  import('../app/features/chapter/controllers/index_chapter_controller.js')

const CreateChapterController = () =>
  import('../app/features/chapter/controllers/create_chapter_controller.js')

const CreateStoryController = () =>
  import('../app/features/story/controllers/create_story_controller.js')

const DeleteStoryController = () =>
  import('../app/features/story/controllers/delete_story_controller.js')

const SocialAuthsController = () =>
  import('../app/features/auth/controllers/social_auths_controller.js')

const ApiCategoryController = () =>
  import('../app/features/category/controllers/api_category_controller.js')

const ApiUserController = () => import('../app/features/user/controllers/api_user_controller.js')

const IndexStoryController = () =>
  import('../app/features/story/controllers/index_story_controller.js')
const EditStoryController = () =>
  import('../app/features/story/controllers/edit_story_controller.js')

const LogoutController = () => import('../app/features/auth/controllers/logout_controller.js')

const RegistersController = () => import('../app/features/auth/controllers/register_controller.js')

const LoginController = () => import('../app/features/auth/controllers/login_controller.js')

const HomeController = () => import('#controllers/home_controller')

// Auth routes
router.get('/auth/google', [SocialAuthsController, 'redirect']).as('auth.google')
router.get('/auth/google/callback', [SocialAuthsController, 'callback']).as('auth.google.callback')

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
    // Home
    router.get('/', [HomeController, 'show']).as('home')

    // Chapter
    router
      .get('/story/chapter/:chapterId', [IndexChapterController, 'handleAction'])
      .as('chapter.index')

    // Story
    router.get('/stories', [IndexStoryController, 'index']).as('stories.index')
  })
  .use(middleware.auth())

// API routes
router
  .group(() => {
    // categories
    router.get('/categories', [ApiCategoryController, 'all']).as('api.categories.all')

    // user
    router.get('/me', [ApiUserController, 'me']).as('api.user.me')

    // chapter
    router
      .post('/story/:id/chapter', [CreateChapterController, 'handleAction'])
      .as('stories.storeChapter')
    router
      .delete('/story/chapter/:id', [DeleteChapterController, 'handleAction'])
      .as('stories.deleteChapter')

    //story
    router.delete('/story/:id', [DeleteStoryController, 'handleAction']).as('stories.destroy')
    router.put('/story/:id', [EditStoryController, 'handleAction']).as('stories.update')
    router.post('/story', [CreateStoryController, 'handleAction']).as('stories.store')
  })
  .prefix('api/v1')
  .use(middleware.auth())
