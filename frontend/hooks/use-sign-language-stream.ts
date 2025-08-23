"use client"

import { useState, useCallback, useRef } from "react"
import { useWebSocket } from "@/lib/websocket"

export interface SignLanguagePose {
  timestamp: number
  keypoints: {
    x: number
    y: number
    z: number
    confidence: number
  }[]
  handPoses: {
    left: { x: number; y: number; z: number }[]
    right: { x: number; y: number; z: number }[]
  }
  facialExpressions: {
    [key: string]: number
  }
}

export interface TranslationRequest {
  text: string
  language: string
  speed: "slow" | "normal" | "fast"
}

export function useSignLanguageStream(roomId: string) {
  const [currentPose, setCurrentPose] = useState<SignLanguagePose | null>(null)
  const [isTranslating, setIsTranslating] = useState(false)
  const [translationQueue, setTranslationQueue] = useState<string[]>([])
  const animationFrameRef = useRef<number>()

  const { connectionStatus, sendMessage } = useWebSocket({
    url: `wss://api.linguo.com/translation/${roomId}`, // Updated API URL from SignSync to Linguo
    onMessage: (wsMessage) => {
      switch (wsMessage.type) {
        case "pose_data":
          setCurrentPose(wsMessage.payload as SignLanguagePose)
          break

        case "translation_start":
          setIsTranslating(true)
          setTranslationQueue((prev) => [...prev, wsMessage.payload.text])
          break

        case "translation_complete":
          setIsTranslating(false)
          setTranslationQueue((prev) => prev.slice(1))
          break

        case "translation_error":
          console.error("[v0] Translation error:", wsMessage.payload.error)
          setIsTranslating(false)
          break
      }
    },
  })

  const requestTranslation = useCallback(
    (request: TranslationRequest) => {
      const success = sendMessage("translate_text", {
        roomId,
        ...request,
        timestamp: Date.now(),
      })

      if (success) {
        console.log(`[v0] Translation requested for: "${request.text}"`)
      }

      return success
    },
    [sendMessage, roomId],
  )

  const requestExplanation = useCallback(
    (text: string, context?: string) => {
      const success = sendMessage("explain_text", {
        roomId,
        text,
        context,
        timestamp: Date.now(),
      })

      if (success) {
        console.log(`[v0] Explanation requested for: "${text}"`)
      }

      return success
    },
    [sendMessage, roomId],
  )

  const sendAudioData = useCallback(
    (audioData: ArrayBuffer) => {
      // Convert audio data to base64 for transmission
      const base64Audio = btoa(String.fromCharCode(...new Uint8Array(audioData)))
      const success = sendMessage("audio_data", {
        roomId,
        audio: base64Audio,
        timestamp: Date.now(),
      })

      if (success) {
        console.log("[v0] Audio data sent for real-time translation")
      }

      return success
    },
    [sendMessage, roomId],
  )

  const updateAnimationSpeed = useCallback(
    (speed: "slow" | "normal" | "fast") => {
      sendMessage("animation_speed", { roomId, speed })
    },
    [sendMessage, roomId],
  )

  return {
    currentPose,
    isTranslating,
    translationQueue,
    connectionStatus,
    requestTranslation,
    requestExplanation,
    sendAudioData,
    updateAnimationSpeed,
  }
}
