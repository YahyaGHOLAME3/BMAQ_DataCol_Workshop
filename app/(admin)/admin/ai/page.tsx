import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Brain, Database, AlertTriangle, FileText, ImageIcon, Music } from "lucide-react"

export default function AIInsightsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">AI Insights</h1>
        <p className="text-muted-foreground">Dataset readiness and AI integration status</p>
      </div>

      {/* Overview Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-4xl font-bold text-green-600">87%</p>
              <p className="text-sm text-muted-foreground mt-1">Dataset Readiness Score</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-4xl font-bold">2,691</p>
              <p className="text-sm text-muted-foreground mt-1">AI-Ready Items</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-4xl font-bold text-yellow-600">156</p>
              <p className="text-sm text-muted-foreground mt-1">Items Missing Metadata</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-4xl font-bold text-blue-600">12.4GB</p>
              <p className="text-sm text-muted-foreground mt-1">Total Dataset Size</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Metadata Quality */}
      <Card>
        <CardHeader>
          <CardTitle>Metadata Quality Breakdown</CardTitle>
          <CardDescription>Completeness of metadata fields across all items</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            {[
              { field: "Title", complete: 100 },
              { field: "Description", complete: 94 },
              { field: "Date/Period", complete: 88 },
              { field: "Location", complete: 82 },
              { field: "Tags/Keywords", complete: 76 },
              { field: "Related Persons", complete: 45 },
            ].map((item) => (
              <div key={item.field} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{item.field}</span>
                  <span className="font-medium">{item.complete}%</span>
                </div>
                <Progress value={item.complete} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Content Type Distribution */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Content Type Distribution</CardTitle>
            <CardDescription>Breakdown by media type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { type: "Images", icon: ImageIcon, count: 1847, percentage: 65 },
                { type: "Documents", icon: FileText, count: 654, percentage: 23 },
                { type: "Audio", icon: Music, count: 234, percentage: 8 },
                { type: "Other", icon: Database, count: 112, percentage: 4 },
              ].map((item) => (
                <div key={item.type} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{item.type}</span>
                      <span className="text-sm text-muted-foreground">{item.count} items</span>
                    </div>
                    <Progress value={item.percentage} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Items Needing Attention</CardTitle>
            <CardDescription>Issues that need manual review</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { issue: "Missing date information", count: 89, severity: "medium" },
                { issue: "No location data", count: 67, severity: "low" },
                { issue: "Missing description", count: 34, severity: "high" },
                { issue: "No tags assigned", count: 156, severity: "low" },
                { issue: "Low quality images", count: 12, severity: "medium" },
              ].map((item) => (
                <div key={item.issue} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <AlertTriangle
                      className={`w-4 h-4 ${
                        item.severity === "high"
                          ? "text-red-500"
                          : item.severity === "medium"
                            ? "text-yellow-500"
                            : "text-blue-500"
                      }`}
                    />
                    <span className="text-sm">{item.issue}</span>
                  </div>
                  <span className="text-sm font-medium">{item.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Features Coming Soon */}
      <Card className="border-dashed">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            AI Features (Coming Soon)
          </CardTitle>
          <CardDescription>Planned AI-powered capabilities for the archive</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: "OCR Text Extraction", description: "Extract text from documents and images", status: "planned" },
              { name: "Object Detection", description: "Identify objects and subjects in images", status: "planned" },
              { name: "Auto-Tagging", description: "Suggest tags based on content analysis", status: "in-development" },
              { name: "Historical Context", description: "Generate historical context for items", status: "planned" },
              { name: "Similar Item Search", description: "Find visually similar archive items", status: "planned" },
              {
                name: "Language Translation",
                description: "Translate descriptions to multiple languages",
                status: "planned",
              },
            ].map((feature) => (
              <div key={feature.name} className="p-4 rounded-lg bg-muted/30 space-y-2">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">{feature.name}</h4>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      feature.status === "in-development"
                        ? "bg-yellow-500/10 text-yellow-700"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {feature.status === "in-development" ? "In Development" : "Planned"}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
