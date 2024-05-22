import { useState } from 'react'
import useMediaQuery from '@custom-react-hooks/use-media-query'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog'
import { StoryForm } from '~/components/story/story_form'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '~/components/ui/drawer'
import { Button } from '~/components/ui/button'
import Story from '#models/story'

export function DrawerDialog({ story, trigger }: { story?: Story; trigger: JSX.Element }) {
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')

  const isEditing = story !== undefined

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>{trigger}</DialogTrigger>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {isEditing ? `Modification de ${story.title}` : "Création d'une histoire"}
            </DialogTitle>
            <DialogDescription>
              {isEditing
                ? 'Modifiez les détails de votre histoire ici. Cliquez sur enregistrer lorsque vous avez terminé.'
                : 'Remplissez les détails de votre histoire ici. Cliquez sur enregistrer lorsque vous avez'}
            </DialogDescription>
          </DialogHeader>
          <StoryForm story={story} setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger>{trigger}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>
            {isEditing ? `Modification de ${story.title}` : "Création d'une histoire"}
          </DrawerTitle>
          <DrawerDescription>
            {isEditing
              ? 'Modifiez les détails de votre histoire ici. Cliquez sur enregistrer lorsque vous avez terminé.'
              : 'Remplissez les détails de votre histoire ici. Cliquez sur enregistrer lorsque vous avez'}
          </DrawerDescription>
        </DrawerHeader>
        <StoryForm story={story} setOpen={setOpen} className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Annuler</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
