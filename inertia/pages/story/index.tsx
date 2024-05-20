import { Head } from '@inertiajs/react'
import { Button } from '~/components/ui/button'
import { Plus } from 'lucide-react'
import { Container } from '~/components/commons/container'
import { H1 } from '~/components/commons/H1'
import { Header } from '~/components/commons/header'

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
      cover: 'https://picsum.photos/200/300',
      published: true,
      createdAt: '2021-08-01T00:00:00Z',
      updatedAt: '2021-08-01T00:00:00Z',
      categories: [
        {
          id: 1,
          label: 'Vie',
        },
      ],
    },
  ]
  return <div></div>
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
