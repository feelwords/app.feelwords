import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Head } from '@inertiajs/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import axios from 'axios'

type Inputs = {
  email: string
  full_name: string
  password: string
}

export default function Login() {
  const { register, handleSubmit } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    axios.post('/register', data).then((response) => {
      if (response.status === 201) {
        window.location.href = '/'
      }
    })
  }
  return (
    <>
      <Head title="Création de compte" />

      <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 h-screen text-white">
        <div className="flex items-center justify-center py-12">
          <form onSubmit={handleSubmit(onSubmit)} className="mx-auto grid w-[350px] gap-6">
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
              <Button variant="outline" className=" text-black">
                <img
                  src={'https://img.icons8.com/?size=100&id=17949&format=png&color=000000'}
                  className={'h-7 w-7 mr-2'}
                />
                Connexion avec Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Vous avez déjà un compte ?{' '}
              <a href="/login" className="underline">
                Se connecter
              </a>
            </div>
          </form>
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
