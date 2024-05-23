import axios from 'axios'
import { API_URL } from '../../utils/axios'
import { toast } from 'sonner'
import { ERROR_STYLE } from '~/lib/sonnar'

export const getCurrentUser = async () => {
  return await axios.get(`${API_URL}/me`)
}

export async function createUser(data: any) {
  try {
    const response = await axios.post('/register', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 201) {
      window.location.href = '/'
    }
  } catch (error) {
    toast('Une erreur est survenue', {
      className: ERROR_STYLE,
      description: error.response.data.message,
    })
  }
}

export async function loginUser(data: any) {
  try {
    const response = await axios.post('/login', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 200) {
      window.location.href = '/'
    }
  } catch (e) {
    const errors: { message: string }[] = e.response.data.errors
    toast('Une erreur est survenue', {
      className: ERROR_STYLE,
      description: errors.map((error) => error.message).join(', '),
    })
  }
}
