import vine from '@vinejs/vine'

export const createUserValidator = vine.compile(
  vine.object({
    email: vine.string().trim().email(),
    full_name: vine.string().trim(),
    password: vine.string().trim().minLength(8),
  })
)
