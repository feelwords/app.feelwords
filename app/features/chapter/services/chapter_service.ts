import Chapter from '#models/chapter'

interface PayloadCreate {
  title: string
  storyId: number
  order: number
  content: string
}

interface PayloadEdit {
  title: string
  id: number
}

export default class ChapterService {
  async createChapter(payload: PayloadCreate) {
    return await Chapter.create(payload)
  }

  async updateChapter(payload: PayloadEdit) {
    const chapter = await Chapter.findOrFail(payload.id)
    chapter.title = payload.title
    await chapter.save()
    return chapter
  }

  async countChapter(storyId: number) {
    return Chapter.query().where('story_id', storyId).count('* as total')
  }
}
