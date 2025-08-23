"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { DocumentContent } from "@/components/read/document-content"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { RealTimeAvatar } from "@/components/real-time/real-time-avatar"
import { AriaLiveRegion } from "@/components/accessibility/aria-live-region"

interface DocumentViewerProps {
  documentId: string
}

export function DocumentViewer({ documentId }: DocumentViewerProps) {
  const [selectedText, setSelectedText] = useState("")
  const [isExplanationActive, setIsExplanationActive] = useState(false)
  const [explanationText, setExplanationText] = useState("")
  const [liveMessage, setLiveMessage] = useState("")
  const documentRef = useRef<HTMLDivElement>(null)

  const handleTextSelection = () => {
    const selection = window.getSelection()
    if (selection && selection.toString().trim()) {
      setSelectedText(selection.toString().trim())
    }
  }

  const handleRequestExplanation = async () => {
    if (!selectedText) return

    setIsExplanationActive(true)
    setExplanationText(selectedText)
    setLiveMessage(`Generating sign language explanation for: ${selectedText}`)

    // Simulate API call to get explanation
    console.log(`[v0] Requesting explanation for: "${selectedText}"`)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setLiveMessage("Sign language explanation is ready")
  }

  const handleClearSelection = () => {
    setSelectedText("")
    setIsExplanationActive(false)
    setExplanationText("")
    setLiveMessage("")
    window.getSelection()?.removeAllRanges()
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <AriaLiveRegion message={liveMessage} />

      <main className="flex-1 flex">
        {/* Document Content */}
        <div className="flex-1 border-r border-border">
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-serif font-semibold text-foreground">Legal Contract Terms</h1>
                <p className="text-sm text-muted-foreground">Document ID: {documentId}</p>
              </div>
              <div className="flex items-center gap-2">
                {selectedText && (
                  <Button size="sm" onClick={handleRequestExplanation}>
                    Explain Selection
                  </Button>
                )}
                <Button variant="outline" size="sm" onClick={handleClearSelection} className="bg-transparent">
                  Clear
                </Button>
              </div>
            </div>
          </div>

          <ScrollArea className="h-[calc(100vh-140px)]">
            <div ref={documentRef} className="p-6" onMouseUp={handleTextSelection}>
              <DocumentContent selectedText={selectedText} />
            </div>
          </ScrollArea>
        </div>

        {/* Real-time Sign Language Explanation Panel */}
        <div className="w-96 bg-background">
          <div className="p-4 border-b border-border">
            <h2 className="text-lg font-serif font-semibold text-foreground">Real-time Sign Language Explanation</h2>
            <p className="text-sm text-muted-foreground">
              {isExplanationActive ? "Explaining selected text" : "Select text to see explanation"}
            </p>
          </div>

          <div className="p-4">
            <div className="aspect-square bg-gradient-to-br from-muted to-muted/50 rounded-lg mb-4 relative">
              <RealTimeAvatar
                roomId={`document-${documentId}`}
                isActive={isExplanationActive}
                participantName="AI Explanation"
                currentText={explanationText}
              />
            </div>

            {selectedText && (
              <div className="space-y-2">
                <h4 className="font-medium text-foreground">Selected Text:</h4>
                <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">{selectedText}</p>
                <div className="text-sm text-muted-foreground">
                  <p>
                    This section explains the legal terms in simpler language. The selected text contains important
                    information about your rights and responsibilities.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
