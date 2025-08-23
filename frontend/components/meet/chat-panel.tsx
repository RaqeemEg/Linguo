"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

interface ChatPanelProps {
  onClose: () => void
}

interface ChatMessage {
  id: string
  sender: string
  message: string
  timestamp: Date
  isLocal: boolean
}

export function ChatPanel({ onClose }: ChatPanelProps) {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      sender: "Sarah Johnson",
      message: "Hello! Can you see the sign language translation?",
      timestamp: new Date(Date.now() - 300000),
      isLocal: false,
    },
    {
      id: "2",
      sender: "You",
      message: "Yes, it's working perfectly! This is amazing.",
      timestamp: new Date(Date.now() - 240000),
      isLocal: true,
    },
  ])

  const handleSendMessage = () => {
    if (!message.trim()) return

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: "You",
      message: message.trim(),
      timestamp: new Date(),
      isLocal: true,
    }

    setMessages([...messages, newMessage])
    setMessage("")
  }

  return (
    <div className="h-full flex flex-col bg-background">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h3 className="font-serif font-semibold text-foreground">Chat</h3>
        <Button variant="ghost" size="sm" onClick={onClose}>
          ✕
        </Button>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.isLocal ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  msg.isLocal ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                <div className="text-xs opacity-70 mb-1">
                  {msg.sender} • {msg.timestamp.toLocaleTimeString()}
                </div>
                <div className="text-sm">{msg.message}</div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-border">
        <div className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1"
          />
          <Button onClick={handleSendMessage} disabled={!message.trim()}>
            Send
          </Button>
        </div>
      </div>
    </div>
  )
}
