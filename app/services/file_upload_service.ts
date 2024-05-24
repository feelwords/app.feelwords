import { cuid } from '@adonisjs/core/helpers'
import app from '@adonisjs/core/services/app'

export const UPLOAD_PATH = 'uploads'

export default class FileUploadService {
  async moveFile(file: any) {
    await file.move(app.makePath(UPLOAD_PATH), {
      name: `${cuid()}.${file.extname}`,
    })
  }
}
