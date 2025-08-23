"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      localStorage.setItem("auth-token", "new-user-token-12345")
      localStorage.setItem(
        "user-data",
        JSON.stringify({
          id: "new-user-123",
          name: "New User",
          email: "newuser@example.com",
          avatar: "/generic-user-avatar.png",
        }),
      )
      router.push("/dashboard")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 flex items-center justify-center p-4">
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
          <h2 className="text-3xl font-serif font-bold text-foreground mb-3">Create your account</h2>
          <p className="text-muted-foreground text-lg">Join the Linguo community and start communicating</p>
        </div>

        <Card className="border-border/50 shadow-xl backdrop-blur-sm bg-card/80">
          <CardHeader className="space-y-2 pb-6">
            <CardTitle className="text-2xl font-serif font-bold">Sign up</CardTitle>
            <CardDescription className="text-base">Create your account to get started with Linguo</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <Label htmlFor="firstName" className="text-sm font-semibold text-foreground">
                    First name
                  </Label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="First name"
                    className="w-full h-12 text-base border-border/50 focus:border-primary transition-colors"
                    required
                    aria-describedby="firstName-error"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="lastName" className="text-sm font-semibold text-foreground">
                    Last name
                  </Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Last name"
                    className="w-full h-12 text-base border-border/50 focus:border-primary transition-colors"
                    required
                    aria-describedby="lastName-error"
                  />
                </div>
              </div>

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
                <Label htmlFor="password" className="text-sm font-semibold text-foreground">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  className="w-full h-12 text-base border-border/50 focus:border-primary transition-colors"
                  required
                  aria-describedby="password-error"
                />
                <p className="text-sm text-muted-foreground">Password must be at least 8 characters long</p>
              </div>

              <div className="space-y-3">
                <Label htmlFor="confirmPassword" className="text-sm font-semibold text-foreground">
                  Confirm password
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  className="w-full h-12 text-base border-border/50 focus:border-primary transition-colors"
                  required
                  aria-describedby="confirmPassword-error"
                />
              </div>

              <div className="flex items-start space-x-3 p-4 bg-muted/30 rounded-lg border border-border/50">
                <Checkbox id="terms" required className="mt-1" />
                <Label
                  htmlFor="terms"
                  className="text-sm leading-relaxed peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I agree to the{" "}
                  <Link href="/terms" className="text-primary hover:text-primary/80 font-medium transition-colors">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-primary hover:text-primary/80 font-medium transition-colors">
                    Privacy Policy
                  </Link>
                </Label>
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
                    Creating account...
                  </div>
                ) : (
                  "Create account"
                )}
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-base text-muted-foreground">
                Already have an account?{" "}
                <Link href="/auth/login" className="text-primary hover:text-primary/80 font-semibold transition-colors">
                  Sign in instead
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Linguo is committed to creating an inclusive communication platform for everyone.
          </p>
        </div>
      </div>
    </div>
  )
}
