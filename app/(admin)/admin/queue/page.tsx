"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Clock, User, MapPin, Calendar } from "lucide-react"
import Link from "next/link"

const submissions = [
  {
    id: 1,
    title: "Victorian Era Portrait Collection",
    contributor: "Historical Society of London",
    category: "Photography",
    location: "London, UK",
    submittedDate: "Nov 23, 2025",
    files: 4,
    thumbnail: "/placeholder.svg?key=vict1",
  },
  {
    id: 2,
    title: "Ancient Astronomical Manuscript",
    contributor: "University Archive Cairo",
    category: "Document",
    location: "Cairo, Egypt",
    submittedDate: "Nov 22, 2025",
    files: 12,
    thumbnail: "/placeholder.svg?key=manu2",
  },
  {
    id: 3,
    title: "Traditional Folk Music Recordings",
    contributor: "Ethnomusicology Department",
    category: "Audio",
    location: "Appalachia, USA",
    submittedDate: "Nov 21, 2025",
    files: 8,
    thumbnail: "/placeholder.svg?key=folk3",
  },
  {
    id: 4,
    title: "Medieval Stone Sculpture Documentation",
    contributor: "Florence Art Conservation",
    category: "Sculpture",
    location: "Florence, Italy",
    submittedDate: "Nov 20, 2025",
    files: 6,
    thumbnail: "/placeholder.svg?key=sculp4",
  },
  {
    id: 5,
    title: "Colonial Architecture Sketches",
    contributor: "Mumbai Architecture Institute",
    category: "Document",
    location: "Mumbai, India",
    submittedDate: "Nov 19, 2025",
    files: 15,
    thumbnail: "/placeholder.svg?key=arch5",
  },
]

export default function QueuePage() {
  const [categoryFilter, setCategoryFilter] = useState("all")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Submissions Queue</h1>
        <p className="text-muted-foreground">Review and moderate pending submissions</p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search submissions..." className="pl-10" />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="photography">Photography</SelectItem>
                <SelectItem value="document">Document</SelectItem>
                <SelectItem value="audio">Audio</SelectItem>
                <SelectItem value="sculpture">Sculpture</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Queue List */}
      <div className="space-y-4">
        {submissions.map((submission) => (
          <Card key={submission.id} className="overflow-hidden">
            <div className="flex flex-col sm:flex-row">
              <div className="sm:w-48 h-32 sm:h-auto bg-muted flex-shrink-0">
                <img
                  src={submission.thumbnail || "/placeholder.svg"}
                  alt={submission.title}
                  className="object-cover w-full h-full"
                />
              </div>
              <CardContent className="flex-1 p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{submission.category}</Badge>
                      <Badge className="bg-yellow-500/10 text-yellow-700 border-yellow-200">
                        <Clock className="w-3 h-3 mr-1" />
                        Pending
                      </Badge>
                    </div>
                    <h3 className="text-lg font-semibold">{submission.title}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {submission.contributor}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {submission.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {submission.submittedDate}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{submission.files} files uploaded</p>
                  </div>
                  <Link href={`/admin/queue/${submission.id}`}>
                    <Button>Open Review</Button>
                  </Link>
                </div>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2">
        <Button variant="outline" disabled>
          Previous
        </Button>
        <Button variant="outline">1</Button>
        <Button variant="outline">2</Button>
        <Button variant="outline">Next</Button>
      </div>
    </div>
  )
}
