"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Upload, FileText, ArrowLeft, CheckCircle, AlertCircle, Loader2, X, Cloud, Zap, Shield } from "lucide-react"
import Link from "next/link"

export default function DocumentUploadPage() {
  const [dragActive, setDragActive] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)
  const [uploadComplete, setUploadComplete] = useState(false)
  const [documentTitle, setDocumentTitle] = useState("")
  const [documentDescription, setDocumentDescription] = useState("")

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const newFiles = Array.from(e.dataTransfer.files)
      setFiles((prev) => [...prev, ...newFiles])
    }
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setFiles((prev) => [...prev, ...newFiles])
    }
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleUpload = async () => {
    if (files.length === 0) return

    setUploading(true)

    // Simulate upload process
    await new Promise((resolve) => setTimeout(resolve, 3000))

    setUploading(false)
    setUploadComplete(true)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  if (uploadComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="border-b border-border/50 bg-background/80 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center space-x-4">
                <Link href="/dashboard">
                  <Button variant="ghost" size="sm" className="group">
                    <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Dashboard
                  </Button>
                </Link>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-primary-foreground font-bold text-xl">L</span>
                  </div>
                  <div>
                    <span className="text-2xl font-bold text-foreground tracking-tight">Linguo Read</span>
                    <div className="text-xs text-muted-foreground font-medium">Document Upload</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Card className="text-center border-2 shadow-2xl">
            <CardContent className="p-12">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-4">Upload Complete!</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
                Your document has been successfully processed and is ready for AI-powered analysis.
              </p>
              <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
                <Link href="/documents/analyze">
                  <Button size="lg" className="w-full sm:w-auto shadow-lg hover:shadow-xl transition-all duration-200">
                    Start Analysis
                  </Button>
                </Link>
                <Link href="/documents">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
                    View All Documents
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Enhanced Header */}
      <div className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="group">
                  <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                  Back to Dashboard
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-primary-foreground font-bold text-xl">L</span>
                </div>
                <div>
                  <span className="text-2xl font-bold text-foreground tracking-tight">Linguo Read</span>
                  <div className="text-xs text-muted-foreground font-medium">Document Upload</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4 tracking-tight">Upload Your Document</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Upload any document to get AI-powered explanations in sign language. Our advanced system supports multiple
            formats and provides instant analysis.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Enhanced Upload Area */}
          <Card className="border-2 hover:border-primary/20 transition-all duration-300 shadow-lg">
            <CardHeader className="pb-6">
              <CardTitle className="text-2xl flex items-center">
                <Cloud className="h-6 w-6 mr-3 text-primary" />
                Select Document
              </CardTitle>
              <CardDescription className="text-base">
                Drag and drop your files or click to browse. Supports PDF, DOCX, TXT up to 10MB
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
                  dragActive
                    ? "border-primary bg-primary/5 scale-105"
                    : "border-border hover:border-primary/50 hover:bg-muted/30"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Upload className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Drop your document here</h3>
                <p className="text-muted-foreground mb-6">or click the button below to browse your files</p>
                <Input
                  type="file"
                  accept=".pdf,.docx,.txt"
                  multiple
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                />
                <Label htmlFor="file-upload">
                  <Button
                    variant="outline"
                    size="lg"
                    className="cursor-pointer bg-transparent shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <Upload className="h-5 w-5 mr-2" />
                    Browse Files
                  </Button>
                </Label>
              </div>

              {/* Enhanced File List */}
              {files.length > 0 && (
                <div className="mt-8 space-y-4">
                  <h4 className="font-semibold text-foreground text-lg">Selected Files ({files.length})</h4>
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-xl border border-border hover:border-primary/20 hover:bg-muted/30 transition-all duration-200 group"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                          <FileText className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{file.name}</p>
                          <p className="text-sm text-muted-foreground">{formatFileSize(file.size)}</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(index)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Enhanced Document Details */}
          <Card className="border-2 hover:border-primary/20 transition-all duration-300 shadow-lg">
            <CardHeader className="pb-6">
              <CardTitle className="text-2xl flex items-center">
                <FileText className="h-6 w-6 mr-3 text-primary" />
                Document Details
              </CardTitle>
              <CardDescription className="text-base">
                Add metadata to help organize and optimize your document analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="title" className="text-base font-medium">
                  Document Title
                </Label>
                <Input
                  id="title"
                  placeholder="Enter a descriptive title for your document"
                  value={documentTitle}
                  onChange={(e) => setDocumentTitle(e.target.value)}
                  className="h-12 text-base"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="description" className="text-base font-medium">
                  Description (Optional)
                </Label>
                <Textarea
                  id="description"
                  placeholder="Brief description of the document content and purpose"
                  value={documentDescription}
                  onChange={(e) => setDocumentDescription(e.target.value)}
                  rows={4}
                  className="text-base resize-none"
                />
              </div>

              <div className="space-y-4">
                <Label className="text-base font-medium">Processing Options</Label>
                <div className="space-y-4 p-4 rounded-xl bg-muted/30 border border-border">
                  <div className="flex items-center space-x-3">
                    <input type="checkbox" id="extract-text" defaultChecked className="rounded w-4 h-4" />
                    <Label htmlFor="extract-text" className="text-sm font-medium">
                      Extract and analyze text content
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <input type="checkbox" id="generate-summary" defaultChecked className="rounded w-4 h-4" />
                    <Label htmlFor="generate-summary" className="text-sm font-medium">
                      Generate intelligent document summary
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <input type="checkbox" id="enable-explanations" defaultChecked className="rounded w-4 h-4" />
                    <Label htmlFor="enable-explanations" className="text-sm font-medium">
                      Enable AI-powered sign language explanations
                    </Label>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <Button
                  onClick={handleUpload}
                  disabled={files.length === 0 || uploading}
                  className="w-full h-12 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  {uploading ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Processing Document...
                    </>
                  ) : (
                    <>
                      <Upload className="h-5 w-5 mr-2" />
                      Upload & Process Document
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Processing Status */}
        {uploading && (
          <Card className="mt-12 border-2 border-primary/20 shadow-lg">
            <CardContent className="p-8">
              <div className="flex items-center space-x-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground mb-2">Processing Your Document</h3>
                  <p className="text-muted-foreground mb-4">
                    Our AI is extracting text, generating embeddings, and preparing your document for intelligent
                    analysis...
                  </p>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full animate-pulse" style={{ width: "60%" }}></div>
                  </div>
                </div>
                <Badge variant="secondary" className="px-4 py-2">
                  Processing...
                </Badge>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Enhanced Help Section */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <Card className="text-center hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Lightning Fast</h3>
              <p className="text-muted-foreground">Advanced AI processing delivers results in seconds, not minutes</p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Secure & Private</h3>
              <p className="text-muted-foreground">
                Your documents are encrypted and processed with enterprise-grade security
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Smart Analysis</h3>
              <p className="text-muted-foreground">
                AI understands context and provides meaningful explanations for complex content
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
