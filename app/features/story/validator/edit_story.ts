import vine from '@vinejs/vine'

export const editStoryValidator = vine.compile(
  vine.object({
    id: vine.number(),
    title: vine.string().trim(),
    description: vine.string().trim(),
    ended: vine.boolean(),
    categories: vine.string().trim().optional(),
  })
)
