"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  Phone,
  Settings,
  Users,
  MessageSquare,
  Share,
  ArrowLeft,
  Volume2,
  VolumeX,
  Send,
  Smile,
  MoreVertical,
  ImageIcon,
} from "lucide-react"
import Link from "next/link"

export default function NewMeetingPage() {
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [isAudioOn, setIsAudioOn] = useState(true)
  const [isSpeakerOn, setIsSpeakerOn] = useState(true)
  const [isTranslating, setIsTranslating] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [chatMessage, setChatMessage] = useState("")
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: "Sarah Johnson",
      message: "Hey everyone! Thanks for joining the meeting. The new Linguo features are working amazingly well! 🎉",
      timestamp: "2:30 PM",
      isOwn: false,
      avatar: "SJ",
      type: "text",
    },
    {
      id: 2,
      sender: "You",
      message: "Happy to be here! The translation is working perfectly. This is going to revolutionize communication.",
      timestamp: "2:31 PM",
      isOwn: true,
      avatar: "YU",
      type: "text",
    },
    {
      id: 3,
      sender: "Mike Chen",
      message: "This AI translation feature is incredible! The 3D animations are so smooth and natural.",
      timestamp: "2:32 PM",
      isOwn: false,
      avatar: "MC",
      type: "text",
    },
    {
      id: 4,
      sender: "Sarah Johnson",
      message: "👍",
      timestamp: "2:33 PM",
      isOwn: false,
      avatar: "SJ",
      type: "reaction",
    },
    {
      id: 5,
      sender: "You",
      message: "Should we test the document explanation feature next? I have a complex research paper we could try.",
      timestamp: "2:34 PM",
      isOwn: true,
      avatar: "YU",
      type: "text",
    },
  ])

  const [participants] = useState([
    { id: 1, name: "You", isHost: true, isVideoOn: true, isAudioOn: true },
    { id: 2, name: "Sarah Johnson", isHost: false, isVideoOn: true, isAudioOn: true },
    { id: 3, name: "Mike Chen", isHost: false, isVideoOn: false, isAudioOn: true },
  ])

  const videoRef = useRef<HTMLVideoElement>(null)
  const chatScrollRef = useRef<HTMLDivElement>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)

  useEffect(() => {
    const initCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        })
        setStream(mediaStream)
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream
        }
      } catch (error) {
        console.error("Error accessing camera:", error)
      }
    }

    initCamera()

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight
    }
  }, [chatMessages])

  const toggleVideo = () => {
    if (stream) {
      const videoTrack = stream.getVideoTracks()[0]
      if (videoTrack) {
        videoTrack.enabled = !isVideoOn
        setIsVideoOn(!isVideoOn)
      }
    }
  }

  const toggleAudio = () => {
    if (stream) {
      const audioTrack = stream.getAudioTracks()[0]
      if (audioTrack) {
        audioTrack.enabled = !isAudioOn
        setIsAudioOn(!isAudioOn)
      }
    }
  }

  const sendMessage = () => {
    if (chatMessage.trim()) {
      const newMessage = {
        id: chatMessages.length + 1,
        sender: "You",
        message: chatMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isOwn: true,
        avatar: "YU",
        type: "text" as const,
      }
      setChatMessages([...chatMessages, newMessage])
      setChatMessage("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const sendReaction = (emoji: string) => {
    const newMessage = {
      id: chatMessages.length + 1,
      sender: "You",
      message: emoji,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isOwn: true,
      avatar: "YU",
      type: "reaction" as const,
    }
    setChatMessages([...chatMessages, newMessage])
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-background/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">L</span>
                </div>
                <span className="text-xl font-bold text-foreground">Linguo Meet</span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Badge variant={isTranslating ? "default" : "secondary"} className="animate-pulse">
                {isTranslating ? "Translating..." : "Ready"}
              </Badge>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-64px)]">
        {/* Main Video Area */}
        <div className="flex-1 flex flex-col">
          {/* Video Grid */}
          <div className="flex-1 p-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
              {/* Main Video (You) */}
              <Card className="relative overflow-hidden bg-black">
                <div className="absolute inset-0">
                  {isVideoOn ? (
                    <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <div className="text-center">
                        <VideoOff className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                        <p className="text-muted-foreground">Camera is off</p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">You (Host)</Badge>
                    <div className="flex items-center space-x-2">
                      {!isAudioOn && <MicOff className="h-4 w-4 text-destructive" />}
                      {!isVideoOn && <VideoOff className="h-4 w-4 text-destructive" />}
                    </div>
                  </div>
                </div>
              </Card>

              {/* 3D Sign Language Animation Area */}
              <Card className="relative overflow-hidden">
                <CardHeader className="absolute top-4 left-4 right-4 z-10 pb-2">
                  <CardTitle className="text-lg text-white">Sign Language Translation</CardTitle>
                  <CardDescription className="text-gray-300">Real-time 3D animation of spoken words</CardDescription>
                </CardHeader>
                <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <div className="w-12 h-12 bg-primary rounded-full animate-pulse" />
                    </div>
                    <p className="text-lg font-medium mb-2">3D Avatar Ready</p>
                    <p className="text-sm text-gray-400">Waiting for speech input...</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Controls */}
          <div className="border-t border-border bg-background/95 backdrop-blur p-4">
            <div className="flex items-center justify-center space-x-4">
              <Button
                variant={isAudioOn ? "secondary" : "destructive"}
                size="lg"
                onClick={toggleAudio}
                className="rounded-full w-12 h-12 p-0"
              >
                {isAudioOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
              </Button>

              <Button
                variant={isVideoOn ? "secondary" : "destructive"}
                size="lg"
                onClick={toggleVideo}
                className="rounded-full w-12 h-12 p-0"
              >
                {isVideoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
              </Button>

              <Button
                variant={isSpeakerOn ? "secondary" : "destructive"}
                size="lg"
                onClick={() => setIsSpeakerOn(!isSpeakerOn)}
                className="rounded-full w-12 h-12 p-0"
              >
                {isSpeakerOn ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
              </Button>

              <Button variant="secondary" size="lg" className="rounded-full w-12 h-12 p-0">
                <Share className="h-5 w-5" />
              </Button>

              <Button variant="destructive" size="lg" className="rounded-full w-12 h-12 p-0">
                <Phone className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex items-center justify-center mt-4 space-x-4">
              <Button variant={isTranslating ? "default" : "outline"} onClick={() => setIsTranslating(!isTranslating)}>
                {isTranslating ? "Stop Translation" : "Start Translation"}
              </Button>
              <Button variant={showChat ? "default" : "outline"} onClick={() => setShowChat(!showChat)}>
                <MessageSquare className="h-4 w-4 mr-2" />
                Chat
                <Badge variant="destructive" className="ml-2 h-5 w-5 p-0 text-xs">
                  3
                </Badge>
              </Button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className={`${showChat ? "w-96" : "w-80"} border-l border-border bg-muted/30 flex flex-col`}>
          {/* Tab Navigation */}
          <div className="flex border-b border-border">
            <Button
              variant={!showChat ? "secondary" : "ghost"}
              className="flex-1 rounded-none"
              onClick={() => setShowChat(false)}
            >
              <Users className="h-4 w-4 mr-2" />
              Participants
            </Button>
            <Button
              variant={showChat ? "secondary" : "ghost"}
              className="flex-1 rounded-none"
              onClick={() => setShowChat(true)}
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Chat
            </Button>
          </div>

          {!showChat ? (
            /* Participants Panel */
            <div className="flex-1 p-4">
              <h3 className="font-semibold text-foreground mb-4 flex items-center">
                <Users className="h-4 w-4 mr-2" />
                Participants ({participants.length})
              </h3>
              <div className="space-y-3">
                {participants.map((participant) => (
                  <div
                    key={participant.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-background hover:bg-background/80 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="text-sm font-medium">{participant.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{participant.name}</p>
                        {participant.isHost && (
                          <Badge variant="secondary" className="text-xs">
                            Host
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      {!participant.isAudioOn && <MicOff className="h-3 w-3 text-destructive" />}
                      {!participant.isVideoOn && <VideoOff className="h-3 w-3 text-destructive" />}
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <MoreVertical className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Translation Status */}
              <div className="mt-6 pt-4 border-t border-border">
                <h3 className="font-semibold text-foreground mb-4">Translation Status</h3>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-background">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Speech Recognition</span>
                      <Badge variant="default" className="text-xs">
                        Active
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">Converting speech to text in real-time</p>
                  </div>

                  <div className="p-3 rounded-lg bg-background">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Sign Translation</span>
                      <Badge variant="secondary" className="text-xs">
                        Standby
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">Ready to translate text to sign language</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Completely redesigned modern chat interface like X/Messenger */
            <div className="flex-1 flex flex-col bg-background">
              {/* Chat Header */}
              <div className="p-4 border-b border-border bg-background">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground">Meeting Chat</h3>
                    <p className="text-sm text-muted-foreground">3 participants • Messages visible to all</p>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-hidden">
                <ScrollArea className="h-full" ref={chatScrollRef}>
                  <div className="p-4 space-y-4">
                    {chatMessages.map((message, index) => {
                      const showAvatar = index === 0 || chatMessages[index - 1].sender !== message.sender
                      const isLastFromSender =
                        index === chatMessages.length - 1 || chatMessages[index + 1].sender !== message.sender

                      return (
                        <div
                          key={message.id}
                          className={`flex items-end space-x-2 ${message.isOwn ? "flex-row-reverse space-x-reverse" : ""}`}
                        >
                          {/* Avatar */}
                          <div className={`flex-shrink-0 ${showAvatar ? "opacity-100" : "opacity-0"}`}>
                            {!message.isOwn && (
                              <Avatar className="w-8 h-8">
                                <AvatarFallback className="text-xs font-medium bg-primary/10 text-primary">
                                  {message.avatar}
                                </AvatarFallback>
                              </Avatar>
                            )}
                          </div>

                          {/* Message Content */}
                          <div className={`flex flex-col max-w-[75%] ${message.isOwn ? "items-end" : "items-start"}`}>
                            {/* Sender name and timestamp */}
                            {showAvatar && !message.isOwn && (
                              <div className="flex items-center space-x-2 mb-1 px-1">
                                <span className="text-xs font-semibold text-foreground">{message.sender}</span>
                                <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                              </div>
                            )}

                            {/* Message bubble */}
                            <div
                              className={`px-4 py-2 max-w-full break-words ${
                                message.type === "reaction"
                                  ? "text-2xl bg-transparent p-1"
                                  : message.isOwn
                                    ? "bg-primary text-primary-foreground rounded-2xl rounded-br-md"
                                    : "bg-muted text-foreground rounded-2xl rounded-bl-md"
                              } ${
                                !isLastFromSender && message.type !== "reaction"
                                  ? message.isOwn
                                    ? "rounded-br-lg"
                                    : "rounded-bl-lg"
                                  : ""
                              }`}
                            >
                              <p
                                className={`text-sm leading-relaxed ${message.type === "reaction" ? "text-center" : ""}`}
                              >
                                {message.message}
                              </p>
                            </div>

                            {/* Timestamp for own messages */}
                            {message.isOwn && isLastFromSender && message.type !== "reaction" && (
                              <span className="text-xs text-muted-foreground mt-1 px-1">{message.timestamp}</span>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </ScrollArea>
              </div>

              <div className="p-4 border-t border-border bg-background">
                {/* Quick reactions */}
                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-xs text-muted-foreground">Quick reactions:</span>
                  {["👍", "❤️", "😊", "🎉", "👏"].map((emoji) => (
                    <Button
                      key={emoji}
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-lg hover:bg-muted"
                      onClick={() => sendReaction(emoji)}
                    >
                      {emoji}
                    </Button>
                  ))}
                </div>

                {/* Message input */}
                <div className="flex items-end space-x-2">
                  <div className="flex-1 relative">
                    <div className="flex items-center space-x-1 absolute left-3 top-1/2 -translate-y-1/2 z-10">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
                      >
                        <ImageIcon className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
                      >
                        <ImageIcon className="h-4 w-4" />
                      </Button>
                    </div>
                    <Input
                      placeholder="Type a message..."
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="pl-16 pr-12 py-3 rounded-full border-2 focus:border-primary/50 bg-muted/50"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                    >
                      <Smile className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button
                    onClick={sendMessage}
                    disabled={!chatMessage.trim()}
                    size="sm"
                    className="rounded-full h-12 w-12 p-0 bg-primary hover:bg-primary/90 disabled:opacity-50"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>

                {/* Typing indicator */}
                <div className="mt-2 px-3">
                  <p className="text-xs text-muted-foreground">Sarah is typing...</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
