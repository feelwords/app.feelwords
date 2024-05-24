import { Head } from '@inertiajs/react'
import { Toaster } from '~/components/ui/sonner'
import { Header } from '~/components/commons/header'
import { Container } from '~/components/commons/container'

export default function IndexChapter() {
  return (
    <div>
      <Head title="TODO" />
      <Toaster />
      <main className={'text-white'}>
        <Header />
        <Container>
          <div>hello</div>
        </Container>
      </main>
    </div>
  )
}
