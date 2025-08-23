"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { VideoStream } from "@/components/meet/video-stream"
import { CallControls } from "@/components/meet/call-controls"
import { ParticipantsList } from "@/components/meet/participants-list"
import { RealTimeAvatar } from "@/components/real-time/real-time-avatar"
import { LiveChat } from "@/components/real-time/live-chat"

interface VideoCallInterfaceProps {
  roomId: string
}

export function VideoCallInterface({ roomId }: VideoCallInterfaceProps) {
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isParticipantsOpen, setIsParticipantsOpen] = useState(false)
  const [currentSpeech, setCurrentSpeech] = useState("")
  const [participants, setParticipants] = useState([
    { id: "1", name: "You", isLocal: true, isMuted: false, isVideoOff: false },
    { id: "2", name: "Sarah Johnson", isLocal: false, isMuted: false, isVideoOff: false },
  ])

  useEffect(() => {
    // Simulate real-time speech recognition
    const speechTexts = [
      "Hello, how are you today?",
      "I'm doing well, thank you for asking.",
      "Would you like to discuss the project details?",
      "Yes, let's go over the main requirements.",
    ]

    let textIndex = 0
    const interval = setInterval(() => {
      setCurrentSpeech(speechTexts[textIndex % speechTexts.length])
      textIndex++
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex flex-col">
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">L</span>
            </div>
            <div>
              <h1 className="font-serif font-bold text-xl text-foreground">Linguo Meet</h1>
              <span className="text-sm text-muted-foreground">Room: {roomId}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsParticipantsOpen(!isParticipantsOpen)}
              className="bg-background/50 backdrop-blur-sm border-border/50 hover:bg-accent/10"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                />
              </svg>
              Participants ({participants.length})
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsChatOpen(!isChatOpen)}
              className="bg-background/50 backdrop-blur-sm border-border/50 hover:bg-accent/10"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              Chat
            </Button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex">
        <div className="flex-1 p-6">
          <div className="h-full grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-border/50 overflow-hidden shadow-xl bg-background/50 backdrop-blur-sm">
              <div className="aspect-video bg-gradient-to-br from-muted/50 to-muted/30 relative">
                <RealTimeAvatar
                  roomId={roomId}
                  isActive={true}
                  participantName="AI Translation"
                  currentText={currentSpeech}
                />
                <div className="absolute bottom-4 left-4">
                  <span className="bg-background/90 backdrop-blur-sm text-foreground px-3 py-2 rounded-lg text-sm font-medium shadow-lg border border-border/50">
                    <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 110 2h-1v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6H3a1 1 0 110-2h4z"
                      />
                    </svg>
                    Sign Language Translation
                  </span>
                </div>
              </div>
            </Card>

            <Card className="border-border/50 overflow-hidden shadow-xl bg-background/50 backdrop-blur-sm">
              <div className="aspect-video bg-gradient-to-br from-muted/50 to-muted/30 relative">
                <VideoStream
                  participantId="local"
                  participantName="You"
                  isLocal={true}
                  isMuted={isMuted}
                  isVideoOff={isVideoOff}
                />
              </div>
            </Card>
          </div>

          {currentSpeech && (
            <div className="mt-6 p-6 bg-background/60 backdrop-blur-sm rounded-xl border border-border/50 shadow-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 bg-gradient-to-r from-primary to-accent rounded-full animate-pulse shadow-lg"></div>
                <span className="text-sm font-semibold text-foreground">Live Speech Recognition</span>
              </div>
              <p className="text-foreground text-lg leading-relaxed">{currentSpeech}</p>
            </div>
          )}

          {participants.length > 2 && (
            <div className="mt-6 flex gap-4 overflow-x-auto pb-2">
              {participants.slice(2).map((participant) => (
                <Card
                  key={participant.id}
                  className="border-border/50 overflow-hidden flex-shrink-0 shadow-lg bg-background/50 backdrop-blur-sm"
                >
                  <div className="w-36 h-28 bg-gradient-to-br from-muted/50 to-muted/30 relative">
                    <VideoStream
                      participantId={participant.id}
                      participantName={participant.name}
                      isLocal={participant.isLocal}
                      isMuted={participant.isMuted}
                      isVideoOff={participant.isVideoOff}
                    />
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Chat Panel */}
        {isChatOpen && (
          <div className="w-80 border-l border-border/50">
            <LiveChat roomId={roomId} userId="current-user-id" userName="You" onClose={() => setIsChatOpen(false)} />
          </div>
        )}

        {/* Participants Panel */}
        {isParticipantsOpen && (
          <div className="w-72 border-l border-border/50 bg-background/50 backdrop-blur-sm">
            <ParticipantsList participants={participants} onClose={() => setIsParticipantsOpen(false)} />
          </div>
        )}
      </div>

      <div className="border-t border-border/50 bg-background/80 backdrop-blur-sm p-6 shadow-lg">
        <CallControls
          isMuted={isMuted}
          isVideoOff={isVideoOff}
          onToggleMute={() => setIsMuted(!isMuted)}
          onToggleVideo={() => setIsVideoOff(!isVideoOff)}
          onEndCall={() => {
            console.log("[v0] Ending call")
            window.location.href = "/dashboard"
          }}
        />
      </div>
    </div>
  )
}
