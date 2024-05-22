import axios from 'axios'
import { API_URL } from '../../utils/axios'

export const getCurrentUser = async () => {
  return await axios.get(`${API_URL}/me`)
}
