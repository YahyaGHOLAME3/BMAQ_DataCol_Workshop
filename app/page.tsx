import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Search, Upload, Shield, Globe } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/morocco-flag.png"
              alt="Morocco"
              width={32}
              height={20}
              className="rounded-sm shadow-sm"
            />
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
            <Image
              src="/images/palestine-flag.png"
              alt="Palestine"
              width={32}
              height={20}
              className="rounded-sm shadow-sm"
            />
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

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="flex justify-center items-center gap-6 mb-6">
            <Image src="/images/morocco-flag.png" alt="Morocco" width={80} height={48} className="rounded shadow-md" />
            <Image
              src="/images/bmaq.jpeg"
              alt="BMAQ - Bayt Mal Al Quds Asharif Agency"
              width={100}
              height={100}
              className="rounded-lg"
            />
            <Image
              src="/images/palestine-flag.png"
              alt="Palestine"
              width={80}
              height={48}
              className="rounded shadow-md"
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-balance">
            Al-Quds Cultural & Historical Archive
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground text-pretty">
            Preserve, protect, and share the memory of the Holy City.
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            A secure platform by Bayt Mal Al-Quds Asharif Agency for uploading, organizing, and preserving historical
            materials from Jerusalem—from old photos and documents to artifacts and manuscripts. Together, we safeguard
            Palestinian heritage for future generations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/explore">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                <Search className="w-4 h-4 mr-2" />
                Browse Archive
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="lg" className="w-full sm:w-auto">
                <Upload className="w-4 h-4 mr-2" />
                Start Contributing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How the Platform Works</h2>
          <p className="text-muted-foreground text-lg">A simple process to preserve Al-Quds history</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="p-6 space-y-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Upload className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">1. Upload Materials</h3>
            <p className="text-muted-foreground">
              Share historical photos, documents, videos, artifacts, or any cultural materials from Jerusalem you want
              to preserve.
            </p>
          </Card>
          <Card className="p-6 space-y-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">2. Review & Verification</h3>
            <p className="text-muted-foreground">
              Our curators review submissions for authenticity and completeness, ensuring quality preservation.
            </p>
          </Card>
          <Card className="p-6 space-y-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Globe className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">3. Share & Preserve</h3>
            <p className="text-muted-foreground">
              Approved items become part of the public archive, accessible for research and cultural study.
            </p>
          </Card>
        </div>
      </section>

      {/* Why Archiving Matters */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Why Preserving Al-Quds Heritage Matters</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Jerusalem (Al-Quds) holds millennia of history, culture, and sacred significance. Every photograph,
              document, and artifact tells a story of the people who called this city home. Digital archiving ensures
              that the legacy of Jerusalem's communities, traditions, and historical events is preserved for
              researchers, future generations, and the world to learn from and appreciate.
            </p>
            <div className="grid sm:grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary">10K+</div>
                <div className="text-sm text-muted-foreground mt-1">Items Archived</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground mt-1">Contributors</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground mt-1">Countries</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sample Archive Items */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured From the Archive</h2>
          <p className="text-muted-foreground text-lg">Explore recently approved historical materials from Al-Quds</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            {
              title: "Dome of the Rock at Sunset",
              category: "Photography",
              location: "Old City, Al-Quds",
              date: "1920s",
              image: "/dome-of-the-rock-golden-sunset-jerusalem-historic-.jpg",
            },
            {
              title: "Ottoman Era Market Scene",
              category: "Photography",
              location: "Old City Souq, Al-Quds",
              date: "1900s",
              image: "/jerusalem-old-city-market-souq-ottoman-era-histori.jpg",
            },
            {
              title: "Al-Aqsa Mosque Manuscript",
              category: "Document",
              location: "Al-Aqsa Library, Al-Quds",
              date: "14th Century",
              image: "/ancient-arabic-manuscript-islamic-calligraphy-jeru.jpg",
            },
          ].map((item, i) => (
            <Card key={i} className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
              <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{item.category}</span>
                </div>
                <h3 className="font-semibold">{item.title}</h3>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div>{item.location}</div>
                  <div>{item.date}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link href="/explore">
            <Button size="lg" variant="outline">
              View Full Archive
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="container mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">Ready to Preserve Al-Quds History?</h2>
          <p className="text-lg max-w-2xl mx-auto opacity-90">
            Join hundreds of contributors from around the world in building a comprehensive archive of Jerusalem's
            cultural heritage with BMAQ.
          </p>
          <Link href="/signup">
            <Button size="lg" variant="secondary">
              Create Your Account
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <Link href="/" className="flex items-center gap-3">
                <Image
                  src="/images/morocco-flag.png"
                  alt="Morocco"
                  width={28}
                  height={18}
                  className="rounded-sm shadow-sm"
                />
                <Image src="/images/bmaq.jpeg" alt="BMAQ" width={40} height={40} className="rounded" />
                <Image
                  src="/images/palestine-flag.png"
                  alt="Palestine"
                  width={28}
                  height={18}
                  className="rounded-sm shadow-sm"
                />
              </Link>
              <div className="flex flex-col">
                <span className="font-semibold leading-tight">BMAQ</span>
                <span className="text-xs text-muted-foreground">Al Quds Archive</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Bayt Mal Al-Quds Asharif Agency - Preserving Jerusalem's cultural heritage for future generations.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/explore" className="hover:text-foreground">
                    Browse Archive
                  </Link>
                </li>
                <li>
                  <Link href="/about">About Us</Link>
                </li>
                <li>
                  <Link href="/guidelines">Contribution Guidelines</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/help">Help Center</Link>
                </li>
                <li>
                  <Link href="/research">For Researchers</Link>
                </li>
                <li>
                  <Link href="/api">API Access</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/privacy">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="/terms">Terms of Service</Link>
                </li>
                <li>
                  <Link href="/contact">Contact</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            © 2025 BMAQ - Bayt Mal Al-Quds Asharif Agency. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
