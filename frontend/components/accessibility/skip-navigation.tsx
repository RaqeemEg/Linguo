"use client"

export function SkipNavigation() {
  return (
    <div className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50">
      <a
        href="#main-content"
        className="bg-accent text-accent-foreground px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      >
        Skip to main content
      </a>
    </div>
  )
}
