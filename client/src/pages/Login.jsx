"use client"

import { useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import { Mail, Lock, ArrowRight } from "lucide-react"
import { useAuth } from "../context/AuthContext"

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()



  // Get the redirect path from location state or default to home
  const from = location.state?.from?.pathname || "/"

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

    // In a real app, you would validate with your backend
    // For demo purposes, we'll accept any credentials
    login({
      email: credentials.email,
      name: credentials.email.split("@")[0], // Use part of email as name for demo
    })

    // Redirect to the page they were trying to access or home
    navigate(from, { replace: true })
  }

  // const loginUser = async () => { 
  //   try {
  //     const response = await fetch("http://localhost:5000/api/auth/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(credentials),
  //     })

  //     if (!response.ok) {
  //       throw new Error("Login failed")
  //     }

  //     const data = await response.json()
  //     console.log("Login successful:", data)
  //     // Handle successful login (e.g., store token, redirect)
  //   } catch (error) {
  //     console.error("Error during login:", error)
  //     setError("Invalid email or password")
  //   }
  // }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-600 mt-2">Sign in to your account to continue</p>
        </div>

        {error && <div className="bg-red-50 text-red-500 p-3 rounded-md mb-4">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={credentials.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-rose-500 focus:border-rose-500"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-rose-500 focus:border-rose-500"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-rose-500 focus:ring-rose-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-rose-500 hover:text-rose-600">
                  Forgot your password?
                </a>
              </div>
            </div>
          </div>

          <div className="mt-6" >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full flex justify-center items-center px-6 py-3 bg-rose-500 text-white rounded-md font-medium hover:bg-rose-600"
            >
              Sign In <ArrowRight className="ml-2 h-4 w-4" />
            </motion.button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="font-medium text-rose-500 hover:text-rose-600">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default Login
