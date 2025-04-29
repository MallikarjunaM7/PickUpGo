"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Lock } from "lucide-react"

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setCredentials((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Simple validation
    if (!credentials.email || !credentials.password) {
      setError("Please enter both email and password")
      return
    }

    // In a real app, you would authenticate with your backend
    // For demo purposes, we'll use a simple check
    if (credentials.email === "admin@restaurant.com" && credentials.password === "password") {
      // Store auth state (in a real app, you'd use a token)
      localStorage.setItem("isAuthenticated", "true")
      navigate("/admin/dashboard")
    } else {
      setError("Invalid credentials")
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex justify-center mb-6">
          <div className="bg-rose-100 rounded-full p-3">
            <Lock className="h-8 w-8 text-rose-500" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 text-center mb-6">Restaurant Admin Login</h1>

        {error && <div className="bg-red-50 text-red-500 p-3 rounded-md mb-4">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-rose-500 focus:border-rose-500"
                placeholder="admin@restaurant.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-rose-500 focus:border-rose-500"
                placeholder="password"
              />
            </div>
          </div>

          <div className="mt-6">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full px-6 py-3 bg-rose-500 text-white rounded-md font-medium hover:bg-rose-600"
            >
              Sign In
            </motion.button>
          </div>

          <div className="mt-4 text-center text-sm text-gray-500">
            <p>For demo: admin@restaurant.com / password</p>
          </div>
        </form>
      </div>
    </motion.div>
  )
}

export default AdminLogin
