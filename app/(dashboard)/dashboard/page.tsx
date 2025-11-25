import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Upload, FileText, CheckCircle, Clock, XCircle, ArrowRight, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const stats = [
    { label: "Total Submissions", value: 12, icon: FileText, color: "text-foreground" },
    { label: "Approved", value: 8, icon: CheckCircle, color: "text-green-600" },
    { label: "Pending Review", value: 3, icon: Clock, color: "text-yellow-600" },
    { label: "Rejected", value: 1, icon: XCircle, color: "text-red-600" },
  ]

  const drafts = [
    { id: 1, title: "Victorian Era Photographs", category: "Photography", updatedAt: "2 hours ago" },
    { id: 2, title: "Ancient Manuscript Collection", category: "Document", updatedAt: "Yesterday" },
  ]

  const recentSubmissions = [
    { id: 1, title: "Traditional Pottery Collection", status: "approved", date: "Nov 20, 2025" },
    { id: 2, title: "Colonial Architecture Photos", status: "pending", date: "Nov 18, 2025" },
    { id: 3, title: "Folk Music Recordings", status: "pending", date: "Nov 15, 2025" },
    { id: 4, title: "Medieval Manuscript", status: "rejected", date: "Nov 10, 2025" },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-500/10 text-green-700 border-green-200">Approved</Badge>
      case "pending":
        return <Badge className="bg-yellow-500/10 text-yellow-700 border-yellow-200">Pending</Badge>
      case "rejected":
        return <Badge className="bg-red-500/10 text-red-700 border-red-200">Rejected</Badge>
      default:
        return <Badge variant="secondary">Draft</Badge>
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Welcome back, John</h1>
          <p className="text-muted-foreground">Here's an overview of your archive contributions</p>
        </div>
        <Link href="/dashboard/upload">
          <Button>
            <Upload className="w-4 h-4 mr-2" />
            Upload New Item
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className={cn("p-2 rounded-lg bg-muted", stat.color)}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Continue Drafts */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-muted-foreground" />
              Continue Your Drafts
            </CardTitle>
            <CardDescription>You have {drafts.length} unfinished submissions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {drafts.map((draft) => (
              <div
                key={draft.id}
                className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <div>
                  <p className="font-medium">{draft.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {draft.category} • Updated {draft.updatedAt}
                  </p>
                </div>
                <Link href={`/dashboard/upload?draft=${draft.id}`}>
                  <Button size="sm" variant="outline">
                    Continue
                  </Button>
                </Link>
              </div>
            ))}
            {drafts.length === 0 && <p className="text-muted-foreground text-center py-4">No drafts to continue</p>}
          </CardContent>
        </Card>

        {/* Recent Submissions */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">Recent Submissions</CardTitle>
              <CardDescription>Your latest archive contributions</CardDescription>
            </div>
            <Link href="/dashboard/submissions">
              <Button variant="ghost" size="sm">
                View all
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentSubmissions.map((submission) => (
                <div key={submission.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">{submission.title}</p>
                    <p className="text-xs text-muted-foreground">{submission.date}</p>
                  </div>
                  {getStatusBadge(submission.status)}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-3 gap-4">
            <Link href="/dashboard/upload">
              <div className="p-4 rounded-lg border border-dashed border-border hover:border-primary hover:bg-primary/5 transition-colors cursor-pointer text-center">
                <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <p className="font-medium">Upload New Item</p>
                <p className="text-xs text-muted-foreground mt-1">Add historical materials</p>
              </div>
            </Link>
            <Link href="/explore">
              <div className="p-4 rounded-lg border border-dashed border-border hover:border-primary hover:bg-primary/5 transition-colors cursor-pointer text-center">
                <FileText className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <p className="font-medium">Browse Archive</p>
                <p className="text-xs text-muted-foreground mt-1">Explore the collection</p>
              </div>
            </Link>
            <Link href="/dashboard/profile">
              <div className="p-4 rounded-lg border border-dashed border-border hover:border-primary hover:bg-primary/5 transition-colors cursor-pointer text-center">
                <CheckCircle className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <p className="font-medium">Complete Profile</p>
                <p className="text-xs text-muted-foreground mt-1">Add more details</p>
              </div>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ")
}
