"use client"

import { createContext, useState, useContext } from "react"

const CartContext = createContext()

export const useCart = () => useContext(CartContext)

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])
  const [restaurant, setRestaurant] = useState(null)

  const addToCart = (item, restaurantInfo) => {
    // If adding from a different restaurant, clear cart
    if (restaurant && restaurantInfo.id !== restaurant.id) {
      if (window.confirm("Adding items from a new restaurant will clear your current cart. Continue?")) {
        setCartItems([{ ...item, quantity: 1 }])
        setRestaurant(restaurantInfo)
      }
    } else {
      // Check if item already exists in cart
      const existingItem = cartItems.find((cartItem) => cartItem.id === item.id)

      if (existingItem) {
        setCartItems(
          cartItems.map((cartItem) =>
            cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
          ),
        )
      } else {
        setCartItems([...cartItems, { ...item, quantity: 1 }])
        if (!restaurant) setRestaurant(restaurantInfo)
      }
    }
  }

  const removeFromCart = (itemId) => {
    const existingItem = cartItems.find((item) => item.id === itemId)

    if (existingItem.quantity === 1) {
      setCartItems(cartItems.filter((item) => item.id !== itemId))
    } else {
      setCartItems(cartItems.map((item) => (item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item)))
    }

    // If cart is empty, reset restaurant
    if (cartItems.length === 1 && cartItems[0].quantity === 1) {
      setRestaurant(null)
    }
  }

  const clearCart = () => {
    setCartItems([])
    setRestaurant(null)
  }

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        restaurant,
        addToCart,
        removeFromCart,
        clearCart,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
