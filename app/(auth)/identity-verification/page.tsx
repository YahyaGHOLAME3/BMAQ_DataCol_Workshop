"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Upload, User, Calendar, Globe, FileText, Shield, CheckCircle, Clock, XCircle, AlertCircle } from "lucide-react"
import Link from "next/link"

type VerificationStatus = "not-submitted" | "under-review" | "verified" | "rejected"

export default function IdentityVerificationPage() {
  const router = useRouter()
  const [status] = useState<VerificationStatus>("not-submitted")
  const [isLoading, setIsLoading] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploadedFile(file.name)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard")
    }, 2000)
  }

  const getStatusBadge = (status: VerificationStatus) => {
    switch (status) {
      case "not-submitted":
        return (
          <Badge variant="secondary" className="gap-1">
            <AlertCircle className="w-3 h-3" /> Not Submitted
          </Badge>
        )
      case "under-review":
        return (
          <Badge className="gap-1 bg-yellow-500/10 text-yellow-700 border-yellow-200">
            <Clock className="w-3 h-3" /> Under Review
          </Badge>
        )
      case "verified":
        return (
          <Badge className="gap-1 bg-green-500/10 text-green-700 border-green-200">
            <CheckCircle className="w-3 h-3" /> Verified
          </Badge>
        )
      case "rejected":
        return (
          <Badge className="gap-1 bg-red-500/10 text-red-700 border-red-200">
            <XCircle className="w-3 h-3" /> Rejected
          </Badge>
        )
    }
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold">Identity Verification</CardTitle>
              <CardDescription>Required for contributing sensitive historical materials</CardDescription>
            </div>
          </div>
          {getStatusBadge(status)}
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Legal Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input id="fullName" placeholder="As it appears on your ID" className="pl-10" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dob">Date of Birth</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input id="dob" type="date" className="pl-10" required />
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
                <Select required>
                  <SelectTrigger className="pl-10">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="au">Australia</SelectItem>
                    <SelectItem value="de">Germany</SelectItem>
                    <SelectItem value="fr">France</SelectItem>
                    <SelectItem value="jp">Japan</SelectItem>
                    <SelectItem value="in">India</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="idNumber">ID Number</Label>
              <div className="relative">
                <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input id="idNumber" placeholder="Passport or ID number" className="pl-10" required />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Upload ID Document</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
              <input
                type="file"
                id="idDocument"
                className="hidden"
                accept="image/*,.pdf"
                onChange={handleFileChange}
                required
              />
              <label htmlFor="idDocument" className="cursor-pointer">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <Upload className="w-5 h-5 text-muted-foreground" />
                  </div>
                  {uploadedFile ? (
                    <p className="text-sm font-medium text-foreground">{uploadedFile}</p>
                  ) : (
                    <>
                      <p className="text-sm font-medium">Click to upload or drag and drop</p>
                      <p className="text-xs text-muted-foreground">PNG, JPG, or PDF (max 10MB)</p>
                    </>
                  )}
                </div>
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="purpose">Purpose / Background</Label>
            <Textarea
              id="purpose"
              placeholder="Briefly explain your background and purpose for contributing to the archive (e.g., historian, researcher, family archivist)..."
              className="min-h-[100px] resize-none"
              required
            />
            <p className="text-xs text-muted-foreground">
              This helps our team understand your contributions and verify authenticity.
            </p>
          </div>

          <div className="flex gap-4">
            <Link href="/dashboard" className="flex-1">
              <Button variant="outline" className="w-full bg-transparent" type="button">
                Skip for now
              </Button>
            </Link>
            <Button type="submit" className="flex-1" disabled={isLoading}>
              {isLoading ? "Submitting..." : "Submit for verification"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
