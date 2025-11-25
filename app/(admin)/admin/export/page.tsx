"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Download, FileJson, FileSpreadsheet, Database, CheckCircle, AlertTriangle } from "lucide-react"

export default function ExportPage() {
  const [exportFormat, setExportFormat] = useState("json")
  const [isExporting, setIsExporting] = useState(false)
  const [exportProgress, setExportProgress] = useState(0)
  const [selectedFields, setSelectedFields] = useState({
    title: true,
    description: true,
    category: true,
    date: true,
    location: true,
    tags: true,
    contributor: true,
    metadata: true,
  })

  const recentExports = [
    { id: 1, name: "full_archive_export.json", date: "Nov 22, 2025", size: "12.4 MB", status: "completed" },
    { id: 2, name: "photography_items.csv", date: "Nov 20, 2025", size: "4.2 MB", status: "completed" },
    { id: 3, name: "metadata_export.json", date: "Nov 18, 2025", size: "2.1 MB", status: "completed" },
  ]

  const handleExport = () => {
    setIsExporting(true)
    setExportProgress(0)

    const interval = setInterval(() => {
      setExportProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsExporting(false)
          return 100
        }
        return prev + 10
      })
    }, 300)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Data Export</h1>
        <p className="text-muted-foreground">Export archive data in various formats</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Export Configuration */}
        <Card>
          <CardHeader>
            <CardTitle>Export Configuration</CardTitle>
            <CardDescription>Choose format and data fields to export</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Format Selection */}
            <div className="space-y-2">
              <Label>Export Format</Label>
              <div className="grid grid-cols-2 gap-4">
                <div
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                    exportFormat === "json" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                  }`}
                  onClick={() => setExportFormat("json")}
                >
                  <div className="flex items-center gap-3">
                    <FileJson className="w-8 h-8 text-primary" />
                    <div>
                      <p className="font-medium">JSON</p>
                      <p className="text-xs text-muted-foreground">Structured data format</p>
                    </div>
                  </div>
                </div>
                <div
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                    exportFormat === "csv" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                  }`}
                  onClick={() => setExportFormat("csv")}
                >
                  <div className="flex items-center gap-3">
                    <FileSpreadsheet className="w-8 h-8 text-green-600" />
                    <div>
                      <p className="font-medium">CSV</p>
                      <p className="text-xs text-muted-foreground">Spreadsheet compatible</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <Label>Category Filter</Label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="photography">Photography</SelectItem>
                  <SelectItem value="document">Documents</SelectItem>
                  <SelectItem value="artifact">Artifacts</SelectItem>
                  <SelectItem value="audio">Audio</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Status Filter */}
            <div className="space-y-2">
              <Label>Status Filter</Label>
              <Select defaultValue="approved">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="approved">Approved Only</SelectItem>
                  <SelectItem value="pending">Pending Only</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Field Selection */}
            <div className="space-y-3">
              <Label>Include Fields</Label>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(selectedFields).map(([key, value]) => (
                  <div key={key} className="flex items-center space-x-2">
                    <Checkbox
                      id={key}
                      checked={value}
                      onCheckedChange={(checked) => setSelectedFields({ ...selectedFields, [key]: checked as boolean })}
                    />
                    <Label htmlFor={key} className="capitalize cursor-pointer text-sm">
                      {key}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Export Button */}
            {isExporting ? (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Exporting...</span>
                  <span>{exportProgress}%</span>
                </div>
                <Progress value={exportProgress} />
              </div>
            ) : (
              <Button className="w-full" onClick={handleExport}>
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Export Statistics & Recent Exports */}
        <div className="space-y-6">
          {/* Statistics */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Export Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-muted/50 text-center">
                  <Database className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-2xl font-bold">2,847</p>
                  <p className="text-xs text-muted-foreground">Total Items</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50 text-center">
                  <CheckCircle className="w-6 h-6 mx-auto mb-2 text-green-600" />
                  <p className="text-2xl font-bold">2,691</p>
                  <p className="text-xs text-muted-foreground">Approved Items</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Exports */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Exports</CardTitle>
              <CardDescription>Previously generated export files</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentExports.map((export_) => (
                  <div key={export_.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      {export_.name.endsWith(".json") ? (
                        <FileJson className="w-8 h-8 text-primary" />
                      ) : (
                        <FileSpreadsheet className="w-8 h-8 text-green-600" />
                      )}
                      <div>
                        <p className="font-medium text-sm">{export_.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {export_.date} • {export_.size}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Warning */}
          <Card className="border-yellow-200 bg-yellow-500/5">
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm">Export Notice</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Exported data may contain sensitive information. Please handle with care and follow data protection
                    guidelines.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
