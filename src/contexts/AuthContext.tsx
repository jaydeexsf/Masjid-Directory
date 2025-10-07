'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

interface User {
  _id: string
  email: string
  name: string
  role: string
  masjidId?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (user: User, token: string) => void
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored authentication on mount
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('authUser')
      const token = localStorage.getItem('authToken')
      
      if (storedUser && token) {
        try {
          const userData = JSON.parse(storedUser)
          setUser(userData)
        } catch (error) {
          console.error('Error parsing stored user data:', error)
          // Clear invalid data
          localStorage.removeItem('authUser')
          localStorage.removeItem('authToken')
          localStorage.removeItem('authRole')
          localStorage.removeItem('userId')
          localStorage.removeItem('masjidId')
        }
      }
    }
    setIsLoading(false)
  }, [])

  const login = (userData: User, token: string) => {
    setUser(userData)
    if (typeof window !== 'undefined') {
      localStorage.setItem('authUser', JSON.stringify(userData))
      localStorage.setItem('authToken', token)
      localStorage.setItem('authRole', userData.role)
      localStorage.setItem('userId', userData._id)
      if (userData.masjidId) {
        localStorage.setItem('masjidId', userData.masjidId)
      }
    }
  }

  const logout = () => {
    setUser(null)
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authUser')
      localStorage.setItem('authToken')
      localStorage.removeItem('authRole')
      localStorage.removeItem('userId')
      localStorage.removeItem('masjidId')
    }
  }

  const value = {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
