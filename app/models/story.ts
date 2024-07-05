import type { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import User from '#models/user'
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import Category from '#models/category'
import Chapter from '#models/chapter'

export default class Story extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare description: string

  @column()
  declare cover: string

  @column()
  declare ended: boolean

  @manyToMany(() => Category, {
    pivotTable: 'story_categories',
  })
  declare categories: ManyToMany<typeof Category>

  @hasMany(() => Chapter)
  declare chapters: HasMany<typeof Chapter>

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @column()
  declare userId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
