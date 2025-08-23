"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface AuthGuardProps {
  children: React.ReactNode
  requireAuth?: boolean
}

export function AuthGuard({ children, requireAuth = true }: AuthGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const router = useRouter()

  useEffect(() => {
    // TODO: Replace with actual authentication check
    // This is a placeholder for demonstration
    const checkAuth = () => {
      const token = localStorage.getItem("auth-token")
      setIsAuthenticated(!!token)
    }

    checkAuth()
  }, [])

  useEffect(() => {
    if (isAuthenticated === null) return // Still loading

    if (requireAuth && !isAuthenticated) {
      router.push("/auth/login")
    } else if (!requireAuth && isAuthenticated) {
      router.push("/dashboard")
    }
  }, [isAuthenticated, requireAuth, router])

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-accent-foreground font-bold">S</span>
          </div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (requireAuth && !isAuthenticated) {
    return null // Will redirect to login
  }

  if (!requireAuth && isAuthenticated) {
    return null // Will redirect to dashboard
  }

  return <>{children}</>
}
