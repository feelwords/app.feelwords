import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Head } from '@inertiajs/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Toaster } from 'sonner'
import { loginUser } from '~/actions/users'

type Inputs = {
  email: string
  password: string
}

export default function Login() {
  const { register, handleSubmit } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    loginUser(data)
  }

  const toggleSocialAuth = () => {
    window.location.href = '/auth/google'
  }

  return (
    <>
      <Head title="Connexion à votre compte" />

      <Toaster />
      <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 h-screen text-white">
        <div className="flex items-center justify-center py-12">
          <div className="mx-auto grid w-[350px] gap-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-2 text-center">
                <h1 className="text-3xl font-bold text-white">Connectez vous à votre compte</h1>
                <p className="text-balance text-muted-foreground">
                  Entrez vos informations de connexion
                </p>
              </div>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    className={'text-black'}
                    {...register('email')}
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Mot de passe</Label>
                    <a href="/forgot-password" className="ml-auto inline-block text-sm underline">
                      Mot de passe oublié ?
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder={'********'}
                    required
                    className={'text-black'}
                    {...register('password')}
                  />
                </div>
                <Button variant={'fw'} type="submit" className="w-full">
                  Se connecter
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
              Vous n&apos;avez pas de compte ?{' '}
              <a href="/register" className="underline">
                Créer un compte
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
