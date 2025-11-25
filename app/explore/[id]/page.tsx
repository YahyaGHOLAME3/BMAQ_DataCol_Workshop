import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calendar, MapPin, Tag, User, ArrowLeft, Download, Share2 } from "lucide-react"
import Link from "next/link"

export default function ItemDetailPage() {
  // Mock data for a single archive item
  const item = {
    id: 1,
    title: "Victorian Era Portrait Collection",
    shortDescription:
      "A collection of formal portraits from Victorian-era London, showcasing the fashion and photography techniques of the late 19th century.",
    longDescription: `This remarkable collection consists of formal photographic portraits taken in London during the Victorian era, specifically between 1890 and 1899. The photographs were captured using the wet collodion process, which was the dominant photographic technique of that period.

The subjects of these portraits represent middle to upper-class Victorian society, dressed in the characteristic fashion of the era. The women wear elaborate dresses with high collars and corseted silhouettes, while the men are typically shown in formal suits with waistcoats.

These images provide invaluable insight into Victorian social customs, fashion, and the emerging art of portrait photography. They also demonstrate the technical sophistication of late 19th-century photography and the cultural importance placed on formal portraiture during this period.`,
    category: "Photography",
    date: "1890-1899",
    location: "London, United Kingdom",
    specificSite: "Various photography studios in Westminster and Kensington",
    tags: ["Victorian", "Portrait", "Photography", "19th Century", "London", "Fashion"],
    contributor: {
      name: "Historical Society of London",
      verified: true,
    },
    relatedPersons: "Various subjects from Victorian London society",
    language: "English",
    status: "approved",
    privacy: "public",
    dateSubmitted: "March 15, 2024",
    dateApproved: "March 18, 2024",
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">CA</span>
            </div>
            <span className="font-semibold text-foreground">Cultural Archive</span>
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
        {/* Back Button */}
        <Link href="/explore">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Archive
          </Button>
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Viewer */}
            <Card className="overflow-hidden">
              <div className="aspect-[16/10] bg-muted relative">
                <img
                  src={`/.jpg?height=600&width=960&query=${encodeURIComponent(item.title)}`}
                  alt={item.title}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-4 bg-muted/30 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">1 of 4 images</p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button size="sm" variant="outline">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </Card>

            {/* Description */}
            <Card className="p-6 space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="secondary">{item.category}</Badge>
                  <Badge variant="outline" className="bg-green-500/10 text-green-700 border-green-200">
                    Approved
                  </Badge>
                </div>
                <h1 className="text-3xl font-bold mb-2">{item.title}</h1>
                <p className="text-muted-foreground">{item.shortDescription}</p>
              </div>

              <Separator />

              <div>
                <h2 className="text-xl font-semibold mb-3">Full Description</h2>
                <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
                  {item.longDescription.split("\n\n").map((paragraph, i) => (
                    <p key={i} className="leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </Card>

            {/* Related Items */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Related Items</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[1, 2].map((i) => (
                  <Link key={i} href={`/explore/${i + 10}`}>
                    <Card className="overflow-hidden group cursor-pointer hover:shadow-md transition-shadow">
                      <div className="aspect-video bg-muted relative overflow-hidden">
                        <img
                          src={`/victorian-photography-.jpg?height=180&width=320&query=Victorian photography ${i}`}
                          alt={`Related item ${i}`}
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-3">
                        <h3 className="font-medium text-sm line-clamp-2">Victorian Street Photography Collection</h3>
                        <p className="text-xs text-muted-foreground mt-1">London, UK • 1895</p>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar - Metadata */}
          <div className="space-y-6">
            <Card className="p-6 space-y-4">
              <h2 className="font-semibold text-lg">Details</h2>

              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <Calendar className="w-4 h-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                  <div>
                    <div className="font-medium">Date</div>
                    <div className="text-muted-foreground">{item.date}</div>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                  <div>
                    <div className="font-medium">Location</div>
                    <div className="text-muted-foreground">{item.location}</div>
                    <div className="text-xs text-muted-foreground mt-1">{item.specificSite}</div>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start gap-3">
                  <User className="w-4 h-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                  <div>
                    <div className="font-medium">Contributor</div>
                    <div className="text-muted-foreground flex items-center gap-1">
                      {item.contributor.name}
                      {item.contributor.verified && (
                        <Badge variant="outline" className="ml-1 text-xs bg-blue-500/10 text-blue-700 border-blue-200">
                          Verified
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <div className="font-medium mb-2">Related Persons</div>
                  <div className="text-muted-foreground">{item.relatedPersons}</div>
                </div>

                <Separator />

                <div>
                  <div className="font-medium mb-2">Language</div>
                  <div className="text-muted-foreground">{item.language}</div>
                </div>
              </div>
            </Card>

            <Card className="p-6 space-y-4">
              <h2 className="font-semibold text-lg flex items-center gap-2">
                <Tag className="w-4 h-4" />
                Tags
              </h2>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag, i) => (
                  <Badge key={i} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </Card>

            <Card className="p-6 space-y-3 bg-muted/30">
              <h3 className="font-semibold text-sm">Archive Information</h3>
              <div className="text-xs text-muted-foreground space-y-1">
                <div>Submitted: {item.dateSubmitted}</div>
                <div>Approved: {item.dateApproved}</div>
                <div>Privacy: {item.privacy}</div>
              </div>
            </Card>

            <Card className="p-6 bg-primary/5 border-primary/20">
              <h3 className="font-semibold mb-2">AI Insights</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Coming soon: AI-powered analysis and metadata extraction
              </p>
              <Button variant="outline" size="sm" disabled>
                View AI Analysis
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
