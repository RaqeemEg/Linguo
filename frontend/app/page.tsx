import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">L</span>
              </div>
              <h1 className="text-2xl font-serif font-bold text-foreground">Linguo</h1>
              <Badge variant="secondary" className="ml-2 text-xs">
                AI-Powered
              </Badge>
            </div>
            <nav className="flex items-center gap-3">
              <Link href="/auth/login">
                <Button variant="ghost" className="font-medium">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button className="font-medium shadow-lg">Get Started</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="container mx-auto px-4 py-24 relative">
            <div className="text-center max-w-5xl mx-auto">
              <Badge variant="outline" className="mb-6 text-sm font-medium border-primary/20 text-primary">
                Revolutionary AI Technology
              </Badge>
              <h2 className="text-6xl md:text-7xl font-serif font-bold text-foreground mb-8 leading-tight">
                Breaking Communication
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> Barriers</span>
              </h2>
              <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed max-w-3xl mx-auto">
                Linguo empowers the deaf and hard-of-hearing community with cutting-edge AI-powered sign language
                translation for seamless video calls and intelligent document analysis.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                <Link href="/auth/register">
                  <Button
                    size="lg"
                    className="px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
                  >
                    Start Communicating
                  </Button>
                </Link>
                <Link href="/auth/login?demo=true">
                  <Button
                    variant="outline"
                    size="lg"
                    className="px-8 py-4 text-lg font-semibold border-2 hover:bg-accent/5 bg-transparent"
                  >
                    Try Demo
                  </Button>
                </Link>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>WCAG AA Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Real-time Translation</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Enterprise Ready</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h3 className="text-4xl font-serif font-bold text-foreground mb-4">
                Powerful Features for Inclusive Communication
              </h3>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Experience the future of accessible communication with our AI-powered platform designed for everyone.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
              <Card className="border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-serif text-foreground">Linguo Meet</CardTitle>
                      <CardDescription className="text-lg text-muted-foreground">
                        Real-time video conferencing with AI-powered sign language translation
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl mb-6 flex items-center justify-center border border-border/50">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <p className="text-muted-foreground font-medium">Interactive Video Interface</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-foreground font-medium">Real-time 3D sign language avatars</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span className="text-foreground font-medium">Bidirectional communication support</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-foreground font-medium">High-quality video streaming</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-accent to-accent/80 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-serif text-foreground">Linguo Read</CardTitle>
                      <CardDescription className="text-lg text-muted-foreground">
                        Intelligent document analysis with sign language explanations
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-gradient-to-br from-accent/10 to-primary/10 rounded-xl mb-6 flex items-center justify-center border border-border/50">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-10 h-10 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>
                      <p className="text-muted-foreground font-medium">Smart Document Reader</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span className="text-foreground font-medium">Complex text simplification</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-foreground font-medium">Interactive sign language explanations</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span className="text-foreground font-medium">Support for legal and technical documents</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h3 className="text-4xl font-serif font-bold text-foreground mb-4">Why Choose Linguo?</h3>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Built with accessibility at its core, Linguo delivers professional-grade communication tools.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4 className="text-xl font-serif font-bold text-foreground mb-3">Lightning Fast</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Real-time translation with minimal latency ensures natural, flowing conversations.
                </p>
              </div>

              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h4 className="text-xl font-serif font-bold text-foreground mb-3">Secure & Private</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Enterprise-grade security ensures your conversations and documents remain private.
                </p>
              </div>

              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <h4 className="text-xl font-serif font-bold text-foreground mb-3">Accessibility First</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Designed from the ground up to be inclusive and accessible for everyone.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-gradient-to-r from-primary to-accent text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="container mx-auto px-4 text-center relative">
            <h3 className="text-4xl md:text-5xl font-serif font-bold mb-6">Ready to Transform Communication?</h3>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Join thousands of users who are already breaking down communication barriers with Linguo.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/auth/register">
                <Button
                  size="lg"
                  variant="secondary"
                  className="px-8 py-4 text-lg font-semibold bg-white text-primary hover:bg-white/90"
                >
                  Get Started Free
                </Button>
              </Link>
              <Link href="/auth/login?demo=true">
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 py-4 text-lg font-semibold border-white/30 text-white hover:bg-white/10 bg-transparent"
                >
                  Try Demo
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-muted/20">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <span className="text-lg font-serif font-bold text-foreground">Linguo</span>
            </div>
            <div className="text-center md:text-right">
              <p className="text-muted-foreground mb-2">
                &copy; 2025 Linguo. Empowering inclusive communication through AI.
              </p>
              <div className="flex items-center justify-center md:justify-end gap-6 text-sm text-muted-foreground">
                <Link href="/privacy" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
                <Link href="/accessibility" className="hover:text-foreground transition-colors">
                  Accessibility
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
