"use client"

import { motion } from "framer-motion"
import { Plus, Minus, Trash2 } from "lucide-react"
import { useCart } from "../context/CartContext"

const CartItem = ({ item }) => {
  const { addToCart, removeFromCart, restaurant } = useCart()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-between items-center p-4 border-b border-gray-200"
    >
      <div className="flex items-start">
        <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
          <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" />
        </div>
        <div className="ml-4">
          <h3 className="font-medium text-gray-800">{item.name}</h3>
          <p className="text-gray-500 text-sm mt-1">${item.price.toFixed(2)}</p>
        </div>
      </div>
      <div className="flex items-center">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => removeFromCart(item.id)}
          className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 text-gray-500"
        >
          {item.quantity === 1 ? <Trash2 className="h-4 w-4" /> : <Minus className="h-4 w-4" />}
        </motion.button>
        <span className="mx-3 font-medium">{item.quantity}</span>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => addToCart(item, restaurant)}
          className="flex items-center justify-center w-8 h-8 rounded-full bg-rose-500 text-white"
        >
          <Plus className="h-4 w-4" />
        </motion.button>
      </div>
    </motion.div>
  )
}

export default CartItem
