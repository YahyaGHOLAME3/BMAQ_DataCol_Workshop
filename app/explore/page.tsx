import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, SlidersHorizontal, MapPin, Calendar } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function ExplorePage() {
  const archiveItems = [
    {
      id: 1,
      title: "Dome of the Rock Historic View",
      category: "Photography",
      location: "Haram al-Sharif, Al-Quds",
      date: "1890-1910",
      contributor: "BMAQ Archive",
      status: "approved",
      image: "/dome-of-the-rock-jerusalem-historic-photograph-sep.jpg",
    },
    {
      id: 2,
      title: "Damascus Gate Market Scene",
      category: "Photography",
      location: "Bab al-Amud, Al-Quds",
      date: "1920-1930",
      contributor: "Al-Quds Heritage Foundation",
      status: "approved",
      image: "/damascus-gate-jerusalem-old-city-market-historic-p.jpg",
    },
    {
      id: 3,
      title: "Al-Aqsa Mosque Architecture",
      category: "Photography",
      location: "Al-Aqsa Compound, Al-Quds",
      date: "1900-1920",
      contributor: "Islamic Heritage Trust",
      status: "approved",
      image: "/al-aqsa-mosque-jerusalem-historic-architecture-pho.jpg",
    },
    {
      id: 4,
      title: "Old City Residential Quarter",
      category: "Photography",
      location: "Muslim Quarter, Al-Quds",
      date: "1930-1940",
      contributor: "Palestinian Memory Project",
      status: "approved",
      image: "/jerusalem-old-city-residential-street-historic-hom.jpg",
    },
    {
      id: 5,
      title: "Traditional Palestinian Embroidery",
      category: "Artifact",
      location: "Al-Quds, Palestine",
      date: "Early 20th Century",
      contributor: "Cultural Preservation Society",
      status: "approved",
      image: "/palestinian-embroidery-tatreez-traditional-textile.jpg",
    },
    {
      id: 6,
      title: "Ottoman Land Registry Document",
      category: "Document",
      location: "Al-Quds Archives",
      date: "1880-1900",
      contributor: "Historical Documents Foundation",
      status: "approved",
      image: "/ottoman-document-arabic-script-land-registry-histo.jpg",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/bmaq.jpeg"
              alt="BMAQ - Bayt Mal Al Quds Asharif Agency"
              width={40}
              height={40}
              className="rounded"
            />
            <div className="flex flex-col">
              <span className="font-semibold text-foreground leading-tight">BMAQ</span>
              <span className="text-xs text-muted-foreground">Al Quds Archive</span>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/explore">
              <Button variant="ghost">Browse Archive</Button>
            </Link>
            <Link href="/login">
              <Button variant="ghost">Log in</Button>
            </Link>
            <Link href="/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Explore the Al-Quds Archive</h1>
          <p className="text-muted-foreground">Browse and discover historical materials from the Holy City</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-card border border-border rounded-lg p-6 mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search by title, description, location, or keywords..." className="pl-10" />
            </div>
            <Button variant="outline">
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="photography">Photography</SelectItem>
                <SelectItem value="document">Document</SelectItem>
                <SelectItem value="artifact">Artifact</SelectItem>
                <SelectItem value="sculpture">Sculpture</SelectItem>
                <SelectItem value="audio">Audio</SelectItem>
                <SelectItem value="video">Video</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Time Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Periods</SelectItem>
                <SelectItem value="ottoman">Ottoman Era (1517-1917)</SelectItem>
                <SelectItem value="mandate">British Mandate (1917-1948)</SelectItem>
                <SelectItem value="early">Early 20th Century</SelectItem>
                <SelectItem value="medieval">Medieval Period</SelectItem>
                <SelectItem value="ancient">Ancient History</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="old-city">Old City (Al-Balda Al-Qadima)</SelectItem>
                <SelectItem value="muslim-quarter">Muslim Quarter</SelectItem>
                <SelectItem value="christian-quarter">Christian Quarter</SelectItem>
                <SelectItem value="haram">Haram al-Sharif</SelectItem>
                <SelectItem value="mount-olives">Mount of Olives (Jabal al-Zaytun)</SelectItem>
                <SelectItem value="greater-jerusalem">Greater Al-Quds</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{archiveItems.length}</span> items
          </p>
          <Select defaultValue="recent">
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="title">Title A-Z</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Archive Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {archiveItems.map((item) => (
            <Link key={item.id} href={`/explore/${item.id}`}>
              <Card className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow h-full">
                <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-3 left-3 bg-background/90 text-foreground border border-border">
                    {item.category}
                  </Badge>
                </div>
                <div className="p-4 space-y-3">
                  <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span className="line-clamp-1">{item.location}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Calendar className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>{item.date}</span>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-border">
                    <p className="text-xs text-muted-foreground">By {item.contributor}</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-2">
          <Button variant="outline" disabled>
            Previous
          </Button>
          <Button variant="outline">1</Button>
          <Button variant="outline">2</Button>
          <Button variant="outline">3</Button>
          <Button variant="outline">Next</Button>
        </div>
      </div>
    </div>
  )
}
