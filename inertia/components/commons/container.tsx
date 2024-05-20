export function Container({ children }: { children: React.ReactNode }) {
  return (
    <section className={'p-3 md:p-4 lg:p-10 flex justify-center'}>
      <div className={'max-w-7xl w-full'}>{children}</div>
    </section>
  )
}
