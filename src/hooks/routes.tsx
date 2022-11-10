import { useRouter } from "next/router"
import React from "react"
import Loading from "../components/Loading"

export const withPublic = (Component: React.FunctionComponent) => {
  return function WithPublic(props) {
    const user = localStorage.getItem("@detailUser")
    const router = useRouter()

    if(user) {
      router.replace("/")
      return <Loading />
    }

    return <Component auth={user} {...props} />
  }
}

export const withProtected = (Component: React.FunctionComponent) => {
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