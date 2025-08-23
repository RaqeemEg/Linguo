"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Video,
  FileText,
  Plus,
  Clock,
  Users,
  Settings,
  TrendingUp,
  Activity,
  Bell,
  Search,
  Zap,
  Shield,
  ArrowUpRight,
  PlayCircle,
} from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const [recentMeetings] = useState([
    {
      id: 1,
      title: "Team Standup",
      participants: 4,
      duration: "45 min",
      date: "2 hours ago",
      status: "completed",
      accuracy: "99.2%",
    },
    {
      id: 2,
      title: "Client Presentation",
      participants: 6,
      duration: "1h 20min",
      date: "Yesterday",
      status: "completed",
      accuracy: "98.8%",
    },
    {
      id: 3,
      title: "Project Review",
      participants: 3,
      duration: "30 min",
      date: "2 days ago",
      status: "completed",
      accuracy: "99.5%",
    },
  ])

  const [recentDocuments] = useState([
    {
      id: 1,
      title: "Product Requirements Document",
      type: "PDF",
      size: "2.4 MB",
      uploadDate: "3 hours ago",
      explanations: 12,
      status: "processed",
    },
    {
      id: 2,
      title: "Legal Contract Terms",
      type: "DOCX",
      size: "1.8 MB",
      uploadDate: "Yesterday",
      explanations: 8,
      status: "processed",
    },
    {
      id: 3,
      title: "Technical Specification",
      type: "PDF",
      size: "3.1 MB",
      uploadDate: "2 days ago",
      explanations: 15,
      status: "processed",
    },
  ])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Enhanced Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-primary-foreground font-bold text-xl">L</span>
              </div>
              <div>
                <span className="text-2xl font-bold text-foreground tracking-tight">Linguo</span>
                <div className="text-xs text-muted-foreground font-medium">Dashboard</div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></div>
              </Button>
              <Button variant="ghost" size="sm">
                <Search className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <div className="w-px h-6 bg-border"></div>
              <Avatar className="ring-2 ring-primary/20">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback className="bg-primary text-primary-foreground font-semibold">JD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Welcome Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-3 tracking-tight">Good morning, John! 👋</h1>
              <p className="text-xl text-muted-foreground">Ready to break communication barriers today?</p>
            </div>
            <div className="hidden lg:flex items-center space-x-4">
              <Badge variant="secondary" className="px-4 py-2">
                <Zap className="h-4 w-4 mr-2" />
                Pro Plan
              </Badge>
              <Badge variant="outline" className="px-4 py-2">
                <Shield className="h-4 w-4 mr-2" />
                99.2% Accuracy
              </Badge>
            </div>
          </div>
        </div>

        {/* Enhanced Quick Actions */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <Card className="relative overflow-hidden border-2 hover:border-primary/20 transition-all duration-300 hover:shadow-2xl group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardHeader className="pb-6 relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-4 bg-primary rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Video className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-bold mb-2">Start a Meeting</CardTitle>
                    <CardDescription className="text-base">
                      Begin real-time translation with AI-powered communication
                    </CardDescription>
                  </div>
                </div>
                <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="flex space-x-3 mb-4">
                <Link href="/meet/new" className="flex-1">
                  <Button className="w-full h-12 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-200">
                    <Plus className="h-5 w-5 mr-2" />
                    New Meeting
                  </Button>
                </Link>
                <Link href="/meet/join">
                  <Button variant="outline" className="h-12 px-6 bg-transparent">
                    Join
                  </Button>
                </Link>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <PlayCircle className="h-4 w-4 mr-2" />
                <span>Average setup time: 30 seconds</span>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-2 hover:border-primary/20 transition-all duration-300 hover:shadow-2xl group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardHeader className="pb-6 relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-4 bg-primary rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <FileText className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-bold mb-2">Analyze Document</CardTitle>
                    <CardDescription className="text-base">
                      Upload documents for AI-powered sign language explanations
                    </CardDescription>
                  </div>
                </div>
                <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </CardHeader>
            <CardContent className="relative">
              <Link href="/documents/upload">
                <Button className="w-full h-12 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-200">
                  <Plus className="h-5 w-5 mr-2" />
                  Upload Document
                </Button>
              </Link>
              <div className="flex items-center text-sm text-muted-foreground mt-4">
                <FileText className="h-4 w-4 mr-2" />
                <span>Supports PDF, DOCX, TXT up to 10MB</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="relative overflow-hidden hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20 group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                  <Video className="h-6 w-6 text-primary" />
                </div>
                <Badge variant="secondary" className="text-xs">
                  +12%
                </Badge>
              </div>
              <div>
                <p className="text-3xl font-bold text-foreground mb-1">24</p>
                <p className="text-sm text-muted-foreground">Total Meetings</p>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20 group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <Badge variant="secondary" className="text-xs">
                  +8%
                </Badge>
              </div>
              <div>
                <p className="text-3xl font-bold text-foreground mb-1">12</p>
                <p className="text-sm text-muted-foreground">Documents Analyzed</p>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20 group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <Badge variant="secondary" className="text-xs">
                  +25%
                </Badge>
              </div>
              <div>
                <p className="text-3xl font-bold text-foreground mb-1">48</p>
                <p className="text-sm text-muted-foreground">Hours Saved</p>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20 group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <Badge variant="default" className="text-xs">
                  Excellent
                </Badge>
              </div>
              <div>
                <p className="text-3xl font-bold text-foreground mb-1">99.2%</p>
                <p className="text-sm text-muted-foreground">Translation Accuracy</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Enhanced Recent Meetings */}
          <Card className="border-2 hover:border-primary/20 transition-all duration-300">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Video className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Recent Meetings</CardTitle>
                </div>
                <Link href="/meetings">
                  <Button variant="ghost" size="sm" className="text-primary hover:text-primary">
                    View all
                    <ArrowUpRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentMeetings.map((meeting) => (
                  <div
                    key={meeting.id}
                    className="flex items-center justify-between p-4 rounded-xl border border-border hover:border-primary/20 hover:bg-muted/30 transition-all duration-200 group"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-muted rounded-xl group-hover:bg-primary/10 transition-colors">
                        <Video className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground mb-1">{meeting.title}</p>
                        <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Users className="h-3 w-3" />
                            <span>{meeting.participants}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{meeting.duration}</span>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {meeting.accuracy}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary" className="text-xs mb-2">
                        {meeting.status}
                      </Badge>
                      <p className="text-xs text-muted-foreground">{meeting.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Recent Documents */}
          <Card className="border-2 hover:border-primary/20 transition-all duration-300">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Recent Documents</CardTitle>
                </div>
                <Link href="/documents">
                  <Button variant="ghost" size="sm" className="text-primary hover:text-primary">
                    View all
                    <ArrowUpRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-4 rounded-xl border border-border hover:border-primary/20 hover:bg-muted/30 transition-all duration-200 group"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-muted rounded-xl group-hover:bg-primary/10 transition-colors">
                        <FileText className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground mb-1">{doc.title}</p>
                        <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                          <span>{doc.type}</span>
                          <span>•</span>
                          <span>{doc.size}</span>
                          <div className="flex items-center space-x-1">
                            <Activity className="h-3 w-3" />
                            <span>{doc.explanations} explanations</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="default" className="text-xs mb-2">
                        {doc.status}
                      </Badge>
                      <p className="text-xs text-muted-foreground">{doc.uploadDate}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
