import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Head } from '@inertiajs/react'

export default function Login() {
  return (
    <>
      <Head title="Création de compte" />

      <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 h-screen text-white">
        <div className="flex items-center justify-center py-12">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold text-white">Connectez vous à votre compte</h1>
              <p className="text-balance text-muted-foreground">
                Entrez vos informations de connexion
              </p>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" required />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Mot de passe</Label>
                  <a href="/forgot-password" className="ml-auto inline-block text-sm underline">
                    Mot de passe oublié ?
                  </a>
                </div>
                <Input id="password" type="password" required />
              </div>
              <Button variant={'fw'} type="submit" className="w-full">
                Se connecter
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
