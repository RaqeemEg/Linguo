"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"

interface Document {
  id: string
  title: string
  type: string
  size: string
  uploadDate: Date
  status: "processed" | "processing" | "error"
  pageCount: number
}

export function DocumentLibrary() {
  const [searchQuery, setSearchQuery] = useState("")
  const [documents] = useState<Document[]>([
    {
      id: "1",
      title: "Legal Contract Terms",
      type: "PDF",
      size: "2.4 MB",
      uploadDate: new Date(Date.now() - 86400000),
      status: "processed",
      pageCount: 12,
    },
    {
      id: "2",
      title: "Medical Report Analysis",
      type: "PDF",
      size: "1.8 MB",
      uploadDate: new Date(Date.now() - 172800000),
      status: "processed",
      pageCount: 8,
    },
    {
      id: "3",
      title: "Technical Documentation",
      type: "TXT",
      size: "456 KB",
      uploadDate: new Date(Date.now() - 259200000),
      status: "processing",
      pageCount: 15,
    },
  ])

  const filteredDocuments = documents.filter((doc) => doc.title.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-serif font-bold text-foreground mb-2">SignSync Read</h1>
              <p className="text-muted-foreground">Analyze documents with AI-powered sign language explanations</p>
            </div>
            <Link href="/read/upload">
              <Button size="lg">Upload Document</Button>
            </Link>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <div className="mb-6">
                <Input
                  placeholder="Search documents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="max-w-md"
                />
              </div>

              {filteredDocuments.length === 0 ? (
                <Card className="border-border">
                  <CardContent className="py-12">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <div className="w-8 h-8 bg-accent rounded-sm"></div>
                      </div>
                      <h3 className="text-lg font-serif font-semibold text-foreground mb-2">No documents found</h3>
                      <p className="text-muted-foreground mb-4">
                        {searchQuery ? "Try adjusting your search terms" : "Upload your first document to get started"}
                      </p>
                      <Link href="/read/upload">
                        <Button>Upload Document</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  {filteredDocuments.map((document) => (
                    <Card key={document.id} className="border-border hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <CardTitle className="text-lg font-serif truncate">{document.title}</CardTitle>
                            <CardDescription className="flex items-center gap-2 mt-1">
                              <span>{document.type}</span>
                              <span>•</span>
                              <span>{document.size}</span>
                              <span>•</span>
                              <span>{document.pageCount} pages</span>
                            </CardDescription>
                          </div>
                          <Badge
                            variant={
                              document.status === "processed"
                                ? "default"
                                : document.status === "processing"
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {document.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            Uploaded {document.uploadDate.toLocaleDateString()}
                          </span>
                          <div className="flex gap-2">
                            {document.status === "processed" && (
                              <Link href={`/read/${document.id}`}>
                                <Button size="sm">Open</Button>
                              </Link>
                            )}
                            <Button variant="outline" size="sm" className="bg-transparent">
                              Delete
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-6">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-lg font-serif">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link href="/read/upload">
                    <Button className="w-full">Upload New Document</Button>
                  </Link>
                  <Button variant="outline" className="w-full bg-transparent">
                    Import from Cloud
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    Scan Document
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-lg font-serif">Supported Formats</CardTitle>
                  <CardDescription>File types we can analyze</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span>PDF documents</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span>Text files (.txt, .md)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span>Word documents (.docx)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span>Legal contracts</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span>Medical reports</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-lg font-serif">Tips</CardTitle>
                  <CardDescription>Get the most out of SignSync Read</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                      <p>Highlight complex text to get sign language explanations</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                      <p>Use clear, high-quality scans for best results</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                      <p>Documents are processed securely and privately</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
