import { Head } from '@inertiajs/react'
import { Button } from '~/components/ui/button'
import { Plus } from 'lucide-react'
import { Container } from '~/components/commons/container'
import { H1 } from '~/components/commons/H1'
import { Header } from '~/components/commons/header'
import * as React from 'react'
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
          <DrawerDialog key={story.id} story={story} />
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
  return (
    <>
      <Button
        className={
          'absolute right-7 bottom-20 lg:hidden rounded-full h-12 w-12 flex items-center justify-center'
        }
        variant={'fw'}
        asChild
      >
        <a href={'/story/create'}>
          <Plus />
        </a>
      </Button>
      <Button className={'hidden lg:flex items-center'} variant={'fw'} asChild>
        <a href={'/story/create'}>
          <Plus className={'h-5 w-5 mr-2'} />
          Histoire
        </a>
      </Button>
    </>
  )
}

function DrawerDialog({ story }: any) {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <StoryCard story={story} />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Modification de {story.title}</DialogTitle>
            <DialogDescription>
              Modifiez les détails de votre histoire ici. Cliquez sur enregistrer lorsque vous avez
              terminé.
            </DialogDescription>
          </DialogHeader>
          <StoryForm story={story} />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger>
        <StoryCard story={story} />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Modification de {story.title}</DrawerTitle>
          <DrawerDescription>
            Modifiez les détails de votre histoire ici. Cliquez sur enregistrer lorsque vous avez
            terminé.
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

function StoryForm({ className, story }: { className?: string; story: any }) {
  const categories = story.categories.map((category: any) => category.label)

  return (
    <form className={cn('grid items-start gap-4 h-[450px] overflow-y-auto', className)}>
      <div className="grid gap-2">
        <Label htmlFor="title">Titre*</Label>
        <Input type="title" id="title" required defaultValue={story.title} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="description">Description*</Label>
        <Textarea id="description" required defaultValue={story.description} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="cover">Page de couverture*</Label>
        <Input id="cover" type="file" required />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="ended">Terminée</Label>
        <Switch id="ended" defaultChecked={story.ended} />
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
          {options.map((option, i) => (
            <MultiSelectorItem key={i} value={option.label}>
              {option.label}
            </MultiSelectorItem>
          ))}
        </MultiSelectorList>
      </MultiSelectorContent>
    </MultiSelector>
  )
}
