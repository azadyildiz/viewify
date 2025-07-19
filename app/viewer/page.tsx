"use client"

import { DataSourceForm } from "@/components/data-source-form"
import { DataViewer } from "@/components/data-viewer"
import { useDataProcessor } from "@/hooks/use-data-processor"

/**
 * The main page for the data analysis tool.
 * It uses the `useDataProcessor` hook to manage state and logic.
 * It conditionally renders either the data source form or the data viewer.
 */
export default function ViewerPage() {
  const { state, handleDataSubmit, handleReset, handleApplyFilters, handlePageChange } =
    useDataProcessor()

  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Conditional Rendering: Show form or viewer */}
        {!state.processedData ? (
          <>
            <DataSourceForm onSubmit={handleDataSubmit} isLoading={state.isLoading} />            
            {state.error && (
              <div className="mt-4 text-center" role="alert" aria-live="assertive">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-200 rounded-md">
                  <div className="w-2 h-2 bg-red-500 rounded-full" aria-hidden="true"></div>
                  <span className="text-red-700 font-medium">Error: {state.error}</span>
                </div>
              </div>
            )}
          </>
        ) : (
          <DataViewer
            state={state}
            onReset={handleReset}
            onApplyFilters={handleApplyFilters}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </main>
  )
}
