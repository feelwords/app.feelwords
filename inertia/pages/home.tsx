import { Head } from '@inertiajs/react'
import { Button } from "~/components/ui/button";

export default function Home() {
  return (
    <>
      <Head title="Homepage" />

      <h1 className={"text-red-500"}>Homepage</h1>
      <Button variant={"default"}>Click me</Button>
    </>
  )
}
