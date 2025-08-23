"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"

export function JoinMeeting() {
  const [meetingId, setMeetingId] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [isJoining, setIsJoining] = useState(false)
  const router = useRouter()

  const handleJoinMeeting = async () => {
    if (!meetingId.trim()) return

    setIsJoining(true)

    // Simulate API call to join meeting
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Redirect to the meeting room
    router.push(`/meet/${meetingId.trim()}`)
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif font-bold text-foreground mb-2">Join Meeting</h1>
            <p className="text-muted-foreground">Enter the meeting details to join the video call</p>
          </div>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-xl font-serif">Meeting Details</CardTitle>
              <CardDescription>Provide the meeting ID and your display name</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="meetingId" className="text-sm font-medium">
                  Meeting ID *
                </Label>
                <Input
                  id="meetingId"
                  type="text"
                  placeholder="Enter meeting ID (e.g., 123-456-789)"
                  value={meetingId}
                  onChange={(e) => setMeetingId(e.target.value)}
                  className="w-full"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="displayName" className="text-sm font-medium">
                  Your Name (Optional)
                </Label>
                <Input
                  id="displayName"
                  type="text"
                  placeholder="How others will see you"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full"
                />
              </div>

              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium text-foreground mb-2">Before joining:</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Test your camera and microphone
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Ensure stable internet connection
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Find a quiet, well-lit environment
                  </li>
                </ul>
              </div>

              <div className="flex gap-4">
                <Button variant="outline" className="flex-1 bg-transparent" onClick={() => router.back()}>
                  Cancel
                </Button>
                <Button className="flex-1" onClick={handleJoinMeeting} disabled={!meetingId.trim() || isJoining}>
                  {isJoining ? "Joining..." : "Join Meeting"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
