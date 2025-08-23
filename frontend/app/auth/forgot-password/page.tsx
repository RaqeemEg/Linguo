"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
    }, 2000)
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
          <h2 className="text-3xl font-serif font-bold text-foreground mb-3">Reset your password</h2>
          <p className="text-muted-foreground text-lg">
            {isSubmitted
              ? "Check your email for reset instructions"
              : "Enter your email to receive a password reset link"}
          </p>
        </div>

        <Card className="border-border/50 shadow-xl backdrop-blur-sm bg-card/80">
          <CardHeader className="space-y-2 pb-6">
            <CardTitle className="text-2xl font-serif font-bold">
              {isSubmitted ? "Email sent!" : "Forgot password"}
            </CardTitle>
            <CardDescription className="text-base">
              {isSubmitted
                ? "We've sent password reset instructions to your email address"
                : "We'll send you a secure link to reset your password"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isSubmitted ? (
              /* Success state with better visual feedback */
              <div className="text-center space-y-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-serif font-semibold text-foreground">Check your email</h3>
                  <p className="text-muted-foreground">
                    If an account with that email exists, we've sent you a password reset link.
                  </p>
                </div>
                <Link href="/auth/login">
                  <Button className="w-full h-12 text-base font-semibold">Back to sign in</Button>
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
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

                <Button
                  type="submit"
                  className="w-full h-12 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Sending reset link...
                    </div>
                  ) : (
                    "Send reset link"
                  )}
                </Button>

                <div className="text-center pt-2">
                  <p className="text-base text-muted-foreground">
                    Remember your password?{" "}
                    <Link
                      href="/auth/login"
                      className="text-primary hover:text-primary/80 font-semibold transition-colors"
                    >
                      Sign in instead
                    </Link>
                  </p>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
