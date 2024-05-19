import { Header } from '~/components/commons/header'

export const Main_layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={'p-0 md:p-2 text-white'}>
      <Header />
      {children}
    </div>
  )
}
