import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Head } from '@inertiajs/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Toaster } from 'sonner'
import { createUser } from '~/actions/users'

type Inputs = {
  email: string
  full_name: string
  password: string
}

export default function Login() {
  const { register, handleSubmit } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    createUser(data)
  }

  const toggleSocialAuth = () => {
    window.location.href = '/auth/google'
  }

  return (
    <>
      <Head title="Création de compte" />
      <Toaster />

      <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 h-screen text-white">
        <div className="flex items-center justify-center py-12">
          <div className="mx-auto grid w-[350px] gap-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-2 text-center">
                <h1 className="text-3xl font-bold text-white">Créer votre compte</h1>
                <p className="text-balance text-muted-foreground">
                  Entrez vos informations pour créer un compte
                </p>
              </div>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    {...register('email')}
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    className={'text-black'}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="full_name">Nom complet</Label>
                  </div>
                  <Input
                    {...register('full_name')}
                    id="full_name"
                    type="texte"
                    placeholder={'John Doe'}
                    className={'text-black'}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Mot de passe</Label>
                  </div>
                  <Input
                    {...register('password')}
                    id="password"
                    type="password"
                    placeholder={'********'}
                    className={'text-black'}
                    required
                  />
                </div>
                <Button variant={'fw'} type="submit" className="w-full">
                  Créer un compte
                </Button>
              </div>
            </form>
            <Button onClick={() => toggleSocialAuth()} variant="outline" className=" text-black">
              <img
                src={'https://img.icons8.com/?size=100&id=17949&format=png&color=000000'}
                className={'h-7 w-7 mr-2'}
              />
              Connexion avec Google
            </Button>
            <div className="mt-4 text-center text-sm">
              Vous avez déjà un compte ?{' '}
              <a href="/login" className="underline">
                Se connecter
              </a>
            </div>
          </div>
        </div>
        <div className="hidden bg-muted lg:block">
          <img
            src="/assets/images/feelwordsfulllogo.png"
            alt="Image"
            width="2048"
            height="2048"
            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </div>
    </>
  )
}
