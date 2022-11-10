import { CircleNotch } from "phosphor-react";

const Loading = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <CircleNotch size={40} color="white" className="animate-spin" />
    </div>
  )
}

export default Loading;