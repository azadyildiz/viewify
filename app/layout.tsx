import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster"
import { ErrorBoundaryWithToast } from "@/components/error-boundary"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
})

export const metadata: Metadata = {
  title: {
    default: "Viewify - Data Analysis Tool",
    template: "%s | Viewify",
  },
  description: "High-performance, progressively loaded XML, JSON, and CSV analysis tool.",
  keywords: [
    "xml viewer", 
    "json viewer", 
    "csv viewer", 
    "data analysis", 
    "file viewer", 
    "developer tool",
    "xml parser",
    "json parser",
    "csv parser",
    "data filtering",
    "large file viewer"
  ],
  authors: [{ name: "Azad Yıldız" }],
  creator: "Azad Yıldız",
  publisher: "Viewify",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://viewify.co"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://viewify.co",
    siteName: "Viewify",
    title: "Viewify - Data Analysis Tool",
    description: "High-performance, progressively loaded XML, JSON, and CSV analysis tool.",
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
    title: "Viewify - Data Analysis Tool",
    description: "High-performance, progressively loaded XML, JSON, and CSV analysis tool.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  generator: "Next.js",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="HVhqia_VBMOBtzj9aSRm1X3wLs0iZg3akzkkF46ujh8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={cn("min-h-screen font-sans antialiased", poppins.className)}>
        <ErrorBoundaryWithToast>
          {children}
        </ErrorBoundaryWithToast>
        <Toaster />
      </body>
    </html>
  )
}
