"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { SkipNavigation } from "@/components/accessibility/skip-navigation"

export function DashboardHeader() {
  const [userData, setUserData] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const storedUserData = localStorage.getItem("user-data")
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData))
    }
  }, [])

  const handleSignOut = () => {
    localStorage.removeItem("auth-token")
    localStorage.removeItem("user-data")
    router.push("/")
  }

  const displayName = userData?.name || "User"
  const displayEmail = userData?.email || "user@example.com"
  const initials = displayName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
  const isDemo = userData?.id === "demo-user"

  return (
    <>
      <SkipNavigation />
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50" role="banner">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center gap-4" aria-label="Linguo Dashboard Home">
              <div
                className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-lg"
                aria-hidden="true"
              >
                <span className="text-white font-bold text-xl">L</span>
              </div>
              <h1 className="text-2xl font-serif font-bold text-foreground">Linguo</h1>
              {isDemo && (
                <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5 text-xs">
                  DEMO
                </Badge>
              )}
            </Link>

            <nav className="hidden md:flex items-center gap-8" role="navigation" aria-label="Main navigation">
              <Link
                href="/dashboard"
                className="text-sm font-semibold text-primary hover:text-primary/80 focus:text-primary transition-colors relative"
                aria-current="page"
              >
                Dashboard
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full"></div>
              </Link>
              <Link
                href="/meet"
                className="text-sm font-medium text-muted-foreground hover:text-primary focus:text-primary transition-colors"
              >
                Video Calls
              </Link>
              <Link
                href="/read"
                className="text-sm font-medium text-muted-foreground hover:text-primary focus:text-primary transition-colors"
              >
                Documents
              </Link>
              <Link
                href="/accessibility"
                className="text-sm font-medium text-muted-foreground hover:text-primary focus:text-primary transition-colors"
                aria-label="Accessibility Settings"
              >
                Accessibility
              </Link>
              <Link
                href="/settings"
                className="text-sm font-medium text-muted-foreground hover:text-primary focus:text-primary transition-colors"
              >
                Settings
              </Link>
            </nav>

            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                className="bg-white/50 backdrop-blur-sm border-primary/30 hover:bg-white/70 font-medium"
                aria-label="Invite friends to Linguo"
              >
                {isDemo ? "Try Full Version" : "Invite Friends"}
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-12 w-12 rounded-full hover:bg-muted/50"
                    aria-label="User account menu"
                  >
                    <Avatar className="h-12 w-12 border-2 border-primary/20">
                      <AvatarImage src={userData?.avatar || "/generic-user-avatar.png"} alt="User profile picture" />
                      <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white font-semibold">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-64 bg-card/95 backdrop-blur-sm border-border/50"
                  align="end"
                  forceMount
                >
                  <DropdownMenuLabel className="font-normal p-4">
                    <div className="flex flex-col space-y-2">
                      <p className="text-base font-semibold leading-none">{displayName}</p>
                      <p className="text-sm leading-none text-muted-foreground">{displayEmail}</p>
                      {isDemo && (
                        <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5 text-xs w-fit">
                          Demo Account
                        </Badge>
                      )}
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href="/profile" className="flex items-center gap-3 p-3">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href="/accessibility" className="flex items-center gap-3 p-3">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      Accessibility
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href="/settings" className="flex items-center gap-3 p-3">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        />
                      </svg>
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  {!isDemo && (
                    <DropdownMenuItem asChild className="cursor-pointer">
                      <Link href="/billing" className="flex items-center gap-3 p-3">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                          />
                        </svg>
                        Billing
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive cursor-pointer p-3" onClick={handleSignOut}>
                    <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    {isDemo ? "Exit Demo" : "Sign out"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
