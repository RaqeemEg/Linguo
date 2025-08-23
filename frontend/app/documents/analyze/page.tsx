"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  ArrowLeft,
  FileText,
  Play,
  Pause,
  RotateCcw,
  Lightbulb,
  Volume2,
  Download,
  Share,
  Bookmark,
  Eye,
  Settings,
  Maximize2,
} from "lucide-react"
import Link from "next/link"

export default function DocumentAnalyzePage() {
  const [selectedText, setSelectedText] = useState("")
  const [isExplaining, setIsExplaining] = useState(false)
  const [explanation, setExplanation] = useState("")
  const [isAnimationPlaying, setIsAnimationPlaying] = useState(false)
  const [animationSpeed, setAnimationSpeed] = useState(1)

  const documentContent = `
    ARTIFICIAL INTELLIGENCE AND MACHINE LEARNING FUNDAMENTALS

    Chapter 1: Introduction to Neural Networks

    Neural networks are computational models inspired by the biological neural networks that constitute animal brains. These systems learn to perform tasks by considering examples, generally without being programmed with task-specific rules.

    A neural network is based on a collection of connected units or nodes called artificial neurons, which loosely model the neurons in a biological brain. Each connection, like the synapses in a biological brain, can transmit a signal to other neurons. An artificial neuron receives a signal, processes it, and can signal neurons connected to it.

    The "signal" at a connection is a real number, and the output of each neuron is computed by some non-linear function of the sum of its inputs. The connections are called edges. Neurons and edges typically have a weight that adjusts as learning proceeds. The weight increases or decreases the strength of the signal at a connection.

    Deep learning is part of a broader family of machine learning methods based on artificial neural networks with representation learning. Learning can be supervised, semi-supervised or unsupervised. Deep-learning architectures such as deep neural networks, deep belief networks, recurrent neural networks and convolutional neural networks have been applied to fields including computer vision, machine learning, natural language processing, machine translation, bioinformatics and drug design.
  `

  const handleTextSelection = () => {
    const selection = window.getSelection()
    if (selection && selection.toString().trim()) {
      setSelectedText(selection.toString().trim())
    }
  }

  const handleExplain = async () => {
    if (!selectedText) return

    setIsExplaining(true)
    setIsAnimationPlaying(true)

    // Simulate AI explanation generation
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setExplanation(
      `This text explains that neural networks are computer systems that work like animal brains. They learn by looking at examples instead of following specific rules. Think of it like how you learn to recognize faces - you see many faces and learn the patterns, rather than memorizing a list of rules about what makes a face.`,
    )

    setIsExplaining(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Enhanced Header */}
      <div className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <Link href="/documents/upload">
                <Button variant="ghost" size="sm" className="group">
                  <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                  Back to Upload
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-primary-foreground font-bold text-xl">L</span>
                </div>
                <div>
                  <span className="text-2xl font-bold text-foreground tracking-tight">Linguo Read</span>
                  <div className="text-xs text-muted-foreground font-medium">Document Analysis</div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm">
                <Bookmark className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" size="sm" className="bg-transparent">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm" className="bg-transparent">
                <Share className="h-4 w-4 mr-2" />
                Share
              </Button>
              <div className="w-px h-6 bg-border"></div>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Enhanced Document Viewer */}
        <div className="flex-1 flex flex-col">
          <div className="border-b border-border/50 p-6 bg-background/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground">AI and ML Fundamentals.pdf</h1>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                    <span>2.4 MB</span>
                    <span>•</span>
                    <span>Uploaded 3 hours ago</span>
                    <span>•</span>
                    <span>12 explanations generated</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Badge variant="default" className="px-3 py-1">
                  Ready for Analysis
                </Badge>
                <Button variant="ghost" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  Reading Mode
                </Button>
                <Button variant="ghost" size="sm">
                  <Maximize2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <ScrollArea className="flex-1 p-8">
            <div className="max-w-4xl mx-auto">
              <div
                className="prose prose-gray max-w-none select-text bg-background/50 rounded-2xl p-8 border border-border/50 shadow-sm"
                onMouseUp={handleTextSelection}
              >
                <div className="whitespace-pre-line text-foreground leading-relaxed text-lg">{documentContent}</div>
              </div>
            </div>
          </ScrollArea>

          {/* Enhanced Selection Actions */}
          {selectedText && (
            <div className="border-t border-border/50 p-6 bg-background/80 backdrop-blur">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between p-4 rounded-xl bg-primary/5 border border-primary/20">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-primary rounded-lg">
                      <Lightbulb className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Text Selected</p>
                      <p className="text-sm text-muted-foreground">"{selectedText.substring(0, 80)}..."</p>
                    </div>
                  </div>
                  <Button
                    onClick={handleExplain}
                    disabled={isExplaining}
                    className="shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    {isExplaining ? "Generating Explanation..." : "Explain in Sign Language"}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Sign Language Animation Panel */}
        <div className="w-[420px] border-l border-border/50 bg-muted/20 flex flex-col">
          <div className="p-6 border-b border-border/50 bg-background/50">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-bold text-foreground">Sign Language Explanation</h2>
              <Badge variant="secondary">AI Powered</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Select any text from the document to see AI-powered explanations in sign language
            </p>
          </div>

          {/* Enhanced 3D Animation Area */}
          <div className="flex-1 flex flex-col">
            <div className="flex-1 bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
              {/* Animated background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent animate-pulse"></div>
              </div>

              {isAnimationPlaying ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="relative w-40 h-40 mx-auto mb-6">
                      <div className="absolute inset-0 bg-primary/20 rounded-full animate-pulse"></div>
                      <div className="absolute inset-4 bg-primary/40 rounded-full animate-bounce"></div>
                      <div className="absolute inset-8 bg-primary rounded-full animate-pulse"></div>
                      <div className="absolute inset-12 bg-primary-foreground rounded-full animate-spin"></div>
                    </div>
                    <p className="text-xl font-bold mb-2">AI Avatar Signing</p>
                    <p className="text-sm text-gray-300 mb-4">Translating your selected text into sign language</p>
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-primary rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-primary rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-primary/20">
                      <FileText className="h-16 w-16 text-primary/50" />
                    </div>
                    <p className="text-xl font-bold mb-2">Ready to Explain</p>
                    <p className="text-sm text-gray-300">
                      Select text from the document to see sign language explanation
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Enhanced Animation Controls */}
            <div className="p-6 border-t border-border/50 bg-background/50 space-y-6">
              <div className="flex items-center justify-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsAnimationPlaying(!isAnimationPlaying)}
                  disabled={!explanation}
                  className="bg-transparent"
                >
                  {isAnimationPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button variant="outline" size="sm" disabled={!explanation} className="bg-transparent">
                  <RotateCcw className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" disabled={!explanation} className="bg-transparent">
                  <Volume2 className="h-4 w-4" />
                </Button>
                <div className="w-px h-6 bg-border"></div>
                <select
                  className="text-sm bg-background border border-border rounded px-2 py-1"
                  value={animationSpeed}
                  onChange={(e) => setAnimationSpeed(Number(e.target.value))}
                  disabled={!explanation}
                >
                  <option value={0.5}>0.5x</option>
                  <option value={1}>1x</option>
                  <option value={1.5}>1.5x</option>
                  <option value={2}>2x</option>
                </select>
              </div>

              {/* Enhanced Text Explanation */}
              {explanation && (
                <Card className="border-2 border-primary/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center">
                      <Lightbulb className="h-4 w-4 mr-2 text-primary" />
                      AI Explanation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">{explanation}</p>
                  </CardContent>
                </Card>
              )}

              {/* Enhanced Selected Text Display */}
              {selectedText && (
                <Card className="border border-border/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                      Selected Text
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      value={selectedText}
                      readOnly
                      className="text-sm resize-none bg-muted/30 border-border/50"
                      rows={4}
                    />
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
