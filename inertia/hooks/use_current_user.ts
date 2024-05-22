import { useEffect, useState } from 'react'
import { getCurrentUser } from '~/actions/users'
import User from '#models/user'

export function useCurrentUser() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    getCurrentUser()
      .then((response) => {
        setCurrentUser(response.data)
        setLoading(false)
      })
      .catch(() => {
        setCurrentUser(null)
        setLoading(false)
      })
  }, [])

  return { currentUser, loading }
}
