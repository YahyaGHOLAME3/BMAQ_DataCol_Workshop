import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { FileStack, Users, Database, Clock, AlertTriangle, ArrowRight, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function AdminOverviewPage() {
  const stats = [
    { label: "Pending Submissions", value: 12, icon: Clock, color: "text-yellow-600", bgColor: "bg-yellow-500/10" },
    { label: "Total Archive Items", value: "2,847", icon: Database, color: "text-blue-600", bgColor: "bg-blue-500/10" },
    { label: "Active Contributors", value: 523, icon: Users, color: "text-green-600", bgColor: "bg-green-500/10" },
    { label: "This Week", value: "+34", icon: TrendingUp, color: "text-primary", bgColor: "bg-primary/10" },
  ]

  const recentSubmissions = [
    {
      id: 1,
      title: "Victorian Era Portraits",
      contributor: "Historical Society",
      time: "2 hours ago",
      status: "pending",
    },
    {
      id: 2,
      title: "Ancient Manuscript Collection",
      contributor: "University Archive",
      time: "5 hours ago",
      status: "pending",
    },
    {
      id: 3,
      title: "Traditional Folk Music",
      contributor: "Ethnomusicology Dept",
      time: "1 day ago",
      status: "pending",
    },
  ]

  const metadataCompleteness = [
    { label: "Complete Metadata", value: 78 },
    { label: "Missing Location", value: 12 },
    { label: "Missing Date", value: 8 },
    { label: "Missing Description", value: 2 },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Overview of archive management</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
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
        {/* Recent Submissions Queue */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileStack className="w-5 h-5" />
                Pending Review
              </CardTitle>
              <CardDescription>Submissions awaiting your review</CardDescription>
            </div>
            <Link href="/admin/queue">
              <Button variant="ghost" size="sm">
                View all
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentSubmissions.map((submission) => (
                <div key={submission.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-md bg-muted overflow-hidden">
                      <img
                        src={`/ceholder-svg-key-s.jpg?key=s${submission.id}&height=48&width=48`}
                        alt=""
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{submission.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {submission.contributor} • {submission.time}
                      </p>
                    </div>
                  </div>
                  <Link href={`/admin/queue/${submission.id}`}>
                    <Button size="sm">Review</Button>
                  </Link>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Metadata Completeness */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Metadata Completeness</CardTitle>
            <CardDescription>Quality indicators for archive items</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {metadataCompleteness.map((item) => (
              <div key={item.label} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{item.label}</span>
                  <span className="font-medium">{item.value}%</span>
                </div>
                <Progress value={item.value} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* AI Insights Placeholder */}
      <Card className="border-dashed">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-600" />
            AI Dataset Readiness
          </CardTitle>
          <CardDescription>Automated analysis of archive quality</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-muted/50 text-center">
              <p className="text-3xl font-bold text-green-600">87%</p>
              <p className="text-sm text-muted-foreground">Dataset Readiness Score</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/50 text-center">
              <p className="text-3xl font-bold text-yellow-600">156</p>
              <p className="text-sm text-muted-foreground">Items Missing Metadata</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/50 text-center">
              <p className="text-3xl font-bold text-blue-600">2,691</p>
              <p className="text-sm text-muted-foreground">AI-Ready Items</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-4 text-center">AI integration features coming soon</p>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Link href="/admin/queue">
              <Button>
                <Clock className="w-4 h-4 mr-2" />
                Review Pending (12)
              </Button>
            </Link>
            <Link href="/admin/users">
              <Button variant="outline">
                <Users className="w-4 h-4 mr-2" />
                Manage Users
              </Button>
            </Link>
            <Link href="/admin/export">
              <Button variant="outline">
                <Database className="w-4 h-4 mr-2" />
                Export Data
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
