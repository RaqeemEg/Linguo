"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function RecentActivity() {
  const [userData, setUserData] = useState<any>(null)

  useEffect(() => {
    const storedUserData = localStorage.getItem("user-data")
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData))
    }
  }, [])

  const demoActivities = [
    {
      id: 1,
      type: "call",
      title: "Video call with Dr. Martinez",
      description: "Medical consultation • 35 minutes • Completed",
      time: "1 hour ago",
      status: "completed",
    },
    {
      id: 2,
      type: "document",
      title: "Insurance Policy Analysis",
      description: "health-insurance-policy.pdf • 24 pages • AI explanations generated",
      time: "3 hours ago",
      status: "processed",
    },
    {
      id: 3,
      type: "call",
      title: "Job Interview with TechCorp",
      description: "HR interview • 50 minutes • Real-time translation active",
      time: "Yesterday",
      status: "completed",
    },
    {
      id: 4,
      type: "document",
      title: "Legal Contract Review",
      description: "employment-contract.pdf • 16 pages • Complex terms simplified",
      time: "2 days ago",
      status: "processed",
    },
    {
      id: 5,
      type: "call",
      title: "Family Video Call",
      description: "Group call with 4 participants • 1 hour 20 minutes",
      time: "3 days ago",
      status: "completed",
    },
  ]

  const regularActivities = [
    {
      id: 1,
      type: "call",
      title: "Video call with Sarah Johnson",
      description: "45 minutes • Completed",
      time: "2 hours ago",
      status: "completed",
    },
    {
      id: 2,
      type: "document",
      title: "Legal Contract Analysis",
      description: "contract-terms.pdf • 12 pages",
      time: "1 day ago",
      status: "processed",
    },
    {
      id: 3,
      type: "call",
      title: "Team Meeting",
      description: "1 hour 15 minutes • Completed",
      time: "2 days ago",
      status: "completed",
    },
    {
      id: 4,
      type: "document",
      title: "Medical Report Review",
      description: "medical-report.pdf • 8 pages",
      time: "3 days ago",
      status: "processed",
    },
  ]

  const activities = userData?.id === "demo-user" ? demoActivities : regularActivities

  return (
    <Card className="border-border/50 shadow-xl backdrop-blur-sm bg-card/80">
      <CardHeader className="pb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <CardTitle className="text-2xl font-serif font-bold">Recent Activity</CardTitle>
              <CardDescription className="text-base">
                {userData?.id === "demo-user"
                  ? "Explore these sample activities to see SignSync in action"
                  : "Your latest calls and document analyses"}
              </CardDescription>
            </div>
          </div>
          <Button
            variant="outline"
            className="bg-white/50 backdrop-blur-sm border-primary/30 hover:bg-white/70 font-medium"
          >
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center gap-4 p-4 rounded-xl border border-border/50 hover:bg-muted/30 transition-all duration-200 cursor-pointer group backdrop-blur-sm"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-200">
                {activity.type === "call" ? (
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground truncate text-base">{activity.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
              </div>
              <div className="flex items-center gap-4 flex-shrink-0">
                <Badge
                  variant={activity.status === "completed" ? "default" : "secondary"}
                  className={`text-xs font-medium ${activity.status === "completed" ? "bg-green-100 text-green-800 border-green-200" : ""}`}
                >
                  {activity.status}
                </Badge>
                <span className="text-sm text-muted-foreground font-medium">{activity.time}</span>
              </div>
            </div>
          ))}
        </div>

        {userData?.id === "demo-user" && (
          <div className="mt-8 p-6 bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20 rounded-xl backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-6 h-6 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <span className="text-white text-xs font-bold">D</span>
              </div>
              <span className="font-semibold text-primary">Demo Mode</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              These are sample activities showcasing SignSync's capabilities. In the full version, you'll see your
              actual call history and document analyses with real-time updates.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
