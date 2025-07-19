import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, FileText, Shield, Users, Lock, Globe, Settings, Mail, AlertTriangle } from "lucide-react"

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for Viewify - Learn about our service terms and conditions.",
  alternates: {
    canonical: "/terms",
  },
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Terms of Service</h1>
            <p className="text-gray-600">Last updated: January 1, 2024</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-none">
          <div className="space-y-8">
            {/* Agreement to Terms */}
            <section className="border-b border-gray-200 pb-8">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <Shield className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Agreement to Terms</h2>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg">
                By accessing and using Viewify ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            {/* Description of Service */}
            <section className="border-b border-gray-200 pb-8">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                  <Settings className="w-5 h-5 text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Description of Service</h2>
              </div>
              <p className="text-gray-700 mb-4">Viewify is a client-side data analysis tool that allows users to:</p>
              <div className="bg-purple-50 rounded-xl p-6">
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                    Upload and analyze XML, JSON, and CSV files
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                    Filter and search through data
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                    View data in a structured format
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                    Process files directly in their browser
                  </li>
                </ul>
              </div>
            </section>

            {/* Use License */}
            <section className="border-b border-gray-200 pb-8">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Use License</h2>
              </div>
              <p className="text-gray-700 mb-4">Permission is granted to temporarily use Viewify for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
              <div className="bg-orange-50 rounded-xl p-6">
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                    Modify or copy the materials
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                    Use the materials for any commercial purpose or for any public display
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                    Attempt to reverse engineer any software contained on the website
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                    Remove any copyright or other proprietary notations from the materials
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                    Transfer the materials to another person or "mirror" the materials on any other server
                  </li>
                </ul>
              </div>
            </section>

            {/* User Responsibilities */}
            <section className="border-b border-gray-200 pb-8">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <Users className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">User Responsibilities</h2>
              </div>
              
              <div className="space-y-6">
                <div className="bg-green-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Acceptable Use</h3>
                  <p className="text-gray-700 mb-4">You agree to use Viewify only for lawful purposes and in accordance with these Terms. You agree not to:</p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      Upload files containing malicious code or viruses
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      Attempt to gain unauthorized access to the service
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      Use the service for any illegal or unauthorized purpose
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      Interfere with or disrupt the service or servers
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      Upload files that violate intellectual property rights
                    </li>
                  </ul>
                </div>

                <div className="bg-blue-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">File Upload Guidelines</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-gray-700">
                    <div className="flex justify-between">
                      <span className="font-medium">Maximum file size:</span>
                      <span>500MB</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Supported formats:</span>
                      <span>XML, JSON, CSV</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Processing:</span>
                      <span>Client-side only</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Storage:</span>
                      <span>No files stored on servers</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Privacy and Data Protection */}
            <section className="border-b border-gray-200 pb-8">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mr-4">
                  <Lock className="w-5 h-5 text-indigo-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Privacy and Data Protection</h2>
              </div>
              
              <div className="space-y-6">
                <div className="bg-indigo-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Client-Side Processing</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>
                      All file processing occurs in your browser
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>
                      No data is transmitted to our servers
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>
                      Files are never stored on our infrastructure
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>
                      Complete privacy is maintained
                    </li>
                  </ul>
                </div>

                <div className="bg-purple-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Analytics</h3>
                  <p className="text-gray-700">We use Cloudflare Analytics to improve our service. This collects anonymous usage statistics only. See our <a href="/privacy" className="text-purple-600 hover:text-purple-800 font-medium">Privacy Policy</a> for details.</p>
                </div>
              </div>
            </section>

            {/* Open Source License */}
            <section className="border-b border-gray-200 pb-8">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Open Source License</h2>
              </div>
              <p className="text-gray-700 mb-4">Viewify is released under the MIT License. You may:</p>
              <div className="bg-yellow-50 rounded-xl p-6">
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                    Use, modify, and distribute the software
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                    Use for commercial purposes
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                    Modify and distribute modified versions
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                    Use privately
                  </li>
                </ul>
                <p className="text-gray-700 mt-4">See the <a href="/LICENSE" target="_blank" className="text-yellow-600 hover:text-yellow-800 font-medium">LICENSE</a> file for full terms.</p>
              </div>
            </section>

            {/* Contact Information */}
            <section>
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Contact Information</h2>
              </div>
              
              <div className="bg-blue-50 rounded-xl p-6">
                <p className="text-gray-700 mb-4">If you have any questions about these Terms of Service, please contact us:</p>
                <div className="space-y-3 text-gray-700">
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 text-blue-600 mr-3" />
                    <span className="font-medium">Email:</span>
                    <a href="mailto:dev.azadyildiz@gmail.com" className="text-blue-600 hover:text-blue-800 ml-2">dev.azadyildiz@gmail.com</a>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-blue-600 mr-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    <span className="font-medium">GitHub:</span>
                    <a href="https://github.com/azadyildiz/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 ml-2">@azadyildiz</a>
                  </div>
                  <div className="flex items-center">
                    <Globe className="w-5 h-5 text-blue-600 mr-3" />
                    <span className="font-medium">Website:</span>
                    <a href="https://viewify.co" className="text-blue-600 hover:text-blue-800 ml-2">viewify.co</a>
                  </div>
                </div>
              </div>
            </section>

            <hr className="my-8 border-gray-200" />
            <p className="text-sm text-gray-500 text-center"><strong>These Terms of Service are effective as of January 1, 2024.</strong></p>
          </div>
        </div>
      </div>
    </div>
  )
} 