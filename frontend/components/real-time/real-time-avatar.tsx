"use client"

import { useEffect, useRef } from "react"
import { useSignLanguageStream } from "@/hooks/use-sign-language-stream"
import { Button } from "@/components/ui/button"
import { ConnectionStatus } from "@/components/real-time/connection-status"

interface RealTimeAvatarProps {
  roomId: string
  isActive: boolean
  participantName: string
  currentText?: string
}

export function RealTimeAvatar({ roomId, isActive, participantName, currentText }: RealTimeAvatarProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number>()

  const { currentPose, isTranslating, translationQueue, connectionStatus, requestTranslation, updateAnimationSpeed } =
    useSignLanguageStream(roomId)

  useEffect(() => {
    if (!canvasRef.current || !isActive) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    let frame = 0

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      ctx.save()
      ctx.translate(centerX, centerY)

      // Use real pose data if available, otherwise use animated placeholder
      if (currentPose) {
        // Render actual pose data
        ctx.strokeStyle = "#dc2626"
        ctx.lineWidth = 2
        ctx.lineCap = "round"

        // Draw keypoints and connections based on real pose data
        currentPose.keypoints.forEach((point, index) => {
          if (point.confidence > 0.5) {
            ctx.beginPath()
            ctx.arc(point.x - centerX, point.y - centerY, 3, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(220, 38, 38, ${point.confidence})`
            ctx.fill()
          }
        })

        // Draw hand poses
        if (currentPose.handPoses.left.length > 0) {
          ctx.strokeStyle = "#dc2626"
          ctx.beginPath()
          currentPose.handPoses.left.forEach((point, index) => {
            if (index === 0) {
              ctx.moveTo(point.x - centerX, point.y - centerY)
            } else {
              ctx.lineTo(point.x - centerX, point.y - centerY)
            }
          })
          ctx.stroke()
        }

        if (currentPose.handPoses.right.length > 0) {
          ctx.strokeStyle = "#dc2626"
          ctx.beginPath()
          currentPose.handPoses.right.forEach((point, index) => {
            if (index === 0) {
              ctx.moveTo(point.x - centerX, point.y - centerY)
            } else {
              ctx.lineTo(point.x - centerX, point.y - centerY)
            }
          })
          ctx.stroke()
        }
      } else {
        // Fallback animated placeholder
        ctx.strokeStyle = "#dc2626"
        ctx.lineWidth = 3
        ctx.lineCap = "round"

        // Head
        ctx.beginPath()
        ctx.arc(0, -60, 20, 0, Math.PI * 2)
        ctx.stroke()

        // Body
        ctx.beginPath()
        ctx.moveTo(0, -40)
        ctx.lineTo(0, 40)
        ctx.stroke()

        // Animated arms for signing
        const armAngle = Math.sin(frame * 0.1) * 0.8
        const armAngle2 = Math.cos(frame * 0.12) * 0.6

        // Left arm
        ctx.beginPath()
        ctx.moveTo(0, -20)
        ctx.lineTo(-30 + Math.cos(armAngle) * 10, 5 + Math.sin(armAngle) * 10)
        ctx.stroke()

        // Right arm
        ctx.beginPath()
        ctx.moveTo(0, -20)
        ctx.lineTo(30 + Math.cos(armAngle2) * 10, 5 + Math.sin(armAngle2) * 10)
        ctx.stroke()

        // Legs
        ctx.beginPath()
        ctx.moveTo(0, 40)
        ctx.lineTo(-20, 80)
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(0, 40)
        ctx.lineTo(20, 80)
        ctx.stroke()
      }

      ctx.restore()

      frame++
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    if (isActive) {
      animate()
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isActive, currentPose])

  const handleTranslateText = () => {
    if (currentText) {
      requestTranslation({
        text: currentText,
        language: "ASL",
        speed: "normal",
      })
    }
  }

  return (
    <div className="w-full h-full relative bg-gradient-to-br from-muted to-muted/50 rounded-lg overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full" style={{ display: isActive ? "block" : "none" }} />

      {!isActive && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 bg-accent rounded-sm"></div>
            </div>
            <p>3D Avatar Inactive</p>
          </div>
        </div>
      )}

      {/* Connection Status Overlay */}
      <div className="absolute top-2 right-2">
        <ConnectionStatus status={connectionStatus} />
      </div>

      {/* Translation Status */}
      {isTranslating && (
        <div className="absolute bottom-2 left-2 right-2">
          <div className="bg-background/90 text-foreground px-3 py-2 rounded-lg text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
              <span>Translating...</span>
            </div>
            {translationQueue.length > 0 && (
              <div className="text-xs text-muted-foreground mt-1">Queue: {translationQueue.length} items</div>
            )}
          </div>
        </div>
      )}

      {/* Participant Name */}
      <div className="absolute bottom-2 left-2 bg-background/80 text-foreground px-2 py-1 rounded text-xs">
        {participantName}
      </div>

      {/* Controls */}
      {currentText && (
        <div className="absolute top-2 left-2">
          <Button size="sm" onClick={handleTranslateText} disabled={isTranslating}>
            Translate
          </Button>
        </div>
      )}
    </div>
  )
}
