"use client"

import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { CheckCircle, Home, Utensils } from "lucide-react"

const OrderConfirmation = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center"
    >
      <div className="bg-white rounded-lg shadow-md p-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="flex justify-center mb-6"
        >
          <CheckCircle className="h-20 w-20 text-green-500" />
        </motion.div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Your order has been successfully placed. You can pick up your food at the selected time.
        </p>

        <div className="bg-gray-50 p-6 rounded-lg mb-8 max-w-md mx-auto">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Order Details</h2>
          <div className="text-left space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Order Number:</span>
              <span className="text-gray-900 font-medium">#12345</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Pickup Time:</span>
              <span className="text-gray-900 font-medium">Today at 6:30 PM</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 w-full sm:w-auto"
            >
              <Home className="h-5 w-5 mr-2" />
              Back to Home
            </motion.button>
          </Link>
          <Link to="/restaurants">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center px-6 py-3 bg-rose-500 text-white rounded-md font-medium hover:bg-rose-600 w-full sm:w-auto"
            >
              <Utensils className="h-5 w-5 mr-2" />
              Order More Food
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default OrderConfirmation
