import React from "react"

export const Header = () => {
  return (
    <div className="bg-white shadow">
      <div className="container mx-auto px-4 py-2 md:py-3">
        <div className="flex justify-between items-center">
          <div className="text-lg md:text-xl font-bold text-gray-800">Bumble</div>
          <div className="relative">
            <div className="cursor-pointer font-bold w-10 h-10 bg-blue-200 text-blue-600 flex items-center justify-center rounded-full">
              B
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
