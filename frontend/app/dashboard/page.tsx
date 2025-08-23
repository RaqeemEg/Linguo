"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AuthGuard } from "@/components/auth/auth-guard"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { RecentActivity } from "@/components/dashboard/recent-activity"

export default function DashboardPage() {
  const [userData, setUserData] = useState<any>(null)

  useEffect(() => {
    const storedUserData = localStorage.getItem("user-data")
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData))
    }
  }, [])

  const isDemo = userData?.id === "demo-user"
  const firstName = userData?.name?.split(" ")[0] || "there"

  return (
    <AuthGuard requireAuth={true}>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
        <DashboardHeader />

        <main id="main-content" className="container mx-auto px-4 py-8" tabIndex={-1}>
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
                {isDemo ? `Welcome to SignSync, ${firstName}!` : `Welcome back, ${firstName}`}
              </h1>
              {isDemo && (
                <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5">
                  Demo Mode
                </Badge>
              )}
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl">
              {isDemo
                ? "Explore our AI-powered communication features in this interactive demo experience"
                : "Choose how you'd like to communicate today and break down barriers"}
            </p>
          </div>

          {isDemo && (
            <div className="mb-12 p-8 bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 border border-primary/20 rounded-2xl shadow-lg backdrop-blur-sm">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-serif font-bold text-foreground mb-3">You're exploring SignSync Demo</h2>
                  <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                    This interactive demo showcases our AI-powered sign language communication platform. Try both
                    features below to experience how SignSync breaks down communication barriers and creates inclusive
                    conversations.
                  </p>
                  <div className="flex flex-wrap items-center gap-4">
                    <Button
                      size="lg"
                      variant="outline"
                      className="bg-white/50 backdrop-blur-sm border-primary/30 hover:bg-white/70"
                    >
                      Learn More
                    </Button>
                    <Button size="lg" className="shadow-lg">
                      Get Full Access
                    </Button>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span>All features available</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <QuickActions />

          <div className="grid lg:grid-cols-3 gap-8 mt-16">
            <div className="lg:col-span-2">
              <RecentActivity />
            </div>

            <aside className="space-y-8" aria-label="Sidebar with helpful information">
              <Card className="border-border/50 shadow-lg backdrop-blur-sm bg-card/80">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <CardTitle className="text-xl font-serif">
                        {isDemo ? "Demo Features" : "Getting Started"}
                      </CardTitle>
                      <CardDescription className="text-base">
                        {isDemo ? "Explore these SignSync capabilities" : "New to SignSync? Here are some helpful tips"}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-3 rounded-lg bg-muted/30 border border-border/50">
                      <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">
                          {isDemo ? "Try video calling features" : "Test your camera and microphone"}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {isDemo
                            ? "Experience real-time sign language translation"
                            : "Ensure optimal video call quality"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-3 rounded-lg bg-muted/30 border border-border/50">
                      <div className="w-8 h-8 bg-gradient-to-br from-accent to-accent/80 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">
                          {isDemo ? "Explore document reading" : "Upload your first document"}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {isDemo ? "See how complex text becomes accessible" : "Try the document reading feature"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-3 rounded-lg bg-muted/30 border border-border/50">
                      <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">
                          {isDemo ? "Check accessibility settings" : "Customize your preferences"}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {isDemo ? "See our inclusive design features" : "Adjust settings for your needs"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full bg-white/50 backdrop-blur-sm border-primary/30 hover:bg-white/70"
                  >
                    {isDemo ? "View All Features" : "View Tutorial"}
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-border/50 shadow-lg backdrop-blur-sm bg-card/80">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-accent/20 to-primary/20 rounded-xl flex items-center justify-center">
                      <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <CardTitle className="text-xl font-serif">Support</CardTitle>
                      <CardDescription className="text-base">Need help? We're here for you</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full justify-start bg-white/50 backdrop-blur-sm border-border/50 hover:bg-white/70 h-12"
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Help Center
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full justify-start bg-white/50 backdrop-blur-sm border-border/50 hover:bg-white/70 h-12"
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    Contact Support
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full justify-start bg-white/50 backdrop-blur-sm border-border/50 hover:bg-white/70 h-12"
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                      />
                    </svg>
                    Community Forum
                  </Button>
                </CardContent>
              </Card>
            </aside>
          </div>
        </main>
      </div>
    </AuthGuard>
  )
}
