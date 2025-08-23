"use client"

import { useEffect, useRef, useState, useCallback } from "react"

export interface WebSocketMessage {
  type: string
  payload: any
  timestamp: number
  id: string
}

export interface WebSocketHookOptions {
  url: string
  protocols?: string[]
  onOpen?: (event: Event) => void
  onClose?: (event: CloseEvent) => void
  onError?: (event: Event) => void
  onMessage?: (message: WebSocketMessage) => void
  reconnectAttempts?: number
  reconnectInterval?: number
}

export function useWebSocket({
  url,
  protocols,
  onOpen,
  onClose,
  onError,
  onMessage,
  reconnectAttempts = 5,
  reconnectInterval = 3000,
}: WebSocketHookOptions) {
  const [connectionStatus, setConnectionStatus] = useState<"connecting" | "connected" | "disconnected" | "error">(
    "disconnected",
  )
  const [lastMessage, setLastMessage] = useState<WebSocketMessage | null>(null)
  const [messageHistory, setMessageHistory] = useState<WebSocketMessage[]>([])

  const ws = useRef<WebSocket | null>(null)
  const reconnectTimeoutId = useRef<NodeJS.Timeout | null>(null)
  const reconnectCount = useRef(0)

  const connect = useCallback(() => {
    try {
      setConnectionStatus("connecting")
      ws.current = new WebSocket(url, protocols)

      ws.current.onopen = (event) => {
        console.log("[v0] WebSocket connected")
        setConnectionStatus("connected")
        reconnectCount.current = 0
        onOpen?.(event)
      }

      ws.current.onclose = (event) => {
        console.log("[v0] WebSocket disconnected:", event.code, event.reason)
        setConnectionStatus("disconnected")
        onClose?.(event)

        // Attempt to reconnect if not a normal closure
        if (event.code !== 1000 && reconnectCount.current < reconnectAttempts) {
          reconnectCount.current++
          console.log(`[v0] Attempting to reconnect (${reconnectCount.current}/${reconnectAttempts})`)
          reconnectTimeoutId.current = setTimeout(connect, reconnectInterval)
        }
      }

      ws.current.onerror = (event) => {
        console.error("[v0] WebSocket error:", event)
        setConnectionStatus("error")
        onError?.(event)
      }

      ws.current.onmessage = (event) => {
        try {
          const message: WebSocketMessage = JSON.parse(event.data)
          console.log("[v0] WebSocket message received:", message.type)
          setLastMessage(message)
          setMessageHistory((prev) => [...prev.slice(-99), message]) // Keep last 100 messages
          onMessage?.(message)
        } catch (error) {
          console.error("[v0] Failed to parse WebSocket message:", error)
        }
      }
    } catch (error) {
      console.error("[v0] Failed to create WebSocket connection:", error)
      setConnectionStatus("error")
    }
  }, [url, protocols, onOpen, onClose, onError, onMessage, reconnectAttempts, reconnectInterval])

  const disconnect = useCallback(() => {
    if (reconnectTimeoutId.current) {
      clearTimeout(reconnectTimeoutId.current)
      reconnectTimeoutId.current = null
    }
    if (ws.current) {
      ws.current.close(1000, "Manual disconnect")
      ws.current = null
    }
  }, [])

  const sendMessage = useCallback((type: string, payload: any) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      const message: WebSocketMessage = {
        type,
        payload,
        timestamp: Date.now(),
        id: Math.random().toString(36).substring(2, 15),
      }
      ws.current.send(JSON.stringify(message))
      console.log("[v0] WebSocket message sent:", type)
      return true
    } else {
      console.warn("[v0] WebSocket not connected, message not sent:", type)
      return false
    }
  }, [])

  useEffect(() => {
    connect()
    return () => {
      disconnect()
    }
  }, [connect, disconnect])

  return {
    connectionStatus,
    lastMessage,
    messageHistory,
    sendMessage,
    connect,
    disconnect,
  }
}
