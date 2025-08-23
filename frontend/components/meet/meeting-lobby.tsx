"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"

export function MeetingLobby() {
  const [meetingId, setMeetingId] = useState("")

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-serif font-bold text-foreground mb-4">SignSync Meet</h1>
            <p className="text-xl text-muted-foreground">
              Connect with others through AI-powered sign language translation
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-2xl font-serif">Start New Meeting</CardTitle>
                <CardDescription>Create a new video call room and invite others to join</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-6">
                  <div className="text-center text-muted-foreground">
                    <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <div className="w-8 h-8 bg-accent rounded-sm"></div>
                    </div>
                    <p>Your camera preview will appear here</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    Test Camera
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    Test Microphone
                  </Button>
                </div>

                <Link href="/meet/new">
                  <Button className="w-full" size="lg">
                    Start New Meeting
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-2xl font-serif">Join Meeting</CardTitle>
                <CardDescription>Enter a meeting ID to join an existing video call</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="meetingId" className="text-sm font-medium">
                      Meeting ID
                    </Label>
                    <Input
                      id="meetingId"
                      type="text"
                      placeholder="Enter meeting ID (e.g., 123-456-789)"
                      value={meetingId}
                      onChange={(e) => setMeetingId(e.target.value)}
                      className="w-full"
                    />
                  </div>

                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-medium text-foreground mb-2">Before you join:</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                        Ensure your camera and microphone are working
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                        Check your internet connection
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                        Find a quiet, well-lit space
                      </li>
                    </ul>
                  </div>

                  <Button
                    className="w-full"
                    size="lg"
                    disabled={!meetingId.trim()}
                    onClick={() => {
                      if (meetingId.trim()) {
                        window.location.href = `/meet/${meetingId.trim()}`
                      }
                    }}
                  >
                    Join Meeting
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-xl font-serif">How SignSync Meet Works</CardTitle>
                <CardDescription>Understanding our AI-powered sign language translation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <div className="w-6 h-6 bg-accent rounded-sm"></div>
                    </div>
                    <h4 className="font-medium text-foreground mb-2">Real-time Translation</h4>
                    <p className="text-sm text-muted-foreground">
                      Spoken words are instantly converted to 3D sign language animations
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <div className="w-6 h-6 bg-accent rounded-sm"></div>
                    </div>
                    <h4 className="font-medium text-foreground mb-2">Bidirectional Support</h4>
                    <p className="text-sm text-muted-foreground">
                      Both deaf and hearing participants can communicate naturally
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <div className="w-6 h-6 bg-accent rounded-sm"></div>
                    </div>
                    <h4 className="font-medium text-foreground mb-2">High Quality</h4>
                    <p className="text-sm text-muted-foreground">
                      Crystal clear video and accurate sign language interpretation
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
