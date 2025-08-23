"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"

export function CreateMeeting() {
  const [meetingName, setMeetingName] = useState("")
  const [isPrivate, setIsPrivate] = useState(false)
  const [enableRecording, setEnableRecording] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const router = useRouter()

  const handleCreateMeeting = async () => {
    setIsCreating(true)

    // Simulate API call to create meeting
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Generate a mock room ID
    const roomId = Math.random().toString(36).substring(2, 15)

    // Redirect to the meeting room
    router.push(`/meet/${roomId}`)
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif font-bold text-foreground mb-2">Create New Meeting</h1>
            <p className="text-muted-foreground">Set up your video call with sign language translation</p>
          </div>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-xl font-serif">Meeting Settings</CardTitle>
              <CardDescription>Configure your meeting preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="meetingName" className="text-sm font-medium">
                  Meeting Name (Optional)
                </Label>
                <Input
                  id="meetingName"
                  type="text"
                  placeholder="Enter a name for your meeting"
                  value={meetingName}
                  onChange={(e) => setMeetingName(e.target.value)}
                  className="w-full"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="private"
                    checked={isPrivate}
                    onCheckedChange={(checked) => setIsPrivate(checked as boolean)}
                  />
                  <Label htmlFor="private" className="text-sm">
                    Make this meeting private (requires invitation to join)
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="recording"
                    checked={enableRecording}
                    onCheckedChange={(checked) => setEnableRecording(checked as boolean)}
                  />
                  <Label htmlFor="recording" className="text-sm">
                    Enable meeting recording
                  </Label>
                </div>
              </div>

              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium text-foreground mb-2">Meeting Features</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Real-time 3D sign language translation
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    HD video and crystal clear audio
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Text chat and file sharing
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Screen sharing capabilities
                  </li>
                </ul>
              </div>

              <div className="flex gap-4">
                <Button variant="outline" className="flex-1 bg-transparent" onClick={() => router.back()}>
                  Cancel
                </Button>
                <Button className="flex-1" onClick={handleCreateMeeting} disabled={isCreating}>
                  {isCreating ? "Creating..." : "Create Meeting"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
