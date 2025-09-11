import { SignUp } from "@clerk/nextjs"

const signup = () => {
  return (
    <div className="flex justify-center items-center">
      <SignUp />
    </div>
  )
}

export default signup