import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Cookie, Settings, Shield, Globe, Mail, Monitor } from "lucide-react"

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Cookie Policy for Viewify - Learn how we use cookies and similar technologies.",
  alternates: {
    canonical: "/cookies",
  },
}

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Cookie className="w-8 h-8 text-purple-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Cookie Policy</h1>
            <p className="text-gray-600">Last updated: January 1, 2024</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-none">
          <div className="space-y-8">
            {/* Introduction */}
            <section className="border-b border-gray-200 pb-8">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                  <Cookie className="w-5 h-5 text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Introduction</h2>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg">
                This Cookie Policy explains how Viewify ("we," "our," or "us") uses cookies and similar technologies when you visit our website at <a href="https://viewify.co" className="text-purple-600 hover:text-purple-800 font-medium">viewify.co</a>.
              </p>
            </section>

            {/* What Are Cookies */}
            <section className="border-b border-gray-200 pb-8">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <Settings className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">What Are Cookies</h2>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg">
                Cookies are small text files that are stored on your device when you visit a website. They help websites remember information about your visit, such as your preferred language and other settings.
              </p>
            </section>

            {/* How We Use Cookies */}
            <section className="border-b border-gray-200 pb-8">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">How We Use Cookies</h2>
              </div>
              
              <div className="space-y-6">
                <div className="bg-green-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Essential Cookies</h3>
                  <p className="text-gray-700 mb-4">These cookies are necessary for the website to function properly. They enable basic functions like page navigation and access to secure areas of the website.</p>
                  <p className="text-gray-700 font-medium mb-3">Examples:</p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      Session management
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      Security features
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      Load balancing
                    </li>
                  </ul>
                </div>

                <div className="bg-blue-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Analytics Cookies</h3>
                  <p className="text-gray-700 mb-4">We use Cloudflare Analytics to understand how visitors interact with our website. These cookies help us improve our service by collecting information about:</p>
                  <ul className="space-y-2 text-gray-700 mb-4">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      Page views and navigation
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      Time spent on pages
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      Device and browser information
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      Geographic location (country-level only)
                    </li>
                  </ul>
                  <p className="text-gray-700 font-medium mb-3">Cloudflare Analytics Cookies:</p>
                  <div className="bg-white rounded-lg p-4">
                    <div className="space-y-2 text-sm font-mono">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                        <code className="text-blue-600">__cf_bm</code> - Bot management and security
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                        <code className="text-blue-600">cf_clearance</code> - Security clearance
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                        Analytics cookies (anonymized)
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Performance Cookies</h3>
                  <p className="text-gray-700">These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.</p>
                </div>
              </div>
            </section>

            {/* Browser Settings */}
            <section className="border-b border-gray-200 pb-8">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                  <Monitor className="w-5 h-5 text-orange-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Your Cookie Choices</h2>
              </div>
              
              <div className="space-y-6">
                <div className="bg-orange-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Browser Settings</h3>
                  <p className="text-gray-700 mb-4">You can control cookies through your browser settings:</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center p-3 bg-white rounded-lg">
                      <Monitor className="w-5 h-5 text-orange-600 mr-3" />
                      <div>
                        <p className="font-medium text-gray-900">Chrome</p>
                        <p className="text-sm text-gray-600">Settings &gt; Privacy and security &gt; Cookies</p>
                      </div>
                    </div>
                    <div className="flex items-center p-3 bg-white rounded-lg">
                      <Monitor className="w-5 h-5 text-orange-600 mr-3" />
                      <div>
                        <p className="font-medium text-gray-900">Firefox</p>
                        <p className="text-sm text-gray-600">Options &gt; Privacy &amp; Security &gt; Cookies</p>
                      </div>
                    </div>
                    <div className="flex items-center p-3 bg-white rounded-lg">
                      <Monitor className="w-5 h-5 text-orange-600 mr-3" />
                      <div>
                        <p className="font-medium text-gray-900">Safari</p>
                        <p className="text-sm text-gray-600">Preferences &gt; Privacy &gt; Manage Website Data</p>
                      </div>
                    </div>
                    <div className="flex items-center p-3 bg-white rounded-lg">
                      <Monitor className="w-5 h-5 text-orange-600 mr-3" />
                      <div>
                        <p className="font-medium text-gray-900">Edge</p>
                        <p className="text-sm text-gray-600">Settings &gt; Cookies and site permissions &gt; Cookies</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Opt-Out Options</h3>
                  <p className="text-gray-700 mb-4">You can opt-out of analytics cookies by:</p>
                  <ol className="space-y-2 text-gray-700 list-decimal list-inside">
                    <li>Using browser privacy settings</li>
                    <li>Installing ad-blocking extensions</li>
                    <li>Contacting us to request data deletion</li>
                  </ol>
                </div>

                <div className="bg-blue-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Do Not Track</h3>
                  <p className="text-gray-700">We respect "Do Not Track" browser signals. If you enable this setting, we will not collect analytics data.</p>
                </div>
              </div>
            </section>

            {/* Contact Information */}
            <section>
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mr-4">
                  <Mail className="w-5 h-5 text-indigo-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Contact Information</h2>
              </div>
              
              <div className="bg-indigo-50 rounded-xl p-6">
                <p className="text-gray-700 mb-4">If you have questions about our use of cookies, please contact us:</p>
                <div className="space-y-3 text-gray-700">
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

            <hr className="my-8 border-gray-200" />
            <p className="text-sm text-gray-500 text-center"><strong>This Cookie Policy is effective as of January 1, 2024.</strong></p>
          </div>
        </div>
      </div>
    </div>
  )
} 