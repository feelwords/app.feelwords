import Chapter from '#models/chapter'

interface Payload {
  title: string
  storyId: number
  order: number
  content: string
}

export default class ChapterService {
  async createChapter(payload: Payload) {
    return await Chapter.create(payload)
  }

  async countChapter(storyId: number) {
    return Chapter.query().where('story_id', storyId).count('* as total')
  }
}
