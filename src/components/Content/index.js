import React, { useState, useEffect } from "react"
import axios from "axios"
import useScroll from "../../hooks/useScroll"
import { API } from "../../utils/constants"
import { Loading } from "../Loading"
import { Tweet } from "../Tweet"

export const Content = () => {
  const [isFetching, setIsFetching] = useScroll(fetchMoreTweets)
  const [tweets, setTweets] = useState([])
  const [updatedTweets, setUpdatedTweets] = useState([])
  const [lastTweetId, setLastTweetId] = useState(null)
  const [firstTweetId, setFirstTweetId] = useState(null)

  useEffect(() => {
    fetchTweets()
  }, [])

  useEffect(() => {
    if (updatedTweets.length) {
      const indexOfUpdatedTweet = updatedTweets.findIndex(tweet => tweet.id === firstTweetId)
      let updateTweetsList = updatedTweets.slice(0, indexOfUpdatedTweet)
      setTweets(prevState => [...new Set([...updateTweetsList, ...prevState])])
    }
  }, [updatedTweets])

  const fetchTweets = async () => {
    try {
      setInterval(async () => {
        const { data } = await axios(`${API}?count=50`)
        setUpdatedTweets(data)
        setFirstTweetId(data[0].id)
      }, 2000)
      const { data } = await axios(`${API}?count=25`)
      setTweets(data)
      setLastTweetId(data[data.length - 1].id)
      setFirstTweetId(data[0].id)
    } catch {
      setTimeout(() => {
        fetchTweets()
      }, 1000)
    }
  }

  async function fetchMoreTweets() {
    try {
      const { data } = await axios(`${API}?count=15&beforeId=${lastTweetId}`)
      setTimeout(() => {
        setTweets(prevState => [...new Set([...prevState, ...data])])
        setLastTweetId(data[data.length - 1].id)
        setIsFetching(false)
      }, 2000)
    } catch {
      setIsFetching(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="md:flex -mx-4">
        <div className="md:w-2/4 mx-auto px-4">
          <ul className="bg-white rounded-lg shadow mb-8">
            {tweets &&
              tweets.map(item => (
                <div key={item.id}>
                  <Tweet item={item} />
                </div>
              ))}
          </ul>
        </div>
      </div>
      {isFetching && <Loading />}
    </div>
  )
}
