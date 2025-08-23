"use client"

import { useEffect, useRef } from "react"

interface SignLanguageAvatarProps {
  isActive: boolean
  participantName: string
}

export function SignLanguageAvatar({ isActive, participantName }: SignLanguageAvatarProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current || !isActive) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Simple animation placeholder
    let animationFrame: number
    let rotation = 0

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw a simple animated figure as placeholder for 3D avatar
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      ctx.save()
      ctx.translate(centerX, centerY)
      ctx.rotate(rotation * 0.01)

      // Draw simple stick figure
      ctx.strokeStyle = "#dc2626" // accent color
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

      // Arms (animated)
      const armAngle = Math.sin(rotation * 0.1) * 0.5
      ctx.beginPath()
      ctx.moveTo(0, -20)
      ctx.lineTo(-30 + Math.cos(armAngle) * 10, 0 + Math.sin(armAngle) * 10)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(0, -20)
      ctx.lineTo(30 + Math.cos(armAngle + Math.PI) * 10, 0 + Math.sin(armAngle + Math.PI) * 10)
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

      ctx.restore()

      rotation++
      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [isActive])

  return (
    <div className="w-full h-full relative bg-gradient-to-br from-muted to-muted/50">
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
      <div className="absolute bottom-2 left-2 bg-background/80 text-foreground px-2 py-1 rounded text-xs">
        {participantName}
      </div>
    </div>
  )
}
