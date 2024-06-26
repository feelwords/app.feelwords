import React, { ReactElement, useEffect, useState } from 'react'
import { MenuCommand } from '~/components/commons/menu_command'
import { UserProfile } from '~/components/commons/user_profile'
import Category from '#models/category'
import { useCurrentUser } from '~/hooks/use_current_user'
import { getAllCategories } from '~/actions/categories'
import User from '#models/user'

const headerLinks = [
  {
    title: 'Accueil',
    href: '/',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width={24}
        height={24}
        color={'#ffffff'}
        fill={'none'}
      >
        <path
          d="M15.0001 17C14.2006 17.6224 13.1504 18 12.0001 18C10.8499 18 9.79965 17.6224 9.00012 17"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M2.35151 13.2135C1.99849 10.9162 1.82198 9.76763 2.25629 8.74938C2.69059 7.73112 3.65415 7.03443 5.58126 5.64106L7.02111 4.6C9.41841 2.86667 10.6171 2 12.0001 2C13.3832 2 14.5818 2.86667 16.9791 4.6L18.419 5.64106C20.3461 7.03443 21.3097 7.73112 21.744 8.74938C22.1783 9.76763 22.0018 10.9162 21.6487 13.2135L21.3477 15.1724C20.8473 18.4289 20.597 20.0572 19.4291 21.0286C18.2612 22 16.5538 22 13.1389 22H10.8613C7.44646 22 5.73903 22 4.57112 21.0286C3.40321 20.0572 3.15299 18.4289 2.65255 15.1724L2.35151 13.2135Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: 'Recherche',
    href: '/search',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width={24}
        height={24}
        color={'#ffffff'}
        fill={'none'}
      >
        <path
          d="M17.5 17.5L22 22"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C15.9706 20 20 15.9706 20 11Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: 'Bibliothèque',
    href: '/library',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width={24}
        height={24}
        color={'#ffffff'}
        fill={'none'}
      >
        <path
          d="M19.4626 3.99415C16.7809 2.34923 14.4404 3.01211 13.0344 4.06801C12.4578 4.50096 12.1696 4.71743 12 4.71743C11.8304 4.71743 11.5422 4.50096 10.9656 4.06801C9.55962 3.01211 7.21909 2.34923 4.53744 3.99415C1.01807 6.15294 0.221721 13.2749 8.33953 19.2834C9.88572 20.4278 10.6588 21 12 21C13.3412 21 14.1143 20.4278 15.6605 19.2834C23.7783 13.2749 22.9819 6.15294 19.4626 3.99415Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: 'Écriture',
    href: '/stories',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width={24}
        height={24}
        color={'#ffffff'}
        fill={'none'}
      >
        <path
          d="M16.2141 4.98239L17.6158 3.58063C18.39 2.80646 19.6452 2.80646 20.4194 3.58063C21.1935 4.3548 21.1935 5.60998 20.4194 6.38415L19.0176 7.78591M16.2141 4.98239L10.9802 10.2163C9.93493 11.2616 9.41226 11.7842 9.05637 12.4211C8.70047 13.058 8.3424 14.5619 8 16C9.43809 15.6576 10.942 15.2995 11.5789 14.9436C12.2158 14.5877 12.7384 14.0651 13.7837 13.0198L19.0176 7.78591M16.2141 4.98239L19.0176 7.78591"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M21 12C21 16.2426 21 18.364 19.682 19.682C18.364 21 16.2426 21 12 21C7.75736 21 5.63604 21 4.31802 19.682C3 18.364 3 16.2426 3 12C3 7.75736 3 5.63604 4.31802 4.31802C5.63604 3 7.75736 3 12 3"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: 'Classement',
    href: '/ranking',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width={24}
        height={24}
        color={'#ffffff'}
        fill={'none'}
      >
        <path
          d="M3.5 18C3.5 16.5858 3.5 15.8787 3.93934 15.4393C4.37868 15 5.08579 15 6.5 15H7C7.94281 15 8.41421 15 8.70711 15.2929C9 15.5858 9 16.0572 9 17V22H3.5V18Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15 19C15 18.0572 15 17.5858 15.2929 17.2929C15.5858 17 16.0572 17 17 17H17.5C18.9142 17 19.6213 17 20.0607 17.4393C20.5 17.8787 20.5 18.5858 20.5 20V22H15V19Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2 22H22"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9 16C9 14.5858 9 13.8787 9.43934 13.4393C9.87868 13 10.5858 13 12 13C13.4142 13 14.1213 13 14.5607 13.4393C15 13.8787 15 14.5858 15 16V22H9V16Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.6911 2.57767L13.395 3.99715C13.491 4.19475 13.7469 4.38428 13.9629 4.42057L15.2388 4.6343C16.0547 4.77141 16.2467 5.36824 15.6587 5.957L14.6668 6.95709C14.4989 7.12646 14.4069 7.4531 14.4589 7.68699L14.7428 8.925C14.9668 9.90492 14.4509 10.284 13.591 9.77185L12.3951 9.05808C12.1791 8.92903 11.8232 8.92903 11.6032 9.05808L10.4073 9.77185C9.5514 10.284 9.03146 9.90089 9.25543 8.925L9.5394 7.68699C9.5914 7.4531 9.49941 7.12646 9.33143 6.95709L8.33954 5.957C7.7556 5.36824 7.94358 4.77141 8.75949 4.6343L10.0353 4.42057C10.2473 4.38428 10.5033 4.19475 10.5993 3.99715L11.3032 2.57767C11.6872 1.80744 12.3111 1.80744 12.6911 2.57767Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
]

export const Header = () => {
  const {
    currentUser,
  }: {
    currentUser: User | null
  } = useCurrentUser()
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    getAllCategories().then((response) => {
      setCategories(response.data)
    })
  }, [])

  if (!currentUser) return null

  return (
    <>
      <HeaderMobile
        user_id={currentUser.id}
        full_name={currentUser.full_name}
        user_profile_picture_url={currentUser.profile_picture}
      />
      <HeaderDesktop
        user_id={currentUser.id}
        full_name={currentUser.full_name}
        user_profile_picture_url={currentUser.profile_picture}
        categories={categories}
      />
    </>
  )
}

