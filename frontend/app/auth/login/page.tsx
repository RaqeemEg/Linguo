"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const isDemo = searchParams.get("demo") === "true"

  useEffect(() => {
    if (isDemo) {
      handleDemoLogin()
    }
  }, [isDemo])

  const handleDemoLogin = () => {
    setIsLoading(true)
    localStorage.setItem("auth-token", "demo-token-12345")
    localStorage.setItem(
      "user-data",
      JSON.stringify({
        id: "demo-user",
        name: "Demo User",
        email: "demo@linguo.com",
        avatar: "/generic-user-avatar.png",
      }),
    )

    setTimeout(() => {
      router.push("/dashboard")
    }, 1000)
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      localStorage.setItem("auth-token", "user-token-67890")
      localStorage.setItem(
        "user-data",
        JSON.stringify({
          id: "user-123",
          name: "John Doe",
          email: "john@example.com",
          avatar: "/generic-user-avatar.png",
        }),
      )
      router.push("/dashboard")
    }, 1000)
  }

  if (isDemo && isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <span className="text-white font-bold text-2xl">L</span>
          </div>
          <h2 className="text-2xl font-serif font-bold mb-3 text-foreground">Setting up your demo...</h2>
          <p className="text-muted-foreground text-lg">Preparing Linguo features for you to explore</p>
          <div className="mt-6 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-4 mb-8 group">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-200">
              <span className="text-white font-bold text-2xl">L</span>
            </div>
            <h1 className="text-3xl font-serif font-bold text-foreground">Linguo</h1>
            <Badge variant="secondary" className="ml-2 text-xs">
              AI-Powered
            </Badge>
          </Link>
          <h2 className="text-3xl font-serif font-bold text-foreground mb-3">Welcome back</h2>
          <p className="text-muted-foreground text-lg">Sign in to your account to continue your journey</p>
        </div>

        <Card className="border-border/50 shadow-xl backdrop-blur-sm bg-card/80">
          <CardHeader className="space-y-2 pb-6">
            <CardTitle className="text-2xl font-serif font-bold">Sign in</CardTitle>
            <CardDescription className="text-base">Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-3">
                <Label htmlFor="email" className="text-sm font-semibold text-foreground">
                  Email address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full h-12 text-base border-border/50 focus:border-primary transition-colors"
                  required
                  aria-describedby="email-error"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-semibold text-foreground">
                    Password
                  </Label>
                  <Link
                    href="/auth/forgot-password"
                    className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="w-full h-12 text-base border-border/50 focus:border-primary transition-colors"
                  required
                  aria-describedby="password-error"
                />
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Signing in...
                  </div>
                ) : (
                  "Sign in"
                )}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border/50" />
              </div>
              <div className="relative flex justify-center text-sm uppercase">
                <span className="bg-card px-4 text-muted-foreground font-medium">Or continue with</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full h-12 text-base font-semibold border-2 border-accent/20 hover:bg-accent/5 hover:border-accent/40 transition-all duration-200 bg-transparent"
              onClick={handleDemoLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-accent"></div>
                  Loading demo...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Try Demo Account
                </div>
              )}
            </Button>

            <div className="text-center pt-2">
              <p className="text-base text-muted-foreground">
                Don't have an account?{" "}
                <Link
                  href="/auth/register"
                  className="text-primary hover:text-primary/80 font-semibold transition-colors"
                >
                  Create one now
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground leading-relaxed">
            By signing in, you agree to our{" "}
            <Link href="/terms" className="text-primary hover:text-primary/80 font-medium transition-colors">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-primary hover:text-primary/80 font-medium transition-colors">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
