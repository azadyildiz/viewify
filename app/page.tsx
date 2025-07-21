// page.tsx: Landing page for Viewify. Explains the tool, its serverless nature, and usage instructions.

import { Button } from "@/components/ui/button"
import { Github, Linkedin, ArrowRight, FileSearch } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"
import { cn } from "@/lib/utils"
import Script from "next/script"

export const metadata: Metadata = {
  title: "Viewify | Instant XML, JSON, & CSV Analysis Tool",
  description:
    "Analyze large XML, JSON, and CSV files instantly in your browser. Viewify is a high-performance, open-source tool for developers and data analysts.",
  keywords: [
    "xml viewer", 
    "json viewer", 
    "csv viewer", 
    "large file viewer", 
    "data analysis", 
    "developer tool",
    "xml parser",
    "json parser", 
    "csv parser",
    "data filtering",
    "file analysis",
    "data visualization"
  ],
  authors: [{ name: "Azad Yıldız" }],
  creator: "Azad Yıldız",
  publisher: "Viewify",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Viewify | Instant XML, JSON, & CSV Analysis Tool",
    description: "A high-performance, open-source tool to analyze large data files directly in your browser.",
    type: "website",
    url: "https://viewify.co",
    siteName: "Viewify",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Viewify - Data Analysis Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Viewify | Instant XML, JSON, & CSV Analysis Tool",
    description: "A high-performance, open-source tool to analyze large data files directly in your browser.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
}

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 text-black">
      {/* JSON-LD Structured Data */}
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Viewify",
            "description": "A high-performance, open-source tool to analyze large XML, JSON, and CSV files directly in your browser.",
            "url": "https://viewify.co",
            "applicationCategory": "DeveloperApplication",
            "operatingSystem": "Web Browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "author": {
              "@type": "Person",
              "name": "Azad Yıldız",
              "url": "https://github.com/azadyildiz/"
            },
            "creator": {
              "@type": "Person",
              "name": "Azad Yıldız"
            },
            "featureList": [
              "XML file analysis",
              "JSON file analysis", 
              "CSV file analysis",
              "Advanced filtering",
              "Search functionality",
              "Client-side processing",
              "Privacy-focused"
            ],
            "softwareVersion": "1.0.0",
            "datePublished": "2024-01-01",
            "dateModified": "2024-01-01"
          })
        }}
      />
      
      <header className="flex-1 flex items-center justify-center" role="banner">
        <div className="container mx-auto px-4 mt-12">
          <div className="max-w-3xl mx-auto text-center animate-fade-in-up" style={{ animationFillMode: "forwards" }}>
            <div className="flex justify-center items-center gap-3 mb-6">
              <FileSearch className="w-10 h-10 text-black" />
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-black">Viewify</h1>
            </div>

            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-800">
              Analyze Large Data Files, Instantly.
            </h2>

            <p className="mt-6 text-lg text-zinc-600 max-w-2xl mx-auto">
              Viewify is an{" "}
              <span className={cn("marker marker-green font-medium text-green-950")}>open-source tool</span> to
              progressively load and analyze large XML, JSON, and CSV files directly in your browser. <br />
              <span className={cn("marker marker-yellow font-medium text-yellow-950")}>
                Powerful filtering and search
              </span>
              , built for performance.
            </p>

            <div className="mt-8 flex justify-center gap-4">
              <Link href="/viewer">
                <Button
                  size="lg"
                  className="bg-black text-white  hover:bg-zinc-900 shadow-lg transition-colors duration-200"
                >
                  Go to Viewer <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>

            <div className="mt-8 max-w-2xl mx-auto bg-blue-50 border border-blue-200 text-blue-900 rounded-md px-4 py-3 text-base text-left">
              <strong>Serverless &amp; Private:</strong> This application works fully <b>client-side</b> (serverless). For privacy and security, <b>only files from your local device</b> can be analyzed. Remote URLs are not supported.
            </div>
          </div>
        </div>
      </header>

      <footer className="py-8">
        <div className="container mx-auto px-4 text-center text-zinc-500">
          <div className="mb-2">
            <p className="text-lg font-medium text-zinc-700 mb-2">Viewify</p>
            <p className="text-sm">A high-performance data analysis tool</p>
          </div>
          <div className="mb-2">
            <p className="text-sm">Developed with ❤️ by <a href="https://github.com/azadyildiz/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-medium">Azad Yıldız</a></p>
            <div className="flex justify-center gap-4 mt-2 text-xs">
              <a href="/privacy" className="text-zinc-500 hover:text-zinc-700">Privacy</a>
              <a href="/terms" className="text-zinc-500 hover:text-zinc-700">Terms</a>
              <a href="/cookies" className="text-zinc-500 hover:text-zinc-700">Cookies</a>
            </div>
          </div>
          <div className="flex justify-center items-center space-x-4">
            <a
              href="https://github.com/azadyildiz/"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
              aria-label="GitHub Profile"
            >
              <div className="w-10 h-10 rounded-full bg-zinc-200 group-hover:bg-zinc-300 flex items-center justify-center transition-all">
                <Github className="w-5 h-5 text-zinc-600 group-hover:text-zinc-800" />
              </div>
            </a>
            <a
              href="https://www.linkedin.com/in/azadyildiz/"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
              aria-label="LinkedIn Profile"
            >
              <div className="w-10 h-10 rounded-full bg-zinc-200 group-hover:bg-zinc-300 flex items-center justify-center transition-all">
                <Linkedin className="w-5 h-5 text-zinc-600 group-hover:text-zinc-800" />
              </div>
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
