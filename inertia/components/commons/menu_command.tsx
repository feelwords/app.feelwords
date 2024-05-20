import * as React from 'react'
import { BookPlus, CreditCard, Library, Medal, User, UsersRound } from 'lucide-react'

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '~/components/ui/command'
import { Button } from '~/components/ui/button'
import Category from '#models/category'

interface MenuCommandProps {
  categories: Category[]
}

export function MenuCommand({ categories }: MenuCommandProps) {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  return (
    <>
      <p className="text-sm text-muted-foreground relative">
        <Button
          onClick={() => setOpen(true)}
          className={'w-[200px] justify-normal'}
          variant={'outline'}
        >
          Ouvrir le menu ...
        </Button>
        <kbd className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-fw-black px-1.5 font-mono text-[10px] font-medium text-white opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </p>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Faire une recherche ..." />
        <CommandList>
          <CommandEmpty>Il n'y a pas de résultat pour cette recherche.</CommandEmpty>

          <CommandGroup heading="Suggestions">
            <CommandItem>
              <UsersRound className="mr-2 h-4 w-4" />
              <span>Tournois</span>
            </CommandItem>
            <CommandItem>
              <Medal className="mr-2 h-4 w-4" />
              <span>Classement</span>
            </CommandItem>
            <CommandItem>
              <BookPlus className="mr-2 h-4 w-4" />
              <span>Nouvelle histoire</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />

          <CommandGroup heading="Catégories">
            {categories.map((category) => (
              <CommandItem key={category.id}>
                <span>{category.label}</span>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandGroup heading="Espace écriture">
            <CommandItem>
              <Library className="mr-2 h-4 w-4" />
              <span>Mes histoires</span>
            </CommandItem>
            <CommandItem>
              <BookPlus className="mr-2 h-4 w-4" />
              <span>Nouvelle histoire</span>
            </CommandItem>
          </CommandGroup>

          <CommandGroup heading="Communauté">
            <CommandItem>
              <UsersRound className="mr-2 h-4 w-4" />
              <span>Tournois</span>
            </CommandItem>
            <CommandItem>
              <Medal className="mr-2 h-4 w-4" />
              <span>Classement</span>
            </CommandItem>
          </CommandGroup>

          <CommandGroup heading="Paramètre">
            <CommandItem>
              <User className="mr-2 h-4 w-4" />
              <span>Mon profil</span>
            </CommandItem>
            <CommandItem>
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Mon abonnement</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
