import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'

interface UserProfileProps {
  user_profile_picture_url: string
  username: string
  user_id?: number
}

export const UserProfile = ({ user_profile_picture_url, username, user_id }: UserProfileProps) => {
  const fallback = username[0].toUpperCase()
  return (
    <a href={`/profile/${user_id}`}>
      <Avatar>
        <AvatarImage src={user_profile_picture_url} alt={`@${username}`} />
        <AvatarFallback className={'text-fw-black'}>{fallback}</AvatarFallback>
      </Avatar>
    </a>
  )
}
