"use client"

import { Badge } from "@/components/ui/badge"

interface ConnectionStatusProps {
  status: "connecting" | "connected" | "disconnected" | "error"
  className?: string
}

export function ConnectionStatus({ status, className }: ConnectionStatusProps) {
  const getStatusConfig = () => {
    switch (status) {
      case "connected":
        return {
          variant: "default" as const,
          text: "Connected",
          color: "bg-green-500",
        }
      case "connecting":
        return {
          variant: "secondary" as const,
          text: "Connecting...",
          color: "bg-yellow-500",
        }
      case "disconnected":
        return {
          variant: "secondary" as const,
          text: "Disconnected",
          color: "bg-gray-500",
        }
      case "error":
        return {
          variant: "destructive" as const,
          text: "Connection Error",
          color: "bg-red-500",
        }
    }
  }

  const config = getStatusConfig()

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={`w-2 h-2 rounded-full ${config.color}`} aria-hidden="true" />
      <Badge variant={config.variant} className="text-xs">
        {config.text}
      </Badge>
    </div>
  )
}
