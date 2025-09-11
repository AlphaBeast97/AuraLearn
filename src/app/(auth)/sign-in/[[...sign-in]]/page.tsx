import { SignIn } from "@clerk/nextjs"

const signin = () => {
  return (
    <main className="flex justify-center items-center">
      <SignIn />
    </main>
  )
}

export default signin