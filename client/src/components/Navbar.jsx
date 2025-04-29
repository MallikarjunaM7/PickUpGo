"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import { useCart } from "../context/CartContext"
import { useAuth } from "../context/AuthContext"
import { ShoppingBag, Menu, X, User, LogIn } from "lucide-react"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { cartItems } = useCart()
  const { user, isAuthenticated } = useAuth()
  const location = useLocation()

  const isAdminRoute = location.pathname.startsWith("/admin")

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0)

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <motion.div whileHover={{ scale: 1.05 }} className="text-rose-500 font-bold text-2xl">
                FoodExpress
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              {!isAdminRoute ? (
                <>
                  <Link to="/" className="px-3 py-2 text-gray-700 hover:text-rose-500">
                    Home
                  </Link>
                  <Link to="/restaurants" className="px-3 py-2 text-gray-700 hover:text-rose-500">
                    Restaurants
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/admin/dashboard" className="px-3 py-2 text-gray-700 hover:text-rose-500">
                    Dashboard
                  </Link>
                  <Link to="/admin/menu-items" className="px-3 py-2 text-gray-700 hover:text-rose-500">
                    Menu Items
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center">
            {!isAdminRoute ? (
              <>
                <Link to="/cart" className="p-2 relative">
                  <ShoppingBag className="h-6 w-6 text-gray-700" />
                  {totalItems > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-0 right-0 bg-rose-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                    >
                      {totalItems}
                    </motion.span>
                  )}
                </Link>

                {isAuthenticated ? (
                  <Link to="/profile" className="p-2 ml-2 flex items-center">
                    <div className="bg-rose-100 rounded-full p-1">
                      <User className="h-5 w-5 text-rose-500" />
                    </div>
                    <span className="ml-2 text-sm font-medium hidden md:block">{user.name}</span>
                  </Link>
                ) : (
                  <div className="flex items-center ml-2">
                    <Link to="/login" className="p-2 flex items-center text-gray-700 hover:text-rose-500">
                      <LogIn className="h-5 w-5 md:mr-1" />
                      <span className="hidden md:block text-sm">Sign In</span>
                    </Link>
                    <Link
                      to="/register"
                      className="hidden md:block ml-2 px-3 py-1 bg-rose-500 text-white rounded-md text-sm hover:bg-rose-600"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}

                <Link to="/admin" className="p-2 ml-2 md:ml-4">
                  <span className="text-xs text-gray-500 hover:text-gray-700">Admin</span>
                </Link>
              </>
            ) : (
              <Link to="/" className="p-2 text-gray-700 hover:text-rose-500">
                Customer View
              </Link>
            )}

            {/* Mobile menu button */}
            <div className="md:hidden ml-2">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-gray-700 hover:text-rose-500 focus:outline-none"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {!isAdminRoute ? (
              <>
                <Link
                  to="/"
                  className="block px-3 py-2 text-gray-700 hover:text-rose-500"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/restaurants"
                  className="block px-3 py-2 text-gray-700 hover:text-rose-500"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Restaurants
                </Link>
                {!isAuthenticated ? (
                  <>
                    <Link
                      to="/login"
                      className="block px-3 py-2 text-gray-700 hover:text-rose-500"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/register"
                      className="block px-3 py-2 text-gray-700 hover:text-rose-500"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </>
                ) : (
                  <Link
                    to="/profile"
                    className="block px-3 py-2 text-gray-700 hover:text-rose-500"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Profile
                  </Link>
                )}
              </>
            ) : (
              <>
                <Link
                  to="/admin/dashboard"
                  className="block px-3 py-2 text-gray-700 hover:text-rose-500"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/admin/menu-items"
                  className="block px-3 py-2 text-gray-700 hover:text-rose-500"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Menu Items
                </Link>
              </>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  )
}

export default Navbar
