"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Upload, X, ImageIcon, Video, Music, ChevronLeft, ChevronRight, Check, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"

const steps = [
  { id: 1, name: "Media Upload", icon: Upload },
  { id: 2, name: "Basic Information", icon: ImageIcon },
  { id: 3, name: "Context & Metadata", icon: MapPin },
  { id: 4, name: "Tags & Privacy", icon: Check },
  { id: 5, name: "Review & Submit", icon: Check },
]

const categories = ["Photography", "Document", "Artifact", "Sculpture", "Map", "Audio", "Video", "Manuscript", "Other"]

export default function UploadPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; type: string; size: string }[]>([])
  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    category: "",
    dateStart: "",
    dateEnd: "",
    location: "",
    coordinates: "",
    peopleMentioned: "",
    longStory: "",
    tags: [] as string[],
    privacyLevel: "public",
    agreeToTerms: false,
  })
  const [tagInput, setTagInput] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newFiles = Array.from(files).map((file) => ({
        name: file.name,
        type: file.type.split("/")[0],
        size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      }))
      setUploadedFiles([...uploadedFiles, ...newFiles])
    }
  }

  const removeFile = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index))
  }

  const addTag = () => {
    if (tagInput && !formData.tags.includes(tagInput)) {
      setFormData({ ...formData, tags: [...formData.tags, tagInput] })
      setTagInput("")
    }
  }

  const removeTag = (tag: string) => {
    setFormData({ ...formData, tags: formData.tags.filter((t) => t !== tag) })
  }

  const getFileIcon = (type: string) => {
    switch (type) {
      case "image":
        return <ImageIcon className="w-5 h-5" />
      case "video":
        return <Video className="w-5 h-5" />
      case "audio":
        return <Music className="w-5 h-5" />
      default:
        return <ImageIcon className="w-5 h-5" />
    }
  }

  const handleSubmit = () => {
    setIsSubmitting(true)
    setTimeout(() => {
      router.push("/dashboard/submissions")
    }, 2000)
  }

  const nextStep = () => setCurrentStep(Math.min(currentStep + 1, 5))
  const prevStep = () => setCurrentStep(Math.max(currentStep - 1, 1))

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Upload New Archive Item</h1>
        <p className="text-muted-foreground">Share historical materials with the archive</p>
      </div>

      {/* Progress Steps */}
      <div className="hidden md:flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                currentStep >= step.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
              )}
            >
              {currentStep > step.id ? <Check className="w-4 h-4" /> : step.id}
            </div>
            <span
              className={cn(
                "ml-2 text-sm hidden lg:inline",
                currentStep >= step.id ? "text-foreground font-medium" : "text-muted-foreground",
              )}
            >
              {step.name}
            </span>
            {index < steps.length - 1 && (
              <div className={cn("w-12 lg:w-24 h-0.5 mx-2", currentStep > step.id ? "bg-primary" : "bg-muted")} />
            )}
          </div>
        ))}
      </div>

      {/* Mobile Step Indicator */}
      <div className="md:hidden text-center">
        <span className="text-sm text-muted-foreground">
          Step {currentStep} of {steps.length}: {steps[currentStep - 1].name}
        </span>
      </div>

      {/* Step Content */}
      <Card>
        <CardContent className="pt-6">
          {/* Step 1: Media Upload */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold mb-2">Upload Media Files</h2>
                <p className="text-sm text-muted-foreground">
                  Upload up to 10 files (images, videos, PDFs, or audio files)
                </p>
              </div>

              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                <input
                  type="file"
                  id="fileUpload"
                  className="hidden"
                  multiple
                  accept="image/*,video/*,audio/*,.pdf"
                  onChange={handleFileUpload}
                />
                <label htmlFor="fileUpload" className="cursor-pointer">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                      <Upload className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">Click to upload or drag and drop</p>
                      <p className="text-sm text-muted-foreground mt-1">PNG, JPG, PDF, MP4, MP3 (max 50MB per file)</p>
                    </div>
                  </div>
                </label>
              </div>

              {uploadedFiles.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Uploaded Files ({uploadedFiles.length}/10)</p>
                  <div className="grid gap-2">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          {getFileIcon(file.type)}
                          <div>
                            <p className="text-sm font-medium">{file.name}</p>
                            <p className="text-xs text-muted-foreground">{file.size}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => removeFile(index)}>
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Basic Information */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold mb-2">Basic Information</h2>
                <p className="text-sm text-muted-foreground">Provide essential details about your archive item</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    placeholder="Give your item a descriptive title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shortDescription">Short Description *</Label>
                  <Textarea
                    id="shortDescription"
                    placeholder="A brief summary of the item (1-2 sentences)"
                    value={formData.shortDescription}
                    onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                    className="resize-none"
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat.toLowerCase()}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dateStart">Date / Start Date</Label>
                    <Input
                      id="dateStart"
                      placeholder="e.g., 1890 or 1890-01-15"
                      value={formData.dateStart}
                      onChange={(e) => setFormData({ ...formData, dateStart: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dateEnd">End Date (if range)</Label>
                    <Input
                      id="dateEnd"
                      placeholder="e.g., 1899"
                      value={formData.dateEnd}
                      onChange={(e) => setFormData({ ...formData, dateEnd: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Context & Metadata */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold mb-2">Context & Metadata</h2>
                <p className="text-sm text-muted-foreground">Add location, people, and detailed context</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="Country, city, or specific site"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="coordinates">Coordinates (optional)</Label>
                  <Input
                    id="coordinates"
                    placeholder="e.g., 51.5074, -0.1278"
                    value={formData.coordinates}
                    onChange={(e) => setFormData({ ...formData, coordinates: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="peopleMentioned">Related Persons or Communities</Label>
                  <Input
                    id="peopleMentioned"
                    placeholder="Names of people or communities depicted or mentioned"
                    value={formData.peopleMentioned}
                    onChange={(e) => setFormData({ ...formData, peopleMentioned: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="longStory">Full Story / Narrative</Label>
                  <Textarea
                    id="longStory"
                    placeholder="Provide a detailed description, historical context, and any relevant narrative about this item..."
                    value={formData.longStory}
                    onChange={(e) => setFormData({ ...formData, longStory: e.target.value })}
                    className="min-h-[150px]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Tags & Privacy */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold mb-2">Tags & Privacy</h2>
                <p className="text-sm text-muted-foreground">Add searchable tags and set privacy level</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Tags</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a tag"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                    />
                    <Button type="button" variant="outline" onClick={addTag}>
                      Add
                    </Button>
                  </div>
                  {formData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="gap-1">
                          {tag}
                          <button onClick={() => removeTag(tag)} className="ml-1 hover:text-destructive">
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Privacy Level</Label>
                  <Select
                    value={formData.privacyLevel}
                    onValueChange={(value) => setFormData({ ...formData, privacyLevel: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public - Visible to everyone</SelectItem>
                      <SelectItem value="restricted">Restricted - Visible to verified users only</SelectItem>
                      <SelectItem value="private">Private - Only you and admins can see</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">Choose who can view this item after approval</p>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Review & Submit */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold mb-2">Review & Submit</h2>
                <p className="text-sm text-muted-foreground">Review your submission before sending for approval</p>
              </div>

              <div className="space-y-4 bg-muted/30 rounded-lg p-4">
                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Title</p>
                    <p className="font-medium">{formData.title || "Not provided"}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Category</p>
                    <p className="font-medium capitalize">{formData.category || "Not selected"}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Date</p>
                    <p className="font-medium">
                      {formData.dateStart || "Not provided"}
                      {formData.dateEnd && ` - ${formData.dateEnd}`}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Location</p>
                    <p className="font-medium">{formData.location || "Not provided"}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Files</p>
                    <p className="font-medium">{uploadedFiles.length} file(s)</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Privacy</p>
                    <p className="font-medium capitalize">{formData.privacyLevel}</p>
                  </div>
                </div>

                {formData.shortDescription && (
                  <div>
                    <p className="text-muted-foreground text-sm">Description</p>
                    <p className="text-sm mt-1">{formData.shortDescription}</p>
                  </div>
                )}

                {formData.tags.length > 0 && (
                  <div>
                    <p className="text-muted-foreground text-sm mb-2">Tags</p>
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-start gap-2">
                <Checkbox
                  id="terms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) => setFormData({ ...formData, agreeToTerms: checked as boolean })}
                />
                <Label htmlFor="terms" className="text-sm leading-tight cursor-pointer">
                  I confirm that I have the right to share these materials and they comply with the platform's
                  contribution guidelines.
                </Label>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
          <ChevronLeft className="w-4 h-4 mr-1" />
          Previous
        </Button>

        {currentStep < 5 ? (
          <Button onClick={nextStep}>
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        ) : (
          <Button onClick={handleSubmit} disabled={!formData.agreeToTerms || isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit for Review"}
          </Button>
        )}
      </div>
    </div>
  )
}
