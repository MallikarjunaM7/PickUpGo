import { createContext, useState, useContext, useEffect } from "react"

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = (userData) => {
    const loggedInUser = {
      ...userData,
      id: Date.now(), // Simple ID generation for demo
    }
    setUser(loggedInUser)
    localStorage.setItem("user", JSON.stringify(loggedInUser))
  }

  const register = (userData) => {
    const registeredUser = {
      ...userData,
      id: Date.now(), // Simple ID generation for demo
    }
    setUser(registeredUser)
    localStorage.setItem("user", JSON.stringify(registeredUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider")
  }
  return context
}

export default AuthContext
