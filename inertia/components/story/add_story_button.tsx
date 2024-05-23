import { Plus } from 'lucide-react'
import { DrawerDialog } from '~/components/story/drawer_dialog'

export function AddStoryButton() {
  const trigger = (
    <div className={'flex items-center p-2'}>
      <Plus className={'h-5'} />
      <span className={'hidden lg:block'}>Histoire</span>
    </div>
  )
  return (
    <>
      <div
        className={
          'fixed z-50 bg-gradient-to-t to-fw-accent from-fw-secondary right-7 bottom-20 lg:right-0 lg:bottom-0 lg:relative lg:flex rounded-full lg:rounded h-12 w-12 lg:w-auto lg:h-auto flex items-center justify-center'
        }
      >
        <DrawerDialog trigger={trigger} />
      </div>
    </>
  )
}
