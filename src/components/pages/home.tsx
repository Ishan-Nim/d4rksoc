import { Button } from "@/components/ui/button";
import { ChevronRight, Settings } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Dark-themed navigation */}
      <header className="fixed top-0 z-50 w-full bg-[rgba(17,24,39,0.8)] backdrop-blur-md border-b border-gray-800">
        <div className="max-w-[1200px] mx-auto flex h-14 items-center justify-between px-4">
          <div className="flex items-center">
            <Link to="/" className="font-medium text-xl">
              SOCRadar Dashboard
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/dashboard">
              <Button
                variant="ghost"
                className="text-sm font-light hover:text-gray-300"
              >
                Dashboard
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button className="rounded-full bg-red-600 text-white hover:bg-red-700 text-sm px-4">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="pt-14">
        {/* Hero section */}
        <section className="py-20 text-center bg-gradient-to-b from-gray-900 to-gray-800">
          <h2 className="text-5xl font-semibold tracking-tight mb-1">
            SOCRadar Threat Intelligence
          </h2>
          <h3 className="text-2xl font-medium text-gray-300 mb-6">
            Comprehensive security monitoring for your digital assets
          </h3>
          <div className="flex justify-center space-x-6 text-xl text-red-400">
            <Link to="/" className="flex items-center hover:underline">
              Learn more <ChevronRight className="h-4 w-4" />
            </Link>
            <Link to="/dashboard" className="flex items-center hover:underline">
              Get started <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* Features section */}
        <section className="py-20 bg-gray-800 text-center">
          <h2 className="text-4xl font-semibold tracking-tight mb-1">
            Real-time Security Monitoring
          </h2>
          <h3 className="text-xl font-medium text-gray-300 mb-6">
            Comprehensive visibility into security threats
          </h3>
          <div className="flex justify-center space-x-6 text-lg text-red-400 mb-12">
            <Link to="/" className="flex items-center hover:underline">
              Explore features <ChevronRight className="h-4 w-4" />
            </Link>
            <Link to="/" className="flex items-center hover:underline">
              View documentation <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8 max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-900 p-8 rounded-2xl shadow-md border border-gray-700 text-left">
              <div className="h-12 w-12 bg-red-900/30 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-medium mb-2">ASM Vulnerabilities</h4>
              <p className="text-gray-400">
                Identify and remediate security vulnerabilities across your
                attack surface.
              </p>
            </div>
            <div className="bg-gray-900 p-8 rounded-2xl shadow-md border border-gray-700 text-left">
              <div className="h-12 w-12 bg-amber-900/30 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-amber-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-medium mb-2">Brand Impersonations</h4>
              <p className="text-gray-400">
                Detect and take down fraudulent websites and social media
                accounts impersonating your brand.
              </p>
            </div>
            <div className="bg-gray-900 p-8 rounded-2xl shadow-md border border-gray-700 text-left">
              <div className="h-12 w-12 bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-medium mb-2">Dark Web Mentions</h4>
              <p className="text-gray-400">
                Monitor dark web forums and marketplaces for mentions of your
                organization and data leaks.
              </p>
            </div>
          </div>
        </section>

        {/* Dashboard Preview */}
        <section className="py-16 bg-gray-900">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-semibold mb-8 text-center">
              Dashboard Overview
            </h2>
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-900 p-4 rounded-lg border border-red-800/40">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">Critical Vulnerabilities</h3>
                    <span className="bg-red-900/50 text-red-400 text-xs px-2 py-1 rounded">
                      High
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-red-500 mb-2">24</div>
                  <div className="text-xs text-gray-400">
                    +5 in the last 24 hours
                  </div>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg border border-amber-800/40">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">Brand Impersonations</h3>
                    <span className="bg-amber-900/50 text-amber-400 text-xs px-2 py-1 rounded">
                      Medium
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-amber-500 mb-2">
                    12
                  </div>
                  <div className="text-xs text-gray-400">
                    +2 in the last 24 hours
                  </div>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg border border-blue-800/40">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">Dark Web Mentions</h3>
                    <span className="bg-blue-900/50 text-blue-400 text-xs px-2 py-1 rounded">
                      Info
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-blue-500 mb-2">
                    37
                  </div>
                  <div className="text-xs text-gray-400">
                    +8 in the last 24 hours
                  </div>
                </div>
              </div>
              <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 mb-6">
                <h3 className="font-medium mb-4">Recent Alerts</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 border-l-4 border-red-600 bg-gray-800/50 rounded">
                    <div>
                      <div className="font-medium">
                        Critical SQL Injection Vulnerability
                      </div>
                      <div className="text-xs text-gray-400">
                        api.example.com
                      </div>
                    </div>
                    <div className="text-xs text-gray-400">10 min ago</div>
                  </div>
                  <div className="flex items-center justify-between p-2 border-l-4 border-amber-600 bg-gray-800/50 rounded">
                    <div>
                      <div className="font-medium">Phishing Site Detected</div>
                      <div className="text-xs text-gray-400">
                        secure-login-example.com
                      </div>
                    </div>
                    <div className="text-xs text-gray-400">25 min ago</div>
                  </div>
                  <div className="flex items-center justify-between p-2 border-l-4 border-blue-600 bg-gray-800/50 rounded">
                    <div>
                      <div className="font-medium">
                        Credentials Found on Dark Web
                      </div>
                      <div className="text-xs text-gray-400">
                        3 user accounts affected
                      </div>
                    </div>
                    <div className="text-xs text-gray-400">1 hour ago</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Integration Features */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-800">
          <div className="bg-gray-900 rounded-xl p-8 text-center border border-gray-700">
            <h2 className="text-3xl font-semibold tracking-tight mb-2">
              Webhook Alerts
            </h2>
            <h3 className="text-lg font-medium text-gray-300 mb-4">
              Real-time security notifications
            </h3>
            <div className="flex justify-center space-x-6 text-lg text-red-400 mb-6">
              <Link to="/" className="flex items-center hover:underline">
                Configure <ChevronRight className="h-4 w-4" />
              </Link>
              <Link to="/" className="flex items-center hover:underline">
                View examples <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-4 bg-gray-800 p-6 rounded-xl shadow-md border border-gray-700 max-w-sm mx-auto">
              <div className="space-y-3 text-left">
                <div className="p-3 bg-red-900/20 border border-red-900/30 rounded-md">
                  <div className="text-sm font-medium">Critical Alert</div>
                  <div className="text-xs text-gray-400">
                    Received: 2 minutes ago
                  </div>
                </div>
                <div className="p-3 bg-amber-900/20 border border-amber-900/30 rounded-md">
                  <div className="text-sm font-medium">Medium Alert</div>
                  <div className="text-xs text-gray-400">
                    Received: 15 minutes ago
                  </div>
                </div>
                <div className="p-3 bg-blue-900/20 border border-blue-900/30 rounded-md">
                  <div className="text-sm font-medium">Info Alert</div>
                  <div className="text-xs text-gray-400">
                    Received: 45 minutes ago
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-900 rounded-xl p-8 text-center border border-gray-700">
            <h2 className="text-3xl font-semibold tracking-tight mb-2">
              API Integration
            </h2>
            <h3 className="text-lg font-medium text-gray-300 mb-4">
              Connect with SOCRadar's powerful APIs
            </h3>
            <div className="flex justify-center space-x-6 text-lg text-red-400 mb-6">
              <Link to="/" className="flex items-center hover:underline">
                API Docs <ChevronRight className="h-4 w-4" />
              </Link>
              <Link to="/" className="flex items-center hover:underline">
                Get API Key <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-4 bg-gray-950 p-6 rounded-xl shadow-md border border-gray-700 max-w-sm mx-auto text-left">
              <pre className="text-green-400 text-xs font-mono overflow-x-auto">
                <code>
                  {`// Fetch security vulnerabilities
const { data } = await socradar.api
  .get('/vulnerabilities')
  .query({ severity: 'critical' })
  .limit(10);
`}
                </code>
              </pre>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 text-xs text-gray-400 border-t border-gray-800">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="border-b border-gray-800 pb-8 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-medium text-sm text-gray-200 mb-4">
                SOCRadar Dashboard
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="hover:underline">
                    Features
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:underline">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:underline">
                    API Reference
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:underline">
                    Examples
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-sm text-gray-200 mb-4">
                Resources
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="hover:underline">
                    Getting Started
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:underline">
                    Integration Guides
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:underline">
                    Tutorials
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:underline">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-sm text-gray-200 mb-4">
                Community
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="hover:underline">
                    GitHub
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:underline">
                    Discord
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:underline">
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:underline">
                    YouTube
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-sm text-gray-200 mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="hover:underline">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:underline">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:underline">
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:underline">
                    Licenses
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="py-4">
            <p>Copyright © 2025 SOCRadar Security. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
