"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle, RefreshCw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { normalizeError, logError } from "@/lib/error-utils"

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error: Error; resetError: () => void }>
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    if (process.env.NODE_ENV === 'development') {
      console.error("Error caught by boundary:", error, errorInfo)
    }
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback
        return <FallbackComponent error={this.state.error!} resetError={this.resetError} />
      }

      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center" role="alert" aria-live="assertive">
          <AlertTriangle className="w-16 h-16 text-red-500 mb-4" aria-hidden="true" />
          <h2 className="text-2xl font-bold text-zinc-900 mb-2">Something went wrong</h2>
          <p className="text-zinc-600 mb-6 max-w-md">
            An unexpected error occurred. Please try refreshing the page or contact support if the problem persists.
          </p>
          <div className="flex gap-4">
            <Button onClick={this.resetError} variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
            <Button onClick={() => window.location.reload()}>
              Refresh Page
            </Button>
          </div>
          {process.env.NODE_ENV === "development" && this.state.error && (
            <details className="mt-6 text-left max-w-2xl">
              <summary className="cursor-pointer text-sm font-medium text-zinc-700 mb-2">
                Error Details (Development)
              </summary>
              <pre className="bg-zinc-100 p-4 rounded text-xs overflow-auto">
                {this.state.error.stack}
              </pre>
            </details>
          )}
        </div>
      )
    }

    return this.props.children
  }
}

// Hook to use toast in functional components
function ErrorBoundaryWithToast({ children }: { children: React.ReactNode }) {
  const { toast } = useToast()

  React.useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      const errorObj = normalizeError(event.error ?? event);
      logError(errorObj, 'window.onerror');
      toast({
        variant: "destructive",
        title: "Application Error",
        description: "An unexpected error occurred. Please refresh the page.",
      })
    }

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const errorObj = normalizeError(event.reason ?? event);
      logError(errorObj, 'window.onunhandledrejection');
      toast({
        variant: "destructive",
        title: "Network Error",
        description: "A network request failed. Please check your connection and try again.",
      })
    }

    window.addEventListener("error", handleError)
    window.addEventListener("unhandledrejection", handleUnhandledRejection)

    return () => {
      window.removeEventListener("error", handleError)
      window.removeEventListener("unhandledrejection", handleUnhandledRejection)
    }
  }, [toast])

  return <ErrorBoundary>{children}</ErrorBoundary>
}

export { ErrorBoundary, ErrorBoundaryWithToast } 