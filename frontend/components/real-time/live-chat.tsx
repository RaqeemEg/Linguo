"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useRealTimeChat } from "@/hooks/use-real-time-chat"
import { ConnectionStatus } from "@/components/real-time/connection-status"

interface LiveChatProps {
  roomId: string
  userId: string
  userName: string
  onClose?: () => void
}

export function LiveChat({ roomId, userId, userName, onClose }: LiveChatProps) {
  const [message, setMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const typingTimeoutRef = useRef<NodeJS.Timeout>()

  const {
    messages,
    participants,
    isTyping: othersTyping,
    connectionStatus,
    sendChatMessage,
    startTyping,
    stopTyping,
  } = useRealTimeChat(roomId, userId, userName)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (!message.trim()) return

    const success = sendChatMessage(message.trim())
    if (success) {
      setMessage("")
      stopTyping()
      setIsTyping(false)
    }
  }

  const handleTyping = (value: string) => {
    setMessage(value)

    if (value && !isTyping) {
      setIsTyping(true)
      startTyping()
    }

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }

    // Set new timeout to stop typing indicator
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false)
      stopTyping()
    }, 2000)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div
      className="h-full flex flex-col bg-white/95 backdrop-blur-xl border-l border-gray-200/50"
      role="complementary"
      aria-label="Live chat"
    >
      <div className="p-4 border-b border-gray-200/50 flex items-center justify-between bg-white/90 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-md">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-sm">Chat</h3>
            <ConnectionStatus status={connectionStatus} />
          </div>
        </div>
        {onClose && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            aria-label="Close chat"
            className="hover:bg-gray-100 rounded-full w-8 h-8 p-0 text-gray-500 hover:text-gray-700"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Button>
        )}
      </div>

      <ScrollArea className="flex-1 p-3 bg-gray-50/30">
        <div className="space-y-1" role="log" aria-live="polite" aria-label="Chat messages">
          {messages.map((msg, index) => {
            const showAvatar =
              index === 0 || messages[index - 1]?.sender !== msg.sender || messages[index - 1]?.isLocal !== msg.isLocal
            const showTimestamp =
              index === messages.length - 1 ||
              messages[index + 1]?.sender !== msg.sender ||
              messages[index + 1]?.isLocal !== msg.isLocal ||
              new Date(messages[index + 1]?.timestamp).getTime() - new Date(msg.timestamp).getTime() > 300000

            return (
              <div
                key={msg.id}
                className={`flex items-end gap-2 mb-1 ${msg.isLocal ? "justify-end" : "justify-start"}`}
              >
                {!msg.isLocal && showAvatar && (
                  <div className="w-7 h-7 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0 shadow-sm">
                    {msg.sender.charAt(0).toUpperCase()}
                  </div>
                )}
                {!msg.isLocal && !showAvatar && <div className="w-7 h-7 flex-shrink-0" />}

                <div className={`flex flex-col ${msg.isLocal ? "items-end" : "items-start"} max-w-[75%]`}>
                  {msg.type === "system" ? (
                    <div className="bg-gray-200/80 text-gray-600 text-center text-xs px-3 py-1.5 rounded-full mx-auto">
                      {msg.message}
                    </div>
                  ) : (
                    <>
                      <div
                        className={`px-3 py-2 text-sm break-words shadow-sm transition-all duration-150 ${
                          msg.isLocal
                            ? "bg-blue-500 text-white rounded-2xl rounded-br-md max-w-xs hover:bg-blue-600"
                            : "bg-white text-gray-900 border border-gray-200/50 rounded-2xl rounded-bl-md shadow-sm hover:shadow-md"
                        }`}
                      >
                        {msg.message}
                      </div>
                      {showTimestamp && (
                        <div
                          className={`text-xs text-gray-500 mt-0.5 px-1 ${msg.isLocal ? "text-right" : "text-left"}`}
                        >
                          {!msg.isLocal && `${msg.sender} • `}
                          {formatTime(msg.timestamp)}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            )
          })}

          {othersTyping.length > 0 && (
            <div className="flex items-end gap-2 justify-start mb-1">
              <div className="w-7 h-7 bg-gray-400 rounded-full flex items-center justify-center shadow-sm">
                <div className="flex space-x-0.5">
                  <div className="w-1 h-1 bg-white rounded-full animate-bounce"></div>
                  <div
                    className="w-1 h-1 bg-white rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-1 h-1 bg-white rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
              <div className="bg-white border border-gray-200/50 rounded-2xl rounded-bl-md px-3 py-2 shadow-sm">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <div className="p-3 bg-white/90 backdrop-blur-sm border-t border-gray-200/50">
        <div className="flex items-center gap-2 bg-gray-100/80 rounded-full px-4 py-2.5 border border-gray-200/30">
          <Input
            value={message}
            onChange={(e) => handleTyping(e.target.value)}
            placeholder="Aa"
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1 border-0 bg-transparent focus:ring-0 focus:outline-none placeholder:text-gray-500 text-gray-900 text-sm"
            disabled={connectionStatus !== "connected"}
            aria-label="Chat message input"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!message.trim() || connectionStatus !== "connected"}
            aria-label="Send message"
            size="sm"
            className="rounded-full w-8 h-8 p-0 bg-blue-500 hover:bg-blue-600 transition-all duration-150 shadow-sm hover:shadow-md disabled:opacity-50 disabled:bg-gray-300"
          >
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </Button>
        </div>

        {participants.length > 0 && (
          <div className="mt-2 text-xs text-gray-500 text-center">
            <div className="flex items-center justify-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
              {participants.filter((p) => p.isOnline).length} online
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
