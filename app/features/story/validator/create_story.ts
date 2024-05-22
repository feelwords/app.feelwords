import vine from '@vinejs/vine'

export const createStoryValidator = vine.compile(
  vine.object({
    title: vine.string().trim(),
    description: vine.string().trim(),
    cover: vine.file({
      size: '2mb',
      extnames: ['jpg', 'png', 'jpeg'],
    }),
    ended: vine.boolean(),
    categories: vine.string().trim().optional(),
  })
)
