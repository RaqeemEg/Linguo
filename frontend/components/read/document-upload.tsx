"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"

export function DocumentUpload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [documentTitle, setDocumentTitle] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [dragActive, setDragActive] = useState(false)
  const router = useRouter()

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setDragActive(false)

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        const file = e.dataTransfer.files[0]
        setSelectedFile(file)
        if (!documentTitle) {
          setDocumentTitle(file.name.replace(/\.[^/.]+$/, ""))
        }
      }
    },
    [documentTitle],
  )

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setSelectedFile(file)
      if (!documentTitle) {
        setDocumentTitle(file.name.replace(/\.[^/.]+$/, ""))
      }
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) return

    setIsUploading(true)
    setUploadProgress(0)

    // Simulate file upload with progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 10
      })
    }, 200)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2500))

    // Redirect to document viewer
    const mockDocumentId = Math.random().toString(36).substring(2, 15)
    router.push(`/read/${mockDocumentId}`)
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif font-bold text-foreground mb-2">Upload Document</h1>
            <p className="text-muted-foreground">
              Upload a document to analyze with AI-powered sign language explanations
            </p>
          </div>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-xl font-serif">Document Details</CardTitle>
              <CardDescription>Provide information about your document</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium">
                  Document Title
                </Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="Enter a title for your document"
                  value={documentTitle}
                  onChange={(e) => setDocumentTitle(e.target.value)}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Upload File</Label>
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    dragActive
                      ? "border-accent bg-accent/5"
                      : selectedFile
                        ? "border-accent bg-accent/5"
                        : "border-border hover:border-accent/50"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  {selectedFile ? (
                    <div className="space-y-2">
                      <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mx-auto">
                        <div className="w-6 h-6 bg-accent rounded-sm"></div>
                      </div>
                      <p className="font-medium text-foreground">{selectedFile.name}</p>
                      <p className="text-sm text-muted-foreground">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedFile(null)}
                        className="bg-transparent"
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center mx-auto">
                        <div className="w-6 h-6 bg-muted-foreground/50 rounded-sm"></div>
                      </div>
                      <div>
                        <p className="text-foreground font-medium mb-1">Drop your file here, or click to browse</p>
                        <p className="text-sm text-muted-foreground">Supports PDF, TXT, DOCX files up to 10MB</p>
                      </div>
                      <input
                        type="file"
                        accept=".pdf,.txt,.docx,.md"
                        onChange={handleFileSelect}
                        className="hidden"
                        id="file-upload"
                      />
                      <label htmlFor="file-upload">
                        <Button variant="outline" className="bg-transparent" asChild>
                          <span>Choose File</span>
                        </Button>
                      </label>
                    </div>
                  )}
                </div>
              </div>

              {isUploading && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Uploading and processing...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} className="w-full" />
                </div>
              )}

              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium text-foreground mb-2">What happens next?</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Your document will be securely processed
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    AI will analyze the content for complex terms
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    You can highlight text for sign language explanations
                  </li>
                </ul>
              </div>

              <div className="flex gap-4">
                <Button variant="outline" className="flex-1 bg-transparent" onClick={() => router.back()}>
                  Cancel
                </Button>
                <Button
                  className="flex-1"
                  onClick={handleUpload}
                  disabled={!selectedFile || !documentTitle.trim() || isUploading}
                >
                  {isUploading ? "Processing..." : "Upload & Analyze"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