function HeaderMobile({
  full_name,
  user_profile_picture_url,
  user_id,
}: {
  full_name: string | null
  user_profile_picture_url: string | null
  user_id: number
}) {
  const [activeLink, setActiveLink] = useState(window.location.pathname)

  useEffect(() => {
    const handleLocationChange = () => {
      setActiveLink(window.location.pathname)
    }

    window.addEventListener('popstate', handleLocationChange)

    return () => {
      window.removeEventListener('popstate', handleLocationChange)
    }
  }, [])
  return (
    <>
      <header className={'w-full flex md:hidden justify-between items-center backdrop-blur-sm p-4'}>
        <img src="/assets/images/feelwordslogo.png" alt="logo" className={'w-10 h-10 rounded-xl'} />
        <UserProfile
          full_name={full_name}
          user_profile_picture_url={user_profile_picture_url}
          user_id={user_id}
        />
      </header>
      <nav
        className={'z-20 flex justify-around md:hidden fixed bottom-0 bg-fw-light-black w-full p-4'}
      >
        {headerLinks.map((link) => (
          <HeaderMobileItem key={link.title} {...link} isActive={activeLink === link.href} />
        ))}
      </nav>
    </>
  )
}

function HeaderDesktop({
  full_name,
  user_profile_picture_url,
  user_id,
  categories,
}: {
  full_name: string | null
  user_profile_picture_url: string | null
  user_id: number
  categories: Category[]
}) {
  return (
    <>
      <header className={'z-10 md:flex hidden'}>
        <nav className={'w-full flex justify-between items-center backdrop-blur-sm p-4'}>
          <div className={'flex items-center mr-8'}>
            <img
              src="/assets/images/feelwordslogo.png"
              alt="logo"
              className={'w-12 h-12 rounded-xl'}
            />
            <h1 className={'ahsing ml-3 text-2xl '}>Feelwords</h1>
          </div>

          <div className={'flex'}>
            <MenuCommand categories={categories} />
            <div className={'ml-3'}>
              <UserProfile
                full_name={full_name}
                user_profile_picture_url={user_profile_picture_url}
                user_id={user_id}
              />
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}

function HeaderMobileItem({
  href,
  icon,
  isActive,
}: {
  title: string
  href: string
  icon: ReactElement
  isActive: boolean
}) {
  const clonedIcon = React.cloneElement(icon, {
    className: isActive ? 'active-icon' : '',
  })
  return <a href={href}>{clonedIcon}</a>
}
