import Category from '#models/category'
import { HttpContext } from '@adonisjs/core/http'

export default class ApiCategoryController {
  async all({ response }: HttpContext) {
    const categories = await Category.query().orderBy('label', 'asc').select('id', 'label')
    return response.status(200).json(categories)
  }
}
