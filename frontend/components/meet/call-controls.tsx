"use client"

import { Button } from "@/components/ui/button"

interface CallControlsProps {
  isMuted: boolean
  isVideoOff: boolean
  onToggleMute: () => void
  onToggleVideo: () => void
  onEndCall: () => void
}

export function CallControls({ isMuted, isVideoOff, onToggleMute, onToggleVideo, onEndCall }: CallControlsProps) {
  return (
    <div className="flex items-center justify-center gap-4">
      <Button
        variant={isMuted ? "destructive" : "outline"}
        size="lg"
        onClick={onToggleMute}
        className="w-12 h-12 rounded-full p-0 hover:scale-105 transition-transform"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isMuted ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
            />
          )}
        </svg>
      </Button>

      <Button
        variant={isVideoOff ? "destructive" : "outline"}
        size="lg"
        onClick={onToggleVideo}
        className="w-12 h-12 rounded-full p-0 hover:scale-105 transition-transform"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isVideoOff ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          )}
        </svg>
      </Button>

      <Button
        variant="outline"
        size="lg"
        className="w-12 h-12 rounded-full p-0 hover:scale-105 transition-transform bg-transparent"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      </Button>

      <Button
        variant="outline"
        size="lg"
        className="w-12 h-12 rounded-full p-0 hover:scale-105 transition-transform bg-transparent"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      </Button>

      <Button
        variant="destructive"
        size="lg"
        onClick={onEndCall}
        className="w-12 h-12 rounded-full p-0 hover:scale-105 transition-transform"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 8l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 3l1.5 1.5m0 0L6 6m-1.5-1.5L3 6m1.5-1.5L6 3m7.5 13.5L12 21l-1.5-3.5L9 16.5l1.5-1.5L12 16.5l1.5-1.5L15 16.5l-1.5 1.5z"
          />
        </svg>
      </Button>
    </div>
  )
}
