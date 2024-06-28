import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import Story from '#models/story'

export default class UserStoryMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    // used to check if the user authenticated is the creator of the story

    // todo crash
    const currentUser = await ctx.auth.authenticate()

    const storyId = ctx.request.param('storyId')

    if (storyId) {
      const story = await Story.query().where('id', storyId).firstOrFail()

      await story.load('user')

      if (story.user.id !== currentUser.id) {
        throw new Error('Forbidden')
      }
    }

    return await next()
  }
}
