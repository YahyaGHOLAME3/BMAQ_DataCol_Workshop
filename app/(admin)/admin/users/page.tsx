"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Search,
  MoreHorizontal,
  Shield,
  ShieldCheck,
  ShieldX,
  UserCog,
  Mail,
  Ban,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
} from "lucide-react"

type User = {
  id: number
  name: string
  email: string
  role: "visitor" | "contributor" | "admin"
  verificationStatus: "not-submitted" | "under-review" | "verified" | "rejected"
  country: string
  submissions: number
  joinedDate: string
  avatar: string
}

const users: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "contributor",
    verificationStatus: "verified",
    country: "United States",
    submissions: 12,
    joinedDate: "Jan 15, 2025",
    avatar: "/placeholder.svg?key=u1",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@museum.org",
    role: "admin",
    verificationStatus: "verified",
    country: "United Kingdom",
    submissions: 45,
    joinedDate: "Dec 10, 2024",
    avatar: "/placeholder.svg?key=u2",
  },
  {
    id: 3,
    name: "Ahmed Hassan",
    email: "ahmed@university.edu",
    role: "contributor",
    verificationStatus: "under-review",
    country: "Egypt",
    submissions: 8,
    joinedDate: "Feb 20, 2025",
    avatar: "/placeholder.svg?key=u3",
  },
  {
    id: 4,
    name: "Maria Garcia",
    email: "maria@archive.es",
    role: "contributor",
    verificationStatus: "not-submitted",
    country: "Spain",
    submissions: 3,
    joinedDate: "Mar 5, 2025",
    avatar: "/placeholder.svg?key=u4",
  },
  {
    id: 5,
    name: "Yuki Tanaka",
    email: "yuki@heritage.jp",
    role: "contributor",
    verificationStatus: "verified",
    country: "Japan",
    submissions: 21,
    joinedDate: "Nov 28, 2024",
    avatar: "/placeholder.svg?key=u5",
  },
  {
    id: 6,
    name: "Pierre Dubois",
    email: "pierre@history.fr",
    role: "contributor",
    verificationStatus: "rejected",
    country: "France",
    submissions: 0,
    joinedDate: "Mar 10, 2025",
    avatar: "/placeholder.svg?key=u6",
  },
]

export default function UsersPage() {
  const [roleFilter, setRoleFilter] = useState("all")
  const [verificationFilter, setVerificationFilter] = useState("all")
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const getVerificationBadge = (status: string) => {
    switch (status) {
      case "verified":
        return (
          <Badge className="bg-green-500/10 text-green-700 border-green-200 gap-1">
            <CheckCircle className="w-3 h-3" /> Verified
          </Badge>
        )
      case "under-review":
        return (
          <Badge className="bg-yellow-500/10 text-yellow-700 border-yellow-200 gap-1">
            <Clock className="w-3 h-3" /> Under Review
          </Badge>
        )
      case "rejected":
        return (
          <Badge className="bg-red-500/10 text-red-700 border-red-200 gap-1">
            <XCircle className="w-3 h-3" /> Rejected
          </Badge>
        )
      default:
        return (
          <Badge variant="secondary" className="gap-1">
            <AlertCircle className="w-3 h-3" /> Not Submitted
          </Badge>
        )
    }
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return (
          <Badge className="bg-primary/10 text-primary border-primary/20">
            <Shield className="w-3 h-3 mr-1" /> Admin
          </Badge>
        )
      case "contributor":
        return <Badge variant="outline">Contributor</Badge>
      default:
        return <Badge variant="secondary">Visitor</Badge>
    }
  }

  const filteredUsers = users.filter((user) => {
    if (roleFilter !== "all" && user.role !== roleFilter) return false
    if (verificationFilter !== "all" && user.verificationStatus !== verificationFilter) return false
    return true
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">User Management</h1>
          <p className="text-muted-foreground">Manage users and their roles</p>
        </div>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button>Invite User</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Invite New User</DialogTitle>
                <DialogDescription>Send an invitation email to add a new user</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Email Address</Label>
                  <Input type="email" placeholder="user@example.com" />
                </div>
                <div className="space-y-2">
                  <Label>Role</Label>
                  <Select defaultValue="contributor">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="contributor">Contributor</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Send Invitation</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search users..." className="pl-10" />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="contributor">Contributor</SelectItem>
                <SelectItem value="visitor">Visitor</SelectItem>
              </SelectContent>
            </Select>
            <Select value={verificationFilter} onValueChange={setVerificationFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Verification" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="under-review">Under Review</SelectItem>
                <SelectItem value="not-submitted">Not Submitted</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border bg-muted/30">
                <tr>
                  <th className="text-left p-4 font-medium text-sm">User</th>
                  <th className="text-left p-4 font-medium text-sm">Role</th>
                  <th className="text-left p-4 font-medium text-sm">Verification</th>
                  <th className="text-left p-4 font-medium text-sm hidden md:table-cell">Submissions</th>
                  <th className="text-left p-4 font-medium text-sm hidden lg:table-cell">Country</th>
                  <th className="text-left p-4 font-medium text-sm hidden lg:table-cell">Joined</th>
                  <th className="text-right p-4 font-medium text-sm">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-muted/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={user.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">{getRoleBadge(user.role)}</td>
                    <td className="p-4">{getVerificationBadge(user.verificationStatus)}</td>
                    <td className="p-4 hidden md:table-cell">{user.submissions}</td>
                    <td className="p-4 hidden lg:table-cell">{user.country}</td>
                    <td className="p-4 hidden lg:table-cell text-muted-foreground">{user.joinedDate}</td>
                    <td className="p-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setSelectedUser(user)}>
                            <UserCog className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="w-4 h-4 mr-2" />
                            Send Email
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {user.role !== "admin" && (
                            <DropdownMenuItem>
                              <ShieldCheck className="w-4 h-4 mr-2" />
                              Promote to Admin
                            </DropdownMenuItem>
                          )}
                          {user.role === "admin" && (
                            <DropdownMenuItem>
                              <ShieldX className="w-4 h-4 mr-2" />
                              Remove Admin
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Ban className="w-4 h-4 mr-2" />
                            Suspend User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* User Details Dialog */}
      <Dialog open={!!selectedUser} onOpenChange={(open) => !open && setSelectedUser(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={selectedUser.avatar || "/placeholder.svg"} />
                  <AvatarFallback>
                    {selectedUser.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">{selectedUser.name}</h3>
                  <p className="text-muted-foreground">{selectedUser.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Role</p>
                  <p className="font-medium capitalize">{selectedUser.role}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Verification</p>
                  <div className="mt-1">{getVerificationBadge(selectedUser.verificationStatus)}</div>
                </div>
                <div>
                  <p className="text-muted-foreground">Country</p>
                  <p className="font-medium">{selectedUser.country}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Submissions</p>
                  <p className="font-medium">{selectedUser.submissions}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Joined</p>
                  <p className="font-medium">{selectedUser.joinedDate}</p>
                </div>
              </div>

              <div className="flex gap-2">
                {selectedUser.verificationStatus === "under-review" && (
                  <>
                    <Button className="flex-1 bg-green-600 hover:bg-green-700">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Approve Verification
                    </Button>
                    <Button variant="destructive" className="flex-1">
                      <XCircle className="w-4 h-4 mr-2" />
                      Reject
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

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
