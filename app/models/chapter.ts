import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Story from '#models/story'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Chapter extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare content: string

  @column()
  declare order: number

  @column()
  declare view: number

  @column()
  declare like: number

  @belongsTo(() => Story)
  declare story: BelongsTo<typeof Story>

  @column()
  declare storyId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
