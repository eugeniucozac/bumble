import { useState, useEffect } from "react"

const useScroll = fetchMoreTweets => {
  const [isFetching, setIsFetching] = useState(false)

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (!isFetching) return
    fetchMoreTweets()
  }, [isFetching])

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.offsetHeight)
      setIsFetching(true)
  }

  return [isFetching, setIsFetching]
}

export default useScroll
