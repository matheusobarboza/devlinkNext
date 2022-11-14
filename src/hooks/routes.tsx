import { useRouter } from "next/router"
import { FC } from "react"
import Loading from "../components/Loading"

export const withPublic = (Component: FC) => {
  return function WithPublic(props) {
    const user = localStorage.getItem("@detailUser")
    const router = useRouter()

    if(user) {
      router.replace("/admin")
      return <Loading />
    }

    return <Component auth={user} {...props} />
  }
}

export const withProtected = (Component: FC) => {
  return function WithProtected(props) {
    const user = localStorage.getItem("@detailUser")
    const router = useRouter()

    if(!user) {
      router.replace("/signin")
      return <Loading />
    }

    return <Component auth={user} {...props} />
  }
}