import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function QuickActions() {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card className="border-border/50 shadow-xl hover:shadow-2xl transition-all duration-300 group backdrop-blur-sm bg-card/80">
        <CardHeader className="pb-6">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <CardTitle className="text-2xl font-serif font-bold text-foreground mb-2">Linguo Meet</CardTitle>
              <CardDescription className="text-base text-muted-foreground">
                Start or join a video call with real-time sign language translation
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <Button
              asChild
              className="flex-1 h-12 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Link href="/meet/new">Start New Call</Link>
            </Button>
            <Button
              variant="outline"
              asChild
              className="flex-1 h-12 text-base font-semibold bg-white/50 backdrop-blur-sm border-primary/30 hover:bg-white/70"
            >
              <Link href="/meet/join">Join Call</Link>
            </Button>
          </div>
          <div className="space-y-4 p-4 bg-muted/30 rounded-xl border border-border/50">
            <p className="font-semibold text-foreground">Key Features:</p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-foreground font-medium">Real-time 3D sign language avatars</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span className="text-foreground font-medium">Bidirectional communication</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-foreground font-medium">HD video quality</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50 shadow-xl hover:shadow-2xl transition-all duration-300 group backdrop-blur-sm bg-card/80">
        <CardHeader className="pb-6">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent/80 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <CardTitle className="text-2xl font-serif font-bold text-foreground mb-2">Linguo Read</CardTitle>
              <CardDescription className="text-base text-muted-foreground">
                Upload documents and get sign language explanations for complex text
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <Button
              asChild
              className="flex-1 h-12 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Link href="/read/upload">Upload Document</Link>
            </Button>
            <Button
              variant="outline"
              asChild
              className="flex-1 h-12 text-base font-semibold bg-white/50 backdrop-blur-sm border-primary/30 hover:bg-white/70"
            >
              <Link href="/read/library">My Documents</Link>
            </Button>
          </div>
          <div className="space-y-4 p-4 bg-muted/30 rounded-xl border border-border/50">
            <p className="font-semibold text-foreground">Supported formats:</p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span className="text-foreground font-medium">PDF documents</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-foreground font-medium">Text files</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span className="text-foreground font-medium">Legal and technical papers</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
