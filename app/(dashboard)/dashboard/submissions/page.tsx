"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, MoreHorizontal, Eye, Edit, Trash2, MapPin, Calendar } from "lucide-react"
import Link from "next/link"

type Submission = {
  id: number
  title: string
  category: string
  status: "draft" | "pending" | "approved" | "rejected" | "needs-info"
  date: string
  location: string
  thumbnail: string
}

const submissions: Submission[] = [
  {
    id: 1,
    title: "Victorian Era Portrait Collection",
    category: "Photography",
    status: "approved",
    date: "Nov 20, 2025",
    location: "London, UK",
    thumbnail: "/victorian-portraits.jpg",
  },
  {
    id: 2,
    title: "Ancient Manuscript on Astronomy",
    category: "Document",
    status: "pending",
    date: "Nov 18, 2025",
    location: "Cairo, Egypt",
    thumbnail: "/ancient-manuscript.jpg",
  },
  {
    id: 3,
    title: "Traditional Folk Music Recordings",
    category: "Audio",
    status: "pending",
    date: "Nov 15, 2025",
    location: "Appalachia, USA",
    thumbnail: "/folk-music.jpg",
  },
  {
    id: 4,
    title: "Medieval Stone Sculpture",
    category: "Sculpture",
    status: "rejected",
    date: "Nov 10, 2025",
    location: "Florence, Italy",
    thumbnail: "/medieval-sculpture.jpg",
  },
  {
    id: 5,
    title: "Colonial Architecture Sketches",
    category: "Document",
    status: "approved",
    date: "Nov 5, 2025",
    location: "Mumbai, India",
    thumbnail: "/architecture-sketches.jpg",
  },
  {
    id: 6,
    title: "Traditional Pottery Collection",
    category: "Artifact",
    status: "needs-info",
    date: "Nov 1, 2025",
    location: "Kyoto, Japan",
    thumbnail: "/traditional-pottery.jpg",
  },
]

export default function SubmissionsPage() {
  const [view, setView] = useState<"grid" | "list">("grid")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-500/10 text-green-700 border-green-200">Approved</Badge>
      case "pending":
        return <Badge className="bg-yellow-500/10 text-yellow-700 border-yellow-200">Pending</Badge>
      case "rejected":
        return <Badge className="bg-red-500/10 text-red-700 border-red-200">Rejected</Badge>
      case "needs-info":
        return <Badge className="bg-blue-500/10 text-blue-700 border-blue-200">Needs Info</Badge>
      default:
        return <Badge variant="secondary">Draft</Badge>
    }
  }

  const filteredSubmissions = submissions.filter((sub) => {
    if (statusFilter !== "all" && sub.status !== statusFilter) return false
    if (categoryFilter !== "all" && sub.category.toLowerCase() !== categoryFilter) return false
    return true
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">My Submissions</h1>
          <p className="text-muted-foreground">Manage your archive contributions</p>
        </div>
        <Link href="/dashboard/upload">
          <Button>Upload New Item</Button>
        </Link>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search submissions..." className="pl-10" />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="needs-info">Needs Info</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="photography">Photography</SelectItem>
                <SelectItem value="document">Document</SelectItem>
                <SelectItem value="artifact">Artifact</SelectItem>
                <SelectItem value="sculpture">Sculpture</SelectItem>
                <SelectItem value="audio">Audio</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredSubmissions.length} of {submissions.length} submissions
        </p>
        <div className="flex gap-2">
          <Button variant={view === "grid" ? "default" : "outline"} size="sm" onClick={() => setView("grid")}>
            Grid
          </Button>
          <Button variant={view === "list" ? "default" : "outline"} size="sm" onClick={() => setView("list")}>
            List
          </Button>
        </div>
      </div>

      {/* Grid View */}
      {view === "grid" && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSubmissions.map((submission) => (
            <Card key={submission.id} className="overflow-hidden">
              <div className="aspect-video bg-muted relative">
                <img
                  src={submission.thumbnail || "/placeholder.svg"}
                  alt={submission.title}
                  className="object-cover w-full h-full"
                />
                <div className="absolute top-2 right-2">{getStatusBadge(submission.status)}</div>
              </div>
              <CardContent className="p-4 space-y-3">
                <div>
                  <h3 className="font-semibold line-clamp-1">{submission.title}</h3>
                  <p className="text-sm text-muted-foreground">{submission.category}</p>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {submission.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {submission.date}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link href={`/explore/${submission.id}`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      <Eye className="w-3 h-3 mr-1" />
                      View
                    </Button>
                  </Link>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* List View */}
      {view === "list" && (
        <Card>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {filteredSubmissions.map((submission) => (
                <div key={submission.id} className="flex items-center gap-4 p-4">
                  <div className="w-20 h-14 rounded-md overflow-hidden bg-muted flex-shrink-0">
                    <img
                      src={submission.thumbnail || "/placeholder.svg"}
                      alt={submission.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold truncate">{submission.title}</h3>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span>{submission.category}</span>
                      <span>•</span>
                      <span>{submission.location}</span>
                      <span>•</span>
                      <span>{submission.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {getStatusBadge(submission.status)}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {filteredSubmissions.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No submissions found matching your filters.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
