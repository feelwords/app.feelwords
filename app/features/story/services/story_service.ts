import Story from '#models/story'
import Category from '#models/category'
import { HttpContext } from '@adonisjs/core/http'
import { UPLOAD_PATH } from './file_upload_service.js'

interface Payload {
  id?: number
  title: string
  description: string
  cover?: any
  ended: boolean
  categories: string | undefined
}

export default class StoryService {
  async updateStory(payload: Payload) {
    const story = await Story.findOrFail(payload.id)
    const tempCover = story.cover
    story.merge(payload)

    if (payload.cover) {
      story.cover = this.getCoverPath(payload.cover.fileName)
    }

    story.cover = story.cover || tempCover
    await story.save()
    return story
  }

  async createStory(payload: Payload) {
    return Story.create({
      ...payload,
      cover: this.getCoverPath(payload.cover.fileName),
    })
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

  private getCoverPath(fileName: string) {
    return `/${UPLOAD_PATH}/${fileName}`
  }

  private async associateStoryWithCategories(story: Story, categories: Category[]) {
    // detach all categories first
    await story.related('categories').detach()
    // attach new categories
    await story.related('categories').attach(categories.map((c: any) => c.id))
  }
}
