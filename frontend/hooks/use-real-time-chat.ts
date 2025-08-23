"use client"

import { useState, useCallback } from "react"
import { useWebSocket } from "@/lib/websocket"

export interface ChatMessage {
  id: string
  sender: string
  message: string
  timestamp: Date
  isLocal: boolean
  type?: "text" | "system" | "file"
}

export interface ChatParticipant {
  id: string
  name: string
  isOnline: boolean
  lastSeen?: Date
}

export function useRealTimeChat(roomId: string, userId: string, userName: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [participants, setParticipants] = useState<ChatParticipant[]>([])
  const [isTyping, setIsTyping] = useState<string[]>([])

  const { connectionStatus, sendMessage } = useWebSocket({
    url: `wss://api.linguo.com/chat/${roomId}`, // Updated API URL from SignSync to Linguo
    onMessage: (wsMessage) => {
      switch (wsMessage.type) {
        case "chat_message":
          const chatMessage: ChatMessage = {
            id: wsMessage.payload.id,
            sender: wsMessage.payload.sender,
            message: wsMessage.payload.message,
            timestamp: new Date(wsMessage.payload.timestamp),
            isLocal: wsMessage.payload.senderId === userId,
            type: wsMessage.payload.type || "text",
          }
          setMessages((prev) => [...prev, chatMessage])
          break

        case "user_joined":
          setParticipants((prev) => [
            ...prev.filter((p) => p.id !== wsMessage.payload.userId),
            {
              id: wsMessage.payload.userId,
              name: wsMessage.payload.userName,
              isOnline: true,
            },
          ])
          break

        case "user_left":
          setParticipants((prev) =>
            prev.map((p) => (p.id === wsMessage.payload.userId ? { ...p, isOnline: false, lastSeen: new Date() } : p)),
          )
          break

        case "typing_start":
          setIsTyping((prev) => [...prev.filter((id) => id !== wsMessage.payload.userId), wsMessage.payload.userId])
          break

        case "typing_stop":
          setIsTyping((prev) => prev.filter((id) => id !== wsMessage.payload.userId))
          break
      }
    },
    onOpen: () => {
      // Join the chat room
      sendMessage("join_room", { roomId, userId, userName })
    },
  })

  const sendChatMessage = useCallback(
    (message: string) => {
      const success = sendMessage("chat_message", {
        roomId,
        senderId: userId,
        sender: userName,
        message,
        timestamp: Date.now(),
        type: "text",
      })

      if (success) {
        // Optimistically add the message to local state
        const localMessage: ChatMessage = {
          id: Math.random().toString(36).substring(2, 15),
          sender: userName,
          message,
          timestamp: new Date(),
          isLocal: true,
          type: "text",
        }
        setMessages((prev) => [...prev, localMessage])
      }

      return success
    },
    [sendMessage, roomId, userId, userName],
  )

  const startTyping = useCallback(() => {
    sendMessage("typing_start", { roomId, userId })
  }, [sendMessage, roomId, userId])

  const stopTyping = useCallback(() => {
    sendMessage("typing_stop", { roomId, userId })
  }, [sendMessage, roomId, userId])

  const sendSystemMessage = useCallback((message: string) => {
    const systemMessage: ChatMessage = {
      id: Math.random().toString(36).substring(2, 15),
      sender: "System",
      message,
      timestamp: new Date(),
      isLocal: false,
      type: "system",
    }
    setMessages((prev) => [...prev, systemMessage])
  }, [])

  return {
    messages,
    participants,
    isTyping,
    connectionStatus,
    sendChatMessage,
    startTyping,
    stopTyping,
    sendSystemMessage,
  }
}
