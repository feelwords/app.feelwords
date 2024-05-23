import { HttpContext } from '@adonisjs/core/http'
import { createStoryValidator } from '../validator/create_story.js'
import Story from '#models/story'
import app from '@adonisjs/core/services/app'
import { cuid } from '@adonisjs/core/helpers'
import Category from '#models/category'

const UPLOAD_PATH = 'uploads'

export default class CreateStoryController {
  // todo : add erreur front & back
  // todo : add erreur front & back login register
  async handleAction({ request, response, auth }: HttpContext) {
    try {
      const payload = await request.validateUsing(createStoryValidator)

      // todo : create service
      await this.moveCoverFile(payload)

      const story = await this.createStoryWithPayload(payload)

      await this.handleCategoryAssociation(payload, story)

      await this.associateCreatorWithStory(story, auth)

      return response.status(201).json(story)
    } catch (error) {
      console.error(error) // Basic error logging
      return response.status(500).json({ message: error })
    }
  }

  private async moveCoverFile(payload: any) {
    await payload.cover.move(app.makePath(UPLOAD_PATH), {
      name: `${cuid()}.${payload.cover.extname}`,
    })
  }

  private async createStoryWithPayload(payload: any) {
    return await Story.create({
      ...payload,
      cover: `/${UPLOAD_PATH}/${payload.cover.fileName}`,
    })
  }

  private async handleCategoryAssociation(payload: any, story: any) {
    let categories = payload.categories?.split(',')
    if (!categories) return

    const existingCategories = await Category.query().whereIn('label', categories)
    await this.associateStoryWithCategories(story, existingCategories)

    const newCategories = categories.filter(
      (c: string) => !existingCategories.find((ec) => ec.label === c)
    )
    const newCategoriesModels = await Category.createMany(
      newCategories.map((c: any) => ({ label: c }))
    )
    await this.associateStoryWithCategories(story, newCategoriesModels)
  }

  private async associateStoryWithCategories(story: any, categories: any) {
    await story.related('categories').attach(categories.map((c: any) => c.id))
  }

  private async associateCreatorWithStory(story: any, auth: any) {
    await story.related('user').associate(auth.getUserOrFail())
  }
}
