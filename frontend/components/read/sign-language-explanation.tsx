"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface SignLanguageExplanationProps {
  isActive: boolean
  explanationText: string
  selectedText: string
}

export function SignLanguageExplanation({ isActive, explanationText, selectedText }: SignLanguageExplanationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current || !isActive) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Simple animation for sign language avatar
    let animationFrame: number
    let frame = 0

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      ctx.save()
      ctx.translate(centerX, centerY)

      // Draw animated sign language avatar
      ctx.strokeStyle = "#dc2626" // accent color
      ctx.lineWidth = 2
      ctx.lineCap = "round"

      // Head
      ctx.beginPath()
      ctx.arc(0, -40, 15, 0, Math.PI * 2)
      ctx.stroke()

      // Body
      ctx.beginPath()
      ctx.moveTo(0, -25)
      ctx.lineTo(0, 25)
      ctx.stroke()

      // Animated arms for signing
      const armAngle = Math.sin(frame * 0.1) * 0.8
      const armAngle2 = Math.cos(frame * 0.12) * 0.6

      // Left arm
      ctx.beginPath()
      ctx.moveTo(0, -10)
      ctx.lineTo(-20 + Math.cos(armAngle) * 8, 5 + Math.sin(armAngle) * 8)
      ctx.stroke()

      // Right arm
      ctx.beginPath()
      ctx.moveTo(0, -10)
      ctx.lineTo(20 + Math.cos(armAngle2) * 8, 5 + Math.sin(armAngle2) * 8)
      ctx.stroke()

      // Legs
      ctx.beginPath()
      ctx.moveTo(0, 25)
      ctx.lineTo(-12, 50)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(0, 25)
      ctx.lineTo(12, 50)
      ctx.stroke()

      ctx.restore()

      frame++
      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [isActive])

  if (!isActive) {
    return (
      <Card className="border-border">
        <CardContent className="py-12">
          <div className="text-center text-muted-foreground">
            <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 bg-muted-foreground/50 rounded-sm"></div>
            </div>
            <p className="text-sm">Select text in the document to see a sign language explanation</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-lg font-serif">Sign Language Translation</CardTitle>
          <CardDescription>AI-powered explanation of selected text</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="aspect-square bg-gradient-to-br from-muted to-muted/50 rounded-lg mb-4 relative">
            <canvas ref={canvasRef} className="w-full h-full rounded-lg" />
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-foreground">Selected Text:</h4>
            <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">{selectedText}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-base font-serif">Simplified Explanation</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground leading-relaxed">
            This section explains the legal terms in simpler language. The selected text contains important information
            about your rights and responsibilities when using this service.
          </p>
          <div className="mt-4 flex gap-2">
            <Button size="sm" variant="outline" className="bg-transparent">
              Replay Animation
            </Button>
            <Button size="sm" variant="outline" className="bg-transparent">
              Slow Down
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
