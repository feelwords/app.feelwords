import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'

interface UserProfileProps {
  user_profile_picture_url: string | null
  fullName: string | null
  user_id?: number
}

export const UserProfile = ({ user_profile_picture_url, fullName, user_id }: UserProfileProps) => {
  let fallback = ''
  if (fullName !== null) {
    fallback = fullName[0].toUpperCase()
  }
  return (
    <a href={`/profile/${user_id}`}>
      <Avatar>
        <AvatarImage src={user_profile_picture_url ?? ''} alt={`@${fullName}`} />
        <AvatarFallback className={'text-fw-black'}>{fallback}</AvatarFallback>
      </Avatar>
    </a>
  )
}
