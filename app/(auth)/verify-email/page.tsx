"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Mail, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function VerifyEmailPage() {
  const router = useRouter()
  const [code, setCode] = useState(["", "", "", "", "", ""])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      // Handle paste
      const chars = value.slice(0, 6).split("")
      const newCode = [...code]
      chars.forEach((char, i) => {
        if (index + i < 6) {
          newCode[index + i] = char
        }
      })
      setCode(newCode)
      const nextIndex = Math.min(index + chars.length, 5)
      inputRefs.current[nextIndex]?.focus()
    } else {
      const newCode = [...code]
      newCode[index] = value
      setCode(newCode)

      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus()
      }
    }
    setError("")
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const fullCode = code.join("")
    if (fullCode.length !== 6) {
      setError("Please enter the complete verification code")
      return
    }

    setIsLoading(true)
    // Simulate verification
    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard")
    }, 1500)
  }

  const handleResend = () => {
    // Simulate resend
    setError("")
    setCode(["", "", "", "", "", ""])
    inputRefs.current[0]?.focus()
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1 text-center">
        <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <Mail className="w-6 h-6 text-primary" />
        </div>
        <CardTitle className="text-2xl font-bold">Check your email</CardTitle>
        <CardDescription>
          We've sent a verification code to your email address. Enter the 6-digit code below.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center gap-2">
            {code.map((digit, index) => (
              <Input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el
                }}
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value.replace(/\D/g, ""))}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-14 text-center text-xl font-semibold"
              />
            ))}
          </div>

          {error && <p className="text-sm text-destructive text-center">{error}</p>}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Verifying..." : "Verify email"}
          </Button>
        </form>

        <div className="mt-6 text-center space-y-4">
          <p className="text-sm text-muted-foreground">
            Didn't receive the code?{" "}
            <button type="button" onClick={handleResend} className="text-primary hover:underline">
              Resend
            </button>
          </p>

          <Link href="/signup" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to signup
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
