import Chapter from '#models/chapter'
import * as React from 'react'
import { deleteChapter } from '~/actions/chapter'
import { cn } from '~/lib/utils'
import { Button } from '~/components/ui/button'

export function DeleteForm({ chapter }: { chapter: Chapter }) {
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
