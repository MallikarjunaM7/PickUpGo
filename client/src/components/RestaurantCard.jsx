"use client"

import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Star, Clock } from "lucide-react"

const RestaurantCard = ({ restaurant }) => {
  return (
    <motion.div whileHover={{ y: -5 }} className="bg-white rounded-lg shadow-md overflow-hidden">
      <Link to={`/restaurant/${restaurant.id}`}>
        <img src={restaurant.image || "/placeholder.svg"} alt={restaurant.name} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h3 className="text-xl font-bold text-gray-800">{restaurant.name}</h3>
          <p className="text-gray-600 text-sm mt-1">{restaurant.cuisine.join(", ")}</p>

          <div className="flex items-center mt-2">
            <div className="flex items-center bg-green-100 px-2 py-1 rounded">
              <Star className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-green-600 font-medium">{restaurant.rating}</span>
            </div>
            <div className="flex items-center ml-3">
              <Clock className="h-4 w-4 text-gray-500 mr-1" />
              <span className="text-gray-500 text-sm">{restaurant.prepTime} mins</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default RestaurantCard
