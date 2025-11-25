import type React from "react"
import Link from "next/link"
import Image from "next/image"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/images/bmaq.jpeg" alt="BMAQ" width={36} height={36} className="rounded" />
            <div className="flex flex-col">
              <span className="font-semibold text-foreground leading-tight">BMAQ</span>
              <span className="text-xs text-muted-foreground">Al Quds Archive</span>
            </div>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">{children}</main>

      {/* Footer */}
      <footer className="border-t border-border py-4">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © 2025 BMAQ - Bayt Mal Al-Quds Asharif Agency. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
