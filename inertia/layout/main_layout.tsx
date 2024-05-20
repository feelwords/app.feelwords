import { Header } from '~/components/commons/header'

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={'text-white'}>
      <Header />
      {children}
    </div>
  )
}
