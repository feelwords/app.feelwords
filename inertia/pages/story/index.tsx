import { Head } from '@inertiajs/react'
import { Button } from '~/components/ui/button'
import { Plus } from 'lucide-react'
import { Container } from '~/components/commons/container'
import { H1 } from '~/components/commons/H1'
import { Header } from '~/components/commons/header'
import { useEffect, useState } from 'react'

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
  DrawerTrigger,
} from '~/components/ui/drawer'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { cn } from '~/lib/utils'
import useMediaQuery from '@custom-react-hooks/use-media-query'
import { Textarea } from '~/components/ui/textarea'
import { Switch } from '~/components/ui/switch'
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from '~/components/ui/multi-select'
import { getAllCategories } from '~/actions/categories'
import Category from '#models/category'

export default function IndexStory() {
  return (
    <>
      <Head title="Vos histoires" />
      <main className={'text-white'}>
        <Header />
        <Container>
          <HeaderStory />
          <List />
        </Container>
      </main>
    </>
  )
}

function HeaderStory() {
  return (
    <header className={'flex lg:justify-around items-center w-full'}>
      <H1>Vos histoires</H1>
      <AddStoryButton />
    </header>
  )
}

function List() {
  const stories = [
    {
      id: 1,
      title: 'Mon histoire',
      description: 'Une histoire sur la vie',
      cover: 'https://nextui.org/images/hero-card.jpeg',
      published: true,
      createdAt: '2021-08-01T00:00:00Z',
      updatedAt: '2021-08-01T00:00:00Z',
      user: {},
      categories: [
        {
          id: 1,
          label: 'Vie',
        },
      ],
    },
    {
      id: 1,
      title: 'Mon histoire',
      description: 'Une histoire sur la vie',
      cover: 'https://nextui.org/images/hero-card.jpeg',
      published: true,
      createdAt: '2021-08-01T00:00:00Z',
      updatedAt: '2021-08-01T00:00:00Z',
      user: {},
      categories: [
        {
          id: 1,
          label: 'Vie',
        },
      ],
    },
    {
      id: 1,
      title: 'Mon histoire',
      description: 'Une histoire sur la vie',
      cover: 'https://nextui.org/images/hero-card.jpeg',
      published: true,
      createdAt: '2021-08-01T00:00:00Z',
      updatedAt: '2021-08-01T00:00:00Z',
      user: {},
      categories: [
        {
          id: 1,
          label: 'Vie',
        },
        {
          id: 2,
          label: 'Amour',
        },
      ],
    },
  ]
  return (
    <>
      <div className={'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 '}>
        {stories.map((story) => (
          <DrawerDialog key={story.id} story={story} trigger={<StoryCard story={story} />} />
        ))}
      </div>
    </>
  )
}

function StoryCard({ story }: any) {
  return (
    <div className={'relative p-3 flex flex-col items-center'}>
      <img src={story.cover} className={'aspect-square rounded-3xl object-cover'} />
      <div
        className={
          'absolute flex items-center justify-around bottom-4 border border-muted-foreground/70 w-[80%] m-1 px-3 py-2 backdrop-blur rounded-2xl'
        }
      >
        <span className={'font-semibold text-sm'}>{story.title}</span>
      </div>
    </div>
  )
}

function AddStoryButton() {
  const trigger = (
    <>
      <Plus />
      <span className={'hidden lg:block'}>Histoire</span>
    </>
  )
  return (
    <>
      <Button
        className={
          'absolute right-7 bottom-20 lg:right-0 lg:bottom-0 lg:relative lg:flex rounded-full lg:rounded h-12 w-12 lg:w-auto lg:h-auto flex items-center justify-center'
        }
        variant={'fw'}
      >
        <DrawerDialog trigger={trigger} />
      </Button>
    </>
  )
}

function DrawerDialog({ story, trigger }: { story?: any; trigger: JSX.Element }) {
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
          <StoryForm story={story} />
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
        <StoryForm story={story} className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Annuler</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

function StoryForm({ className, story }: { className?: string; story?: any }) {
  const categories = story?.categories.map((category: any) => category?.label) || []

  return (
    <form className={cn('grid items-start gap-4 h-[450px] overflow-y-auto p-2', className)}>
      <div className="grid gap-2">
        <Label htmlFor="title">Titre*</Label>
        <Input type="title" id="title" required defaultValue={story?.title} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="description">Description*</Label>
        <Textarea id="description" required defaultValue={story?.description} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="cover">Page de couverture*</Label>
        <Input id="cover" type="file" required />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="ended">Terminée</Label>
        <Switch id="ended" defaultChecked={story?.ended} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="categories">Catégories</Label>
        <MultiSelect categories={categories} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="chapters">Chapitres</Label>
        todo
      </div>
      <Button type="submit">Enregistrer les modifications</Button>
    </form>
  )
}

const MultiSelect = ({ categories }: { categories: string[] }) => {
  let [options, setOptions] = useState<{ value: string; label: string }[]>([])
  const [value, setValue] = useState<string[]>(categories)

  useEffect(() => {
    getAllCategories().then((response) => {
      const data: Category[] = response.data
      data.map((category: Category) => {
        setOptions((prev) => [...prev, { value: category.id.toString(), label: category.label }])
      })
    })
  }, [])

  return (
    <MultiSelector values={value} onValuesChange={setValue} loop={false}>
      <MultiSelectorTrigger>
        <MultiSelectorInput placeholder="Vos catégories" />
      </MultiSelectorTrigger>
      <MultiSelectorContent>
        <MultiSelectorList>
          {options?.map((option, i) => (
            <MultiSelectorItem key={i} value={option.label}>
              {option.label}
            </MultiSelectorItem>
          ))}
        </MultiSelectorList>
      </MultiSelectorContent>
    </MultiSelector>
  )
}
