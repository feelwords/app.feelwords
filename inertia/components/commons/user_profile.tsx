import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'

interface UserProfileProps {
  user_profile_picture_url: string | null
  full_name: string | null
  user_id?: number
}

export const UserProfile = ({ user_profile_picture_url, full_name, user_id }: UserProfileProps) => {
  let fallback = ''
  if (full_name !== null) {
    fallback = full_name[0].toUpperCase()
  }
  return (
    <a href={`/profile/${user_id}`}>
      <Avatar>
        <AvatarImage src={user_profile_picture_url ?? ''} alt={`@${full_name}`} />
        <AvatarFallback className={'text-fw-black'}>{fallback}</AvatarFallback>
      </Avatar>
    </a>
  )
}
