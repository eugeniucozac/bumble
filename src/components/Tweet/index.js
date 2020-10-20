import React from "react"
import moment from "moment"

export const Tweet = ({ item: { image, text, timeStamp, username } }) => {
  const onError = e => {
    e.target.onerror = null
    e.target.src = "http://placehold.it/500x500"
  }

  return (
    <li className="px-6 py-5 border-b border-gray-200">
      <div className="flex w-full">
        <div className="flex-shrink-0 mr-5 mt-1">
          <div className="cursor-pointer w-12 h-12 flex rounded-full">
            <img className="rounded-full" src={image} onError={onError} />
          </div>
        </div>
        <div className="flex-1">
          <div>
            <strong className="font-bold text-gray-800">{username}</strong>
            <span className="mx-1 text-gray-500">•</span>
            <span className="text-gray-600">{moment(timeStamp).fromNow()}</span>
          </div>
          <p className="text-gray-700">{text}</p>
        </div>
      </div>
    </li>
  )
}
