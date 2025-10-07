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
    console.log('AuthContext: Checking for stored authentication...')
    
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('authUser')
      const token = localStorage.getItem('authToken')
      
      console.log('AuthContext: Found stored data:', {
        hasUser: !!storedUser,
        hasToken: !!token
      })
      
      if (storedUser && token) {
        try {
          const userData = JSON.parse(storedUser)
          console.log('AuthContext: Restoring user session:', {
            userId: userData._id,
            email: userData.email,
            role: userData.role
          })
          setUser(userData)
        } catch (error) {
          console.error('AuthContext: Error parsing stored user data:', error)
          // Clear invalid data
          localStorage.removeItem('authUser')
          localStorage.removeItem('authToken')
          localStorage.removeItem('authRole')
          localStorage.removeItem('userId')
          localStorage.removeItem('masjidId')
          console.log('AuthContext: Cleared invalid stored data')
        }
      } else {
        console.log('AuthContext: No stored authentication found')
      }
    }
    setIsLoading(false)
  }, [])

  const login = (userData: User, token: string) => {
    console.log('AuthContext: Logging in user:', {
      userId: userData._id,
      email: userData.email,
      role: userData.role,
      masjidId: userData.masjidId
    })
    
    setUser(userData)
    if (typeof window !== 'undefined') {
      localStorage.setItem('authUser', JSON.stringify(userData))
      localStorage.setItem('authToken', token)
      localStorage.setItem('authRole', userData.role)
      localStorage.setItem('userId', userData._id)
      if (userData.masjidId) {
        localStorage.setItem('masjidId', userData.masjidId)
      }
      console.log('AuthContext: User data stored in localStorage')
    }
  }

  const logout = () => {
    console.log('AuthContext: Logging out user')
    setUser(null)
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authUser')
      localStorage.removeItem('authToken')
      localStorage.removeItem('authRole')
      localStorage.removeItem('userId')
      localStorage.removeItem('masjidId')
      console.log('AuthContext: User data removed from localStorage')
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
