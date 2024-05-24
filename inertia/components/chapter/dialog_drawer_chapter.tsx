import Chapter from '#models/chapter'
import * as React from 'react'
import useMediaQuery from '@custom-react-hooks/use-media-query'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog'
import { Edit, EllipsisVertical, Trash2 } from 'lucide-react'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '~/components/ui/drawer'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import { Button } from '~/components/ui/button'
import { EditForm } from '~/components/chapter/edit_form'
import { DeleteForm } from '~/components/chapter/delete_form'

export function DrawerDialogChapter({ chapter }: { chapter: Chapter }) {
  const [open, setOpen] = React.useState(false)
  const [action, setAction] = React.useState<'edit' | 'delete' | null>(null)
  const isDesktop = useMediaQuery('(min-width: 768px)')

  const handleOpen = (actionType: 'edit' | 'delete') => {
    setAction(actionType)
    setOpen(true)
  }

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <EllipsisVertical />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{action === 'edit' ? 'Edit Profile' : 'Confirm Deletion'}</DialogTitle>
            <DialogDescription>
              {action === 'edit'
                ? 'Faite les changements que vous souhaitez apporter à ce chapitre.'
                : 'Voulez-vous vraiment supprimer ce chapitre ? Cette action est irréversible.'}
            </DialogDescription>
          </DialogHeader>
          {action === 'edit' ? <EditForm chapter={chapter} /> : <DeleteForm chapter={chapter} />}
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <EllipsisVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>
            <h3>Actions</h3>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => handleOpen('delete')}>
            <Trash2 className="mr-2 h-4 w-4 text-red-500" />
            <span className="text-red-500">Supprimer le chapitre</span>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => handleOpen('edit')}>
            <Edit className="mr-2 h-4 w-4" />
            <span>Modifier les informations</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>
            {action === 'edit'
              ? `Modifier le chapitre ${chapter.title}`
              : 'Confirmer la suppression'}
          </DrawerTitle>
          <DrawerDescription>
            {action === 'edit'
              ? 'Faite les changements que vous souhaitez apporter à ce chapitre.'
              : 'Voulez-vous vraiment supprimer ce chapitre ? Cette action est irréversible.'}
          </DrawerDescription>
        </DrawerHeader>
        {action === 'edit' ? <EditForm chapter={chapter} /> : <DeleteForm chapter={chapter} />}

        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Fermer</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
