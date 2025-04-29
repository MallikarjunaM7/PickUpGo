"use client"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { motion } from "framer-motion"
import { Star, Clock, MapPin } from "lucide-react"
import MenuItem from "../components/MenuItem"
import { mockRestaurants, mockMenuItems } from "../data/mockData"

const RestaurantDetail = () => {
  const { id } = useParams()
  const [restaurant, setRestaurant] = useState(null)
  const [menuItems, setMenuItems] = useState([])
  const [activeCategory, setActiveCategory] = useState("")

  useEffect(() => {
    // In a real app, you would fetch this data from an API
    const foundRestaurant = mockRestaurants.find((r) => r.id === Number.parseInt(id))
    setRestaurant(foundRestaurant)

    if (foundRestaurant) {
      const items = mockMenuItems.filter((item) => item.restaurantId === Number.parseInt(id))
      setMenuItems(items)

      // Set first category as active
      if (items.length > 0) {
        const categories = [...new Set(items.map((item) => item.category))]
        setActiveCategory(categories[0])
      }
    }
  }, [id])

  if (!restaurant) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <p className="text-gray-500 text-lg">Loading restaurant details...</p>
      </div>
    )
  }

  // Get unique categories
  const categories = [...new Set(menuItems.map((item) => item.category))]

  // Filter menu items by active category
  const filteredItems = activeCategory ? menuItems.filter((item) => item.category === activeCategory) : menuItems

  return (
    <div>
      {/* Restaurant Header */}
      <div className="relative h-64 bg-gray-900">
        <img
          src={restaurant.image || "/placeholder.svg"}
          alt={restaurant.name}
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h1 className="text-3xl font-bold">{restaurant.name}</h1>
          <p className="text-sm mt-2">{restaurant.cuisine.join(", ")}</p>

          <div className="flex items-center mt-3 space-x-4">
            <div className="flex items-center">
              <Star className="h-5 w-5 text-yellow-400 mr-1" />
              <span>{restaurant.rating}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-1" />
              <span>{restaurant.prepTime} mins</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-5 w-5 mr-1" />
              <span>{restaurant.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Categories */}
          <div className="md:w-1/4">
            <div className="sticky top-20">
              <h2 className="text-xl font-bold mb-4">Menu</h2>
              <div className="space-y-2">
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveCategory(category)}
                    className={`block w-full text-left px-4 py-2 rounded-md ${
                      activeCategory === category ? "bg-rose-500 text-white" : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="md:w-3/4">
            <h2 className="text-2xl font-bold mb-6">{activeCategory || "All Items"}</h2>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {filteredItems.map((item) => (
                <MenuItem key={item.id} item={item} restaurant={restaurant} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RestaurantDetail
