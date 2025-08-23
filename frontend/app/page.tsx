"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Video, FileText, Users, Zap, Shield, Globe, Play, CheckCircle, Star, Menu, X } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-primary-foreground font-bold text-xl">L</span>
              </div>
              <div>
                <span className="text-2xl font-bold text-foreground tracking-tight">Linguo</span>
                <div className="text-xs text-muted-foreground font-medium">AI Communication</div>
              </div>
            </div>

            <div className="hidden lg:flex items-center space-x-8">
              <Link
                href="#features"
                className="text-muted-foreground hover:text-foreground transition-all duration-200 font-medium"
              >
                Features
              </Link>
              <Link
                href="#solutions"
                className="text-muted-foreground hover:text-foreground transition-all duration-200 font-medium"
              >
                Solutions
              </Link>
              <Link
                href="#about"
                className="text-muted-foreground hover:text-foreground transition-all duration-200 font-medium"
              >
                About
              </Link>
              <Link
                href="#pricing"
                className="text-muted-foreground hover:text-foreground transition-all duration-200 font-medium"
              >
                Pricing
              </Link>
              <div className="flex items-center space-x-3 ml-6 pl-6 border-l border-border">
                <Link href="/auth/login">
                  <Button variant="ghost" size="sm" className="font-medium">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button size="sm" className="font-medium shadow-lg hover:shadow-xl transition-all duration-200">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>

            <button
              className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Enhanced mobile menu */}
          {isMenuOpen && (
            <div className="lg:hidden py-6 border-t border-border/50 animate-fade-in">
              <div className="flex flex-col space-y-4">
                <Link
                  href="#features"
                  className="text-muted-foreground hover:text-foreground transition-colors font-medium py-2"
                >
                  Features
                </Link>
                <Link
                  href="#solutions"
                  className="text-muted-foreground hover:text-foreground transition-colors font-medium py-2"
                >
                  Solutions
                </Link>
                <Link
                  href="#about"
                  className="text-muted-foreground hover:text-foreground transition-colors font-medium py-2"
                >
                  About
                </Link>
                <Link
                  href="#pricing"
                  className="text-muted-foreground hover:text-foreground transition-colors font-medium py-2"
                >
                  Pricing
                </Link>
                <div className="flex flex-col space-y-3 pt-4 border-t border-border">
                  <Link href="/auth/login">
                    <Button variant="outline" size="sm" className="w-full justify-center bg-transparent">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/auth/register">
                    <Button size="sm" className="w-full justify-center">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center max-w-5xl mx-auto ${isVisible ? "animate-fade-in" : "opacity-0"}`}>
            <Badge variant="secondary" className="mb-8 px-4 py-2 text-sm font-medium">
              🚀 Powered by Advanced AI Technology
            </Badge>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-8 leading-[1.1] tracking-tight">
              Break Communication
              <span className="block bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                Barriers with AI
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed font-light">
              Linguo empowers the deaf and hard-of-hearing community with real-time AI translation and intelligent
              document explanation through cutting-edge technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/auth/register">
                <Button
                  size="lg"
                  className="w-full sm:w-auto text-lg px-8 py-4 font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="#demo">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto text-lg px-8 py-4 font-semibold group bg-transparent"
                >
                  <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Watch Demo
                </Button>
              </Link>
            </div>

            <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-24 bg-gradient-to-b from-background to-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <Badge variant="outline" className="mb-4">
              Our Solutions
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 tracking-tight">
              Two Powerful Platforms
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Comprehensive AI-powered tools designed to make digital communication accessible and inclusive for
              everyone
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-20">
            {/* Linguo Meet - Enhanced */}
            <Card className="relative overflow-hidden border-2 hover:border-primary/20 transition-all duration-300 hover:shadow-2xl group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardHeader className="pb-6 relative">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-primary rounded-xl shadow-lg">
                    <Video className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <div>
                    <CardTitle className="text-3xl font-bold">Linguo Meet</CardTitle>
                    <Badge variant="secondary" className="mt-1">
                      Real-time Translation
                    </Badge>
                  </div>
                </div>
                <CardDescription className="text-lg leading-relaxed">
                  Revolutionary video conferencing with bidirectional AI translation for seamless conversations between
                  deaf and hearing individuals
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 relative">
                <div className="aspect-video bg-gradient-to-br from-muted to-muted/50 rounded-xl flex items-center justify-center border-2 border-dashed border-border">
                  <div className="text-center">
                    <Video className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground font-medium">Live Translation Interface</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {[
                    "Sign language to speech conversion",
                    "Speech to 3D sign language animation",
                    "Real-time processing with <100ms latency",
                    "Multi-participant support",
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                      <span className="text-sm font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-6 group">
                  Try Linguo Meet
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>

            {/* Linguo Read - Enhanced */}
            <Card className="relative overflow-hidden border-2 hover:border-primary/20 transition-all duration-300 hover:shadow-2xl group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardHeader className="pb-6 relative">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-primary rounded-xl shadow-lg">
                    <FileText className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <div>
                    <CardTitle className="text-3xl font-bold">Linguo Read</CardTitle>
                    <Badge variant="secondary" className="mt-1">
                      Document AI
                    </Badge>
                  </div>
                </div>
                <CardDescription className="text-lg leading-relaxed">
                  AI-powered document comprehension that transforms complex text into clear sign language explanations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 relative">
                <div className="aspect-video bg-gradient-to-br from-muted to-muted/50 rounded-xl flex items-center justify-center border-2 border-dashed border-border">
                  <div className="text-center">
                    <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground font-medium">Document Analysis Interface</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {[
                    "Upload any text document or PDF",
                    "Highlight text for instant explanation",
                    "Complex concepts simplified in sign language",
                    "Powered by advanced RAG technology",
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                      <span className="text-sm font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-6 group">
                  Try Linguo Read
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "Multi-User Collaboration",
                description:
                  "Connect multiple participants in group conversations with seamless real-time translation for everyone",
              },
              {
                icon: Zap,
                title: "Lightning Performance",
                description:
                  "Advanced AI agents ensure sub-100ms latency for natural conversation flow and immediate responses",
              },
              {
                icon: Shield,
                title: "Enterprise Security",
                description:
                  "End-to-end encryption, HIPAA compliance, and enterprise-grade security for all communications",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20 group"
              >
                <CardHeader className="pb-4">
                  <feature.icon className="h-12 w-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Our Mission
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-8 tracking-tight">
              Empowering Digital Inclusion
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Linguo leverages cutting-edge agentic AI architecture to create a platform that truly understands and
              bridges communication gaps. Our mission is to ensure that digital communication is accessible to everyone,
              regardless of hearing ability.
            </p>
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Star className="h-5 w-5 fill-primary text-primary" />
              <Star className="h-5 w-5 fill-primary text-primary" />
              <Star className="h-5 w-5 fill-primary text-primary" />
              <Star className="h-5 w-5 fill-primary text-primary" />
              <Star className="h-5 w-5 fill-primary text-primary" />
              <span className="ml-2 font-medium">Trusted by 10,000+ users worldwide</span>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-8 mb-16">
            {[
              { metric: "99.2%", label: "Translation Accuracy", sublabel: "Industry leading precision" },
              { metric: "<85ms", label: "Average Latency", sublabel: "Real-time performance" },
              { metric: "24/7", label: "Global Support", sublabel: "Always available" },
              { metric: "150+", label: "Languages Supported", sublabel: "Worldwide coverage" },
            ].map((stat, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                <div className="text-4xl font-bold text-foreground mb-2">{stat.metric}</div>
                <p className="font-semibold text-foreground mb-1">{stat.label}</p>
                <p className="text-sm text-muted-foreground">{stat.sublabel}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/80" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 tracking-tight">Ready to Transform Communication?</h2>
          <p className="text-xl opacity-90 mb-10 max-w-3xl mx-auto leading-relaxed">
            Join thousands of users who are already experiencing seamless, barrier-free communication with Linguo's
            AI-powered platform
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/auth/register">
              <Button
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto text-lg px-8 py-4 font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                Start Your Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="#contact">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto text-lg px-8 py-4 font-semibold border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
              >
                Schedule Demo
              </Button>
            </Link>
          </div>
          <div className="mt-8 text-sm opacity-75">No credit card required • 14-day free trial • Cancel anytime</div>
        </div>
      </section>

      <footer className="bg-muted/30 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-primary-foreground font-bold text-xl">L</span>
                </div>
                <div>
                  <span className="text-2xl font-bold text-foreground tracking-tight">Linguo</span>
                  <div className="text-xs text-muted-foreground font-medium">AI Communication</div>
                </div>
              </div>
              <p className="text-muted-foreground mb-6 max-w-md leading-relaxed">
                Breaking communication barriers with AI-powered real-time translation and document explanation for the
                deaf and hard-of-hearing community.
              </p>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Globe className="h-4 w-4" />
                <span>Making the world more accessible, one conversation at a time</span>
              </div>
            </div>

            {[
              {
                title: "Product",
                links: [
                  { name: "Features", href: "#features" },
                  { name: "Linguo Meet", href: "/meet" },
                  { name: "Linguo Read", href: "/read" },
                  { name: "API Documentation", href: "/api" },
                  { name: "Integrations", href: "/integrations" },
                ],
              },
              {
                title: "Company",
                links: [
                  { name: "About Us", href: "/about" },
                  { name: "Careers", href: "/careers" },
                  { name: "Press Kit", href: "/press" },
                  { name: "Contact", href: "/contact" },
                  { name: "Blog", href: "/blog" },
                ],
              },
              {
                title: "Support",
                links: [
                  { name: "Help Center", href: "/help" },
                  { name: "Community", href: "/community" },
                  { name: "Status", href: "/status" },
                  { name: "Privacy Policy", href: "/privacy" },
                  { name: "Terms of Service", href: "/terms" },
                ],
              },
            ].map((section, index) => (
              <div key={index}>
                <h3 className="font-semibold text-foreground mb-4 text-lg">{section.title}</h3>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        href={link.href}
                        className="text-muted-foreground hover:text-foreground transition-colors font-medium"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              &copy; 2025 Linguo. All rights reserved. Built with accessibility in mind.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <Link
                href="/accessibility"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                Accessibility
              </Link>
              <Link href="/security" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                Security
              </Link>
              <Link
                href="/compliance"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                HIPAA Compliance
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
