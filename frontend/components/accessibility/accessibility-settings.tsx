"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"

export function AccessibilitySettings() {
  const [highContrast, setHighContrast] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [screenReaderMode, setScreenReaderMode] = useState(false)
  const [fontSize, setFontSize] = useState([16])
  const [focusIndicator, setFocusIndicator] = useState("enhanced")
  const [colorBlindMode, setColorBlindMode] = useState("none")

  const handleSaveSettings = () => {
    const settings = {
      highContrast,
      reducedMotion,
      screenReaderMode,
      fontSize: fontSize[0],
      focusIndicator,
      colorBlindMode,
    }

    // Apply settings to document
    document.documentElement.style.fontSize = `${fontSize[0]}px`
    document.documentElement.classList.toggle("high-contrast", highContrast)
    document.documentElement.classList.toggle("reduced-motion", reducedMotion)
    document.documentElement.classList.toggle("screen-reader-mode", screenReaderMode)

    // Save to localStorage
    localStorage.setItem("accessibility-settings", JSON.stringify(settings))

    // Announce to screen readers
    const announcement = document.createElement("div")
    announcement.setAttribute("aria-live", "polite")
    announcement.setAttribute("aria-atomic", "true")
    announcement.className = "sr-only"
    announcement.textContent = "Accessibility settings have been saved successfully"
    document.body.appendChild(announcement)
    setTimeout(() => document.body.removeChild(announcement), 1000)
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-serif font-bold text-foreground mb-2">Accessibility Settings</h1>
            <p className="text-muted-foreground">Customize SignSync to meet your accessibility needs and preferences</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-xl font-serif">Visual Preferences</CardTitle>
                  <CardDescription>Adjust visual settings for better readability</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="high-contrast" className="text-sm font-medium">
                        High Contrast Mode
                      </Label>
                      <p className="text-xs text-muted-foreground">Increases contrast between text and background</p>
                    </div>
                    <Switch
                      id="high-contrast"
                      checked={highContrast}
                      onCheckedChange={setHighContrast}
                      aria-describedby="high-contrast-desc"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="font-size" className="text-sm font-medium">
                      Font Size: {fontSize[0]}px
                    </Label>
                    <Slider
                      id="font-size"
                      min={12}
                      max={24}
                      step={1}
                      value={fontSize}
                      onValueChange={setFontSize}
                      className="w-full"
                      aria-describedby="font-size-desc"
                    />
                    <p id="font-size-desc" className="text-xs text-muted-foreground">
                      Adjust text size for comfortable reading
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="colorblind-mode" className="text-sm font-medium">
                      Color Blind Support
                    </Label>
                    <Select value={colorBlindMode} onValueChange={setColorBlindMode}>
                      <SelectTrigger id="colorblind-mode">
                        <SelectValue placeholder="Select color blind mode" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="protanopia">Protanopia (Red-blind)</SelectItem>
                        <SelectItem value="deuteranopia">Deuteranopia (Green-blind)</SelectItem>
                        <SelectItem value="tritanopia">Tritanopia (Blue-blind)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-xl font-serif">Motion & Animation</CardTitle>
                  <CardDescription>Control motion and animation preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="reduced-motion" className="text-sm font-medium">
                        Reduce Motion
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        Minimizes animations and transitions that may cause discomfort
                      </p>
                    </div>
                    <Switch
                      id="reduced-motion"
                      checked={reducedMotion}
                      onCheckedChange={setReducedMotion}
                      aria-describedby="reduced-motion-desc"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-xl font-serif">Navigation & Focus</CardTitle>
                  <CardDescription>Enhance keyboard navigation and focus indicators</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="focus-indicator" className="text-sm font-medium">
                      Focus Indicator Style
                    </Label>
                    <Select value={focusIndicator} onValueChange={setFocusIndicator}>
                      <SelectTrigger id="focus-indicator">
                        <SelectValue placeholder="Select focus style" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="enhanced">Enhanced (Recommended)</SelectItem>
                        <SelectItem value="high-visibility">High Visibility</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="screen-reader" className="text-sm font-medium">
                        Screen Reader Optimizations
                      </Label>
                      <p className="text-xs text-muted-foreground">Enhanced support for screen reading software</p>
                    </div>
                    <Switch
                      id="screen-reader"
                      checked={screenReaderMode}
                      onCheckedChange={setScreenReaderMode}
                      aria-describedby="screen-reader-desc"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-xl font-serif">Quick Actions</CardTitle>
                  <CardDescription>Accessibility shortcuts and tools</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <span className="mr-2">⌨️</span>
                    View Keyboard Shortcuts
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <span className="mr-2">🔍</span>
                    Test Screen Reader
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <span className="mr-2">🎯</span>
                    Focus Indicator Test
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <span className="mr-2">📖</span>
                    Accessibility Guide
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-4">
            <Button variant="outline" className="bg-transparent">
              Reset to Defaults
            </Button>
            <Button onClick={handleSaveSettings}>Save Settings</Button>
          </div>
        </div>
      </main>
    </div>
  )
}
