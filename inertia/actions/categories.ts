import axios from 'axios'
import { API_URL } from '../../utils/axios'

export const getAllCategories = async () => {
  return await axios.get(`${API_URL}/categories`)
}
