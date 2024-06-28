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

const EditChapterController = () =>
  import('../app/features/chapter/controllers/edit_chapter_controller.js')

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

router.group(() => {
  router.post('/register', [RegistersController, 'store']).as('register.store')
  router.get('/register', [RegistersController, 'show']).as('register.show')
  router.get('/logout', [LogoutController, 'destroy']).as('login.destroy')
  router.post('/login', [LoginController, 'store']).as('login.store')
  router.get('/login', [LoginController, 'show']).as('login.show')
  router.get('/auth/google', [SocialAuthsController, 'redirect']).as('auth.google')
  router
    .get('/auth/google/callback', [SocialAuthsController, 'callback'])
    .as('auth.google.callback')
})

/*
DEFAULT WEB ROUTES
 */
router
  .group(() => {
    router.get('/', [HomeController, 'show']).as('home')
    router.get('/stories', [IndexStoryController, 'index']).as('stories.index')
    router.get('/categories', [ApiCategoryController, 'all']).as('api.categories.all')
    router.get('/me', [ApiUserController, 'me']).as('api.user.me')
    router.post('/story', [CreateStoryController, 'handleAction']).as('stories.store')
  })
  .use(middleware.auth())

/*
|--------------------------------------------------------------------------
 ROUTES STORY MIDDLEWARE PROTECTED (a user can only access his own stories, view, edit, delete, create chapters)
|--------------------------------------------------------------------------
 */
router
  .group(() => {
    // story
    router.delete('/story/:storyId', [DeleteStoryController, 'handleAction']).as('stories.destroy')
    router.put('/story/:storyId', [EditStoryController, 'handleAction']).as('stories.update')
    // chapter
    router
      .get('/story/:storyId/chapter/:chapterId', [IndexChapterController, 'handleAction'])
      .as('chapter.index')
    router
      .post('/story/:storyId/chapter', [CreateChapterController, 'handleAction'])
      .as('stories.storeChapter')
    router
      .delete('/story/:storyId/chapter/:chapterId', [DeleteChapterController, 'handleAction'])
      .as('stories.deleteChapter')
    router
      .put('/story/:storyId/chapter/:chapterId', [EditChapterController, 'handleAction'])
      .as('stories.updateChapter')
  })
  .middleware([middleware.auth() /*, middleware.user_story()*/])
