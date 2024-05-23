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

  async handleCategoryAssociation(payload: Payload, story: Story) {
    let categoriesPayload = payload.categories?.split(',')
    if (!categoriesPayload) return

    const categories = await Category.query().whereIn('label', categoriesPayload)

    await this.associateStoryWithCategories(story, categories)
  }

  async associateCreatorWithStory(story: Story, auth: HttpContext['auth']) {
    await story.related('user').associate(auth.getUserOrFail())
  }

  private async associateStoryWithCategories(story: Story, categories: Category[]) {
    // detach all categories first
    await story.related('categories').detach()
    // attach new categories
    await story.related('categories').attach(categories.map((c: any) => c.id))
  }
}
