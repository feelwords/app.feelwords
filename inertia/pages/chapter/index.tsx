import { Head } from '@inertiajs/react'
import { Toaster } from '~/components/ui/sonner'
import { Container } from '~/components/commons/container'
import { ArrowLeft, Edit, EllipsisVertical, Trash2 } from 'lucide-react'
import * as React from 'react'

import { Button } from '~/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '~/components/ui/drawer'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import useMediaQuery from '@custom-react-hooks/use-media-query'
import { cn } from '~/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import Chapter from '#models/chapter'
import { InferPageProps } from '@adonisjs/inertia/types'
import IndexChapterController from '../../../app/features/chapter/controllers/index_chapter_controller'
import { deleteChapter } from '~/actions/chapter'

export default function IndexChapter({
  chapter,
}: InferPageProps<IndexChapterController, 'handleAction'>) {
  return (
    <div>
      <Head title={chapter.title} />
      <Toaster />
      <main className={'text-white'}>
        <StoryHeader chapter={chapter as Chapter} />
        <Container>
          <div>hello</div>
        </Container>
      </main>
    </div>
  )
}

function StoryHeader({ chapter }: { chapter: Chapter }) {
  const goBack = () => {
    history.back()
  }

  return (
    <div className={'w-screen p-3 flex justify-between sticky border-b'}>
      <ArrowLeft onClick={goBack} />
      <h1>{chapter.title}</h1>
      <DrawerDialogChapter chapter={chapter} />
    </div>
  )
}

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

function EditForm({ className, chapter }: { className?: string; chapter: Chapter }) {
  return (
    <form className={cn('grid items-start gap-4 mx-4', className)}>
      <div className="grid gap-2">
        <Label htmlFor="title">Titre*</Label>
        <Input type="title" id="title" defaultValue={chapter.title} />
      </div>
      <Button type="submit">Modifier</Button>
    </form>
  )
}

function DeleteForm({ chapter }: { chapter: Chapter }) {
  const handleDelete = (e: React.FormEvent) => {
    e.preventDefault()
    deleteChapter({ chapter })
  }
  return (
    <form onSubmit={(e) => handleDelete(e)} className={cn('grid items-start gap-4 mx-4')}>
      <Button variant={'destructive'} type="submit">
        Supprimer
      </Button>
    </form>
  )
}
