"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Search, ArrowRight } from "lucide-react"
import RestaurantCard from "../components/RestaurantCard"
import { mockRestaurants } from "../data/mockData"

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [featuredRestaurants, setFeaturedRestaurants] = useState([])

  useEffect(() => {
    // In a real app, you would fetch this data from an API
    setFeaturedRestaurants(mockRestaurants.slice(0, 4))
  }, [])

  return (
    <div>
      {/* Hero Section */}
      <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-rose-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl"
            >
              Order Food for <span className="text-rose-500">Self-Pickup</span>
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-5 max-w-xl mx-auto text-xl text-gray-500"
            >
              Discover local restaurants, order your favorite meals, and pick them up yourself.
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-8 max-w-md mx-auto"
            >
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search for restaurants or cuisines"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-rose-500 focus:border-rose-500"
                />
                <Link to="/restaurants">
                  <button className="absolute inset-y-0 right-0 px-4 text-white bg-rose-500 rounded-r-md hover:bg-rose-600">
                    Search
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Featured Restaurants */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Featured Restaurants</h2>
            <Link to="/restaurants" className="text-rose-500 flex items-center hover:text-rose-600">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-4 text-lg text-gray-600">Order and pick up your food in 3 simple steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-rose-500 font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Find a Restaurant</h3>
              <p className="text-gray-600">Browse through our selection of restaurants and cuisines</p>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-rose-500 font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Place Your Order</h3>
              <p className="text-gray-600">Select your favorite dishes and place your order</p>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-rose-500 font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Pick Up Your Food</h3>
              <p className="text-gray-600">Visit the restaurant at the specified time and enjoy your meal</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
