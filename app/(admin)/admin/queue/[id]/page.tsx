"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  MessageSquare,
  User,
  MapPin,
  Calendar,
  Tag,
  Eye,
  Edit,
  ChevronLeft,
  ChevronRight,
  Brain,
} from "lucide-react"
import Link from "next/link"

export default function ReviewPage() {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [rejectReason, setRejectReason] = useState("")
  const [infoRequest, setInfoRequest] = useState("")
  const [currentImage, setCurrentImage] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const item = {
    id: 1,
    title: "Victorian Era Portrait Collection",
    shortDescription:
      "A collection of formal portraits from Victorian-era London, showcasing the fashion and photography techniques of the late 19th century.",
    longDescription:
      "This remarkable collection consists of formal photographic portraits taken in London during the Victorian era, specifically between 1890 and 1899. The photographs were captured using the wet collodion process, which was the dominant photographic technique of that period.\n\nThe subjects of these portraits represent middle to upper-class Victorian society, dressed in the characteristic fashion of the era.",
    category: "Photography",
    date: "1890-1899",
    location: "London, United Kingdom",
    coordinates: "51.5074, -0.1278",
    contributor: {
      name: "Historical Society of London",
      email: "archive@historicalsociety.org.uk",
      verified: true,
    },
    relatedPersons: "Various subjects from Victorian London society",
    tags: ["Victorian", "Portrait", "Photography", "19th Century", "London", "Fashion"],
    privacy: "public",
    submittedDate: "November 23, 2025",
    images: [
      "/placeholder.svg?key=vimg1",
      "/placeholder.svg?key=vimg2",
      "/placeholder.svg?key=vimg3",
      "/placeholder.svg?key=vimg4",
    ],
  }

  const handleApprove = () => {
    setIsSubmitting(true)
    setTimeout(() => {
      router.push("/admin/queue")
    }, 1500)
  }

  const handleReject = () => {
    setIsSubmitting(true)
    setTimeout(() => {
      router.push("/admin/queue")
    }, 1500)
  }

  const handleRequestInfo = () => {
    setIsSubmitting(true)
    setTimeout(() => {
      router.push("/admin/queue")
    }, 1500)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link href="/admin/queue">
          <Button variant="ghost">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Queue
          </Button>
        </Link>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
            <Edit className="w-4 h-4 mr-2" />
            {isEditing ? "Cancel Edit" : "Edit Metadata"}
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Media Preview */}
          <Card>
            <CardContent className="p-0">
              <div className="aspect-[16/10] bg-muted relative overflow-hidden rounded-t-lg">
                <img
                  src={item.images[currentImage] || "/placeholder.svg"}
                  alt={item.title}
                  className="object-cover w-full h-full"
                />
                {item.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentImage(Math.max(0, currentImage - 1))}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 rounded-full flex items-center justify-center hover:bg-background"
                      disabled={currentImage === 0}
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setCurrentImage(Math.min(item.images.length - 1, currentImage + 1))}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 rounded-full flex items-center justify-center hover:bg-background"
                      disabled={currentImage === item.images.length - 1}
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>
              <div className="p-4 flex justify-between items-center">
                <p className="text-sm text-muted-foreground">
                  Image {currentImage + 1} of {item.images.length}
                </p>
                <div className="flex gap-2">
                  {item.images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentImage(i)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        i === currentImage ? "bg-primary" : "bg-muted-foreground/30"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Item Details */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">{item.category}</Badge>
                <Badge className="bg-yellow-500/10 text-yellow-700 border-yellow-200">Pending Review</Badge>
              </div>
              {isEditing ? (
                <Input defaultValue={item.title} className="text-xl font-bold" />
              ) : (
                <CardTitle className="text-xl">{item.title}</CardTitle>
              )}
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-sm text-muted-foreground">Short Description</Label>
                {isEditing ? (
                  <Textarea defaultValue={item.shortDescription} className="mt-2" />
                ) : (
                  <p className="mt-1">{item.shortDescription}</p>
                )}
              </div>

              <Separator />

              <div>
                <Label className="text-sm text-muted-foreground">Full Description</Label>
                {isEditing ? (
                  <Textarea defaultValue={item.longDescription} className="mt-2 min-h-[150px]" />
                ) : (
                  <div className="mt-1 space-y-4">
                    {item.longDescription.split("\n\n").map((p, i) => (
                      <p key={i} className="text-muted-foreground leading-relaxed">
                        {p}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* AI Insights Placeholder */}
          <Card className="border-dashed">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Brain className="w-5 h-5" />
                AI Insights
              </CardTitle>
              <CardDescription>Automated analysis coming soon</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-6 text-muted-foreground">
                <Brain className="w-12 h-12 mx-auto mb-2 opacity-30" />
                <p>AI-powered content analysis will appear here</p>
                <p className="text-sm mt-1">Features: OCR, object detection, historical context</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Action Buttons */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Review Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={handleApprove}
                disabled={isSubmitting}
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                {isSubmitting ? "Approving..." : "Approve"}
              </Button>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="destructive" className="w-full">
                    <XCircle className="w-4 h-4 mr-2" />
                    Reject
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Reject Submission</DialogTitle>
                    <DialogDescription>Please provide a reason for rejection</DialogDescription>
                  </DialogHeader>
                  <Textarea
                    placeholder="Reason for rejection..."
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                  />
                  <DialogFooter>
                    <Button variant="outline">Cancel</Button>
                    <Button variant="destructive" onClick={handleReject} disabled={isSubmitting}>
                      {isSubmitting ? "Rejecting..." : "Confirm Rejection"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full bg-transparent">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Request More Info
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Request More Information</DialogTitle>
                    <DialogDescription>What additional information do you need?</DialogDescription>
                  </DialogHeader>
                  <Textarea
                    placeholder="Please describe what additional information you need..."
                    value={infoRequest}
                    onChange={(e) => setInfoRequest(e.target.value)}
                  />
                  <DialogFooter>
                    <Button variant="outline">Cancel</Button>
                    <Button onClick={handleRequestInfo} disabled={isSubmitting}>
                      {isSubmitting ? "Sending..." : "Send Request"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          {/* Metadata */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Metadata</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <Calendar className="w-4 h-4 mt-0.5 text-muted-foreground" />
                <div>
                  <div className="font-medium">Date</div>
                  {isEditing ? (
                    <Input defaultValue={item.date} className="mt-1 h-8" />
                  ) : (
                    <div className="text-muted-foreground">{item.date}</div>
                  )}
                </div>
              </div>

              <Separator />

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-muted-foreground" />
                <div>
                  <div className="font-medium">Location</div>
                  {isEditing ? (
                    <Input defaultValue={item.location} className="mt-1 h-8" />
                  ) : (
                    <div className="text-muted-foreground">{item.location}</div>
                  )}
                  <div className="text-xs text-muted-foreground mt-1">{item.coordinates}</div>
                </div>
              </div>

              <Separator />

              <div className="flex items-start gap-3">
                <User className="w-4 h-4 mt-0.5 text-muted-foreground" />
                <div>
                  <div className="font-medium">Related Persons</div>
                  {isEditing ? (
                    <Input defaultValue={item.relatedPersons} className="mt-1 h-8" />
                  ) : (
                    <div className="text-muted-foreground">{item.relatedPersons}</div>
                  )}
                </div>
              </div>

              <Separator />

              <div className="flex items-start gap-3">
                <Eye className="w-4 h-4 mt-0.5 text-muted-foreground" />
                <div>
                  <div className="font-medium">Privacy</div>
                  <div className="text-muted-foreground capitalize">{item.privacy}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Tag className="w-4 h-4" />
                Tags
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Contributor Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Contributor</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2">
                <p className="font-medium">{item.contributor.name}</p>
                {item.contributor.verified && (
                  <Badge className="bg-green-500/10 text-green-700 border-green-200 text-xs">Verified</Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{item.contributor.email}</p>
              <p className="text-sm text-muted-foreground">Submitted: {item.submittedDate}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
