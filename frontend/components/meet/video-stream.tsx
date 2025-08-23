"use client"

interface VideoStreamProps {
  participantId: string
  participantName: string
  isLocal: boolean
  isMuted: boolean
  isVideoOff: boolean
}

export function VideoStream({ participantId, participantName, isLocal, isMuted, isVideoOff }: VideoStreamProps) {
  return (
    <div className="w-full h-full relative bg-gradient-to-br from-muted to-muted/50">
      {!isVideoOff ? (
        <div className="w-full h-full bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 bg-accent rounded-sm"></div>
            </div>
            <p>Camera Feed</p>
          </div>
        </div>
      ) : (
        <div className="w-full h-full bg-muted flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <div className="w-16 h-16 bg-muted-foreground/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📷</span>
            </div>
            <p>Camera Off</p>
          </div>
        </div>
      )}

      {/* Participant Info */}
      <div className="absolute bottom-2 left-2 bg-background/80 text-foreground px-2 py-1 rounded text-xs flex items-center gap-1">
        <span>{participantName}</span>
        {isMuted && <span className="text-accent">🔇</span>}
      </div>

      {/* Local indicator */}
      {isLocal && (
        <div className="absolute top-2 right-2 bg-accent text-accent-foreground px-2 py-1 rounded text-xs">You</div>
      )}
    </div>
  )
}
