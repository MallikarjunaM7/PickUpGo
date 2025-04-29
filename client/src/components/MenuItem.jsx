"use client"

import { motion } from "framer-motion"
import { Plus } from "lucide-react"
import { useCart } from "../context/CartContext"

const MenuItem = ({ item, restaurant }) => {
  const { addToCart } = useCart()

  return (
    <motion.div whileHover={{ scale: 1.02 }} className="flex justify-between items-center p-4 border-b border-gray-200">
      <div className="flex items-start">
        <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
          <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" />
        </div>
        <div className="ml-4">
          <h3 className="font-medium text-gray-800">{item.name}</h3>
          <p className="text-gray-500 text-sm mt-1">${item.price.toFixed(2)}</p>
          <p className="text-gray-600 text-sm mt-1 line-clamp-2">{item.description}</p>
        </div>
      </div>
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => addToCart(item, restaurant)}
        className="flex items-center justify-center w-8 h-8 rounded-full bg-rose-500 text-white"
      >
        <Plus className="h-5 w-5" />
      </motion.button>
    </motion.div>
  )
}

export default MenuItem
