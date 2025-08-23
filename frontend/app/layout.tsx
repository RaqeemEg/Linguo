import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Linguo - AI-Powered Communication Platform",
  description:
    "Real-time communication platform for the deaf and hard-of-hearing community. Break barriers with AI-powered sign language translation.",
  keywords: ["sign language", "AI", "accessibility", "communication", "deaf", "hard of hearing", "translation"],
  authors: [{ name: "Linguo Team" }],
  creator: "Linguo",
  publisher: "Linguo",
  robots: "index, follow",
  openGraph: {
    title: "Linguo - AI-Powered Communication Platform",
    description: "Break communication barriers with AI-powered real-time sign language translation",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Linguo - AI-Powered Communication Platform",
    description: "Break communication barriers with AI-powered real-time sign language translation",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
