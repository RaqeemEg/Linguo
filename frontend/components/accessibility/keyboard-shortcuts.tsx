"use client"

import { useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function KeyboardShortcuts() {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Alt + M: Go to main content
      if (event.altKey && event.key === "m") {
        event.preventDefault()
        const mainContent = document.getElementById("main-content")
        if (mainContent) {
          mainContent.focus()
          mainContent.scrollIntoView({ behavior: "smooth" })
        }
      }

      // Alt + N: Go to navigation
      if (event.altKey && event.key === "n") {
        event.preventDefault()
        const navigation = document.querySelector("nav")
        if (navigation) {
          const firstLink = navigation.querySelector("a, button")
          if (firstLink instanceof HTMLElement) {
            firstLink.focus()
          }
        }
      }

      // Alt + S: Go to search
      if (event.altKey && event.key === "s") {
        event.preventDefault()
        const searchInput = document.querySelector('input[type="search"], input[placeholder*="search" i]')
        if (searchInput instanceof HTMLElement) {
          searchInput.focus()
        }
      }

      // Escape: Close modals/overlays
      if (event.key === "Escape") {
        const closeButtons = document.querySelectorAll('[aria-label="Close"], [data-close]')
        const visibleCloseButton = Array.from(closeButtons).find((button) => {
          const element = button as HTMLElement
          return element.offsetParent !== null // Check if visible
        })
        if (visibleCloseButton instanceof HTMLElement) {
          visibleCloseButton.click()
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="text-lg font-serif">Keyboard Shortcuts</CardTitle>
        <CardDescription>Navigate SignSync efficiently using your keyboard</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <h4 className="font-medium text-foreground">Navigation</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Skip to main content</span>
                <kbd className="px-2 py-1 bg-muted rounded text-xs">Alt + M</kbd>
              </div>
              <div className="flex justify-between">
                <span>Go to navigation</span>
                <kbd className="px-2 py-1 bg-muted rounded text-xs">Alt + N</kbd>
              </div>
              <div className="flex justify-between">
                <span>Focus search</span>
                <kbd className="px-2 py-1 bg-muted rounded text-xs">Alt + S</kbd>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <h4 className="font-medium text-foreground">Actions</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Close modal/overlay</span>
                <kbd className="px-2 py-1 bg-muted rounded text-xs">Escape</kbd>
              </div>
              <div className="flex justify-between">
                <span>Activate button/link</span>
                <kbd className="px-2 py-1 bg-muted rounded text-xs">Enter</kbd>
              </div>
              <div className="flex justify-between">
                <span>Navigate elements</span>
                <kbd className="px-2 py-1 bg-muted rounded text-xs">Tab</kbd>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
