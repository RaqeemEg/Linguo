"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Participant {
  id: string
  name: string
  isLocal: boolean
  isMuted: boolean
  isVideoOff: boolean
}

interface ParticipantsListProps {
  participants: Participant[]
  onClose: () => void
}

export function ParticipantsList({ participants, onClose }: ParticipantsListProps) {
  return (
    <div className="h-full flex flex-col bg-background">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h3 className="font-serif font-semibold text-foreground">Participants ({participants.length})</h3>
        <Button variant="ghost" size="sm" onClick={onClose}>
          ✕
        </Button>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-2">
          {participants.map((participant) => (
            <div
              key={participant.id}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-medium">{participant.name.charAt(0).toUpperCase()}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {participant.name}
                  {participant.isLocal && " (You)"}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-xs ${participant.isMuted ? "text-destructive" : "text-muted-foreground"}`}>
                    {participant.isMuted ? "🔇 Muted" : "🎤 Unmuted"}
                  </span>
                  <span className={`text-xs ${participant.isVideoOff ? "text-destructive" : "text-muted-foreground"}`}>
                    {participant.isVideoOff ? "📷 Video Off" : "📹 Video On"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-border">
        <Button variant="outline" size="sm" className="w-full bg-transparent">
          Invite Others
        </Button>
      </div>
    </div>
  )
}
