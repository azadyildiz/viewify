import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Data Viewer - Upload & Analyze Files",
  description: "Upload and analyze XML, JSON, and CSV files with advanced filtering and search capabilities. Client-side processing ensures complete privacy.",
  keywords: [
    "data analysis", 
    "file viewer", 
    "xml parser", 
    "json parser", 
    "csv parser", 
    "data filtering",
    "file upload",
    "data visualization",
    "client-side processing",
    "privacy-focused"
  ],
  alternates: {
    canonical: "/viewer",
  },
  openGraph: {
    title: "Viewify Data Viewer - Upload & Analyze Files",
    description: "Upload and analyze XML, JSON, and CSV files with advanced filtering and search capabilities. Client-side processing ensures complete privacy.",
    type: "website",
    url: "https://viewify.co/viewer",
    siteName: "Viewify",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Viewify Data Viewer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Viewify Data Viewer - Upload & Analyze Files",
    description: "Upload and analyze XML, JSON, and CSV files with advanced filtering and search capabilities.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function ViewerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 