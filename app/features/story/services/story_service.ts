import Story from '#models/story'
import Category from '#models/category'
import { HttpContext } from '@adonisjs/core/http'

interface Payload {
  id?: number
  title: string
  description: string
  cover?: any
  ended: boolean
  categories: string | undefined
}

export default class StoryService {
  async updateOrCreateStory(payload: Payload) {
    // case : edit and cover is not changed then we need to keep the current cover path
    if (payload.id && !payload.cover) {
      const story = await Story.findOrFail(payload.id)
      payload.cover = story.cover
    }

    return await Story.updateOrCreate(
      { id: payload.id },
      {
        ...payload,
        cover: payload.cover,
      }
    )
  }

  async handleCategoryAssociation(payload: Payload, story: any) {
    let categories = payload.categories?.split(',')
    if (!categories) return

    // todo : check
    const existingCategories = await Category.query().whereIn('label', categories)
    await this.associateStoryWithCategories(story, existingCategories)
  }

  async associateCreatorWithStory(story: Story, auth: HttpContext['auth']) {
    await story.related('user').associate(auth.getUserOrFail())
  }

  private async associateStoryWithCategories(story: Story, categories: Category[]) {
    await story.related('categories').attach(categories.map((c: any) => c.id))
  }
}
