import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Shield, Eye, Lock, Users, Globe, Settings, Mail } from "lucide-react"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Viewify - Learn how we protect your data and privacy.",
  alternates: {
    canonical: "/privacy",
  },
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-zinc-900 mb-2">Privacy Policy</h1>
            <p className="text-zinc-600">Last updated: January 1, 2024</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-none">
          <div className="space-y-8">
            {/* Introduction */}
            <section className="border-b border-zinc-200 pb-8">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <Eye className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-zinc-900">Introduction</h2>
              </div>
              <p className="text-zinc-700 leading-relaxed text-lg">
                Viewify ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website at <a href="https://viewify.co" className="text-blue-600 hover:text-blue-800 font-medium">viewify.co</a>.
              </p>
            </section>

            {/* Information We Collect */}
            <section className="border-b border-zinc-200 pb-8">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <Users className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-zinc-900">Information We Collect</h2>
              </div>
              
              <div className="space-y-6">
                <div className="bg-blue-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-zinc-900 mb-3">Analytics Data</h3>
                  <p className="text-zinc-700 mb-4">We use Cloudflare Analytics to understand how visitors interact with our website. This service collects:</p>
                  <ul className="space-y-2 text-zinc-700">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      Page view counts
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      Visitor locations (country-level only)
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      Device types (mobile/desktop)
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      Page loading speeds
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      Referrer sources
                    </li>
                  </ul>
                </div>

                <div className="bg-red-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-zinc-900 mb-3">No Personal Data Collection</h3>
                  <p className="text-zinc-700 mb-4"><strong>Important:</strong> Viewify is a client-side only application. We do not collect, store, or process any personal data, including:</p>
                  <ul className="space-y-2 text-zinc-700">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                      File contents you upload
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                      Personal information
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                      IP addresses (anonymized by Cloudflare)
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                      User behavior data
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How We Use Information */}
            <section className="border-b border-zinc-200 pb-8">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                  <Settings className="w-5 h-5 text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold text-zinc-900">How We Use Information</h2>
              </div>
              
              <div className="space-y-6">
                <div className="bg-purple-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-zinc-900 mb-3">Analytics Data</h3>
                  <p className="text-zinc-700 mb-4">We use analytics data to:</p>
                  <ul className="space-y-2 text-zinc-700">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                      Improve website performance
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                      Understand user behavior
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                      Optimize user experience
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                      Monitor site functionality
                    </li>
                  </ul>
                </div>

                <div className="bg-green-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-zinc-900 mb-3">No Data Processing</h3>
                  <p className="text-zinc-700 mb-4">Since Viewify processes all data client-side:</p>
                  <ul className="space-y-2 text-zinc-700">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      Files never leave your device
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      No data is transmitted to our servers
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      No personal information is stored
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      Complete privacy is maintained
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Data Storage and Retention */}
            <section className="border-b border-zinc-200 pb-8">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                  <Lock className="w-5 h-5 text-orange-600" />
                </div>
                <h2 className="text-2xl font-bold text-zinc-900">Data Storage and Retention</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-orange-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-zinc-900 mb-4">Analytics Data</h3>
                  <div className="space-y-3 text-zinc-700">
                    <div className="flex justify-between">
                      <span className="font-medium">Storage Location:</span>
                      <span>Cloudflare's global network</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Retention Period:</span>
                      <span>30 days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Anonymization:</span>
                      <span>All data is anonymized</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">GDPR Compliance:</span>
                      <span className="text-green-600 font-medium">Yes</span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-zinc-900 mb-4">User Files</h3>
                  <div className="space-y-3 text-zinc-700">
                    <div className="flex justify-between">
                      <span className="font-medium">Storage:</span>
                      <span>Never stored on our servers</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Processing:</span>
                      <span>Client-side only</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Transmission:</span>
                      <span>No data transmitted</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Retention:</span>
                      <span>No retention</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact Information */}
            <section>
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mr-4">
                  <Mail className="w-5 h-5 text-indigo-600" />
                </div>
                <h2 className="text-2xl font-bold text-zinc-900">Contact Information</h2>
              </div>
              
              <div className="bg-indigo-50 rounded-xl p-6">
                <p className="text-zinc-700 mb-4">If you have questions about this Privacy Policy, please contact us:</p>
                <div className="space-y-3 text-zinc-700">
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 text-indigo-600 mr-3" />
                    <span className="font-medium">Email:</span>
                    <a href="mailto:dev.azadyildiz@gmail.com" className="text-indigo-600 hover:text-indigo-800 ml-2">dev.azadyildiz@gmail.com</a>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-indigo-600 mr-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    <span className="font-medium">GitHub:</span>
                    <a href="https://github.com/azadyildiz/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 ml-2">@azadyildiz</a>
                  </div>
                  <div className="flex items-center">
                    <Globe className="w-5 h-5 text-indigo-600 mr-3" />
                    <span className="font-medium">Website:</span>
                    <a href="https://viewify.co" className="text-indigo-600 hover:text-indigo-800 ml-2">viewify.co</a>
                  </div>
                </div>
              </div>
            </section>

            <hr className="my-8 border-zinc-200" />
            <p className="text-sm text-zinc-500 text-center"><strong>This Privacy Policy is effective as of January 1, 2024.</strong></p>
          </div>
        </div>
      </div>
    </div>
  )
} 