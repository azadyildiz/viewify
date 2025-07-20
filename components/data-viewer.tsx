/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client"

import { useReducer, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, FileText } from "lucide-react"
import { isEmptyValue } from "@/lib/performance-utils"
import ItemCard from "./item-card"
import { Pagination } from "./pagination"
import { FilterSection } from "./filter-section"
import { ItemDetailsDialog } from "./item-details-dialog"
import { MetadataDisplay } from "./metadata-display"
import { ItemCardSkeleton } from "./item-card-skeleton"
import React from "react"
import { AvailableFieldsSection } from "./filter-section"

// DataViewer: Displays processed data, metadata, and item cards. Handles pagination, filtering, and UI state. All logic is client-side.

// --- UI State Management (for things not related to data fetching) ---

/**
 * Defines the shape of the UI-specific state.
 */
interface DataViewerUIState {
  isItemDetailsDialogOpen: boolean
  selectedItemForDetails: unknown | null
  expandedValues: Set<string>
  expandedCards: Set<string>
}

/**
 * Defines the actions for the UI state.
 */
type DataViewerUIAction =
  | { type: "TOGGLE_ITEM_DETAILS"; payload: { isOpen: boolean; item?: unknown } }
  | { type: "TOGGLE_VALUE_EXPANSION"; payload: { itemIndex: number; fieldKey: string } }
  | { type: "TOGGLE_CARD_EXPANSION"; payload: string }
  | { type: "RESET_EXPANSION" }

/**
 * Reducer for managing UI-specific state like dialogs and expanded cards.
 */
function uiReducer(state: DataViewerUIState, action: DataViewerUIAction): DataViewerUIState {
  switch (action.type) {
    case "TOGGLE_ITEM_DETAILS":
      return {
        ...state,
        isItemDetailsDialogOpen: action.payload.isOpen,
        selectedItemForDetails: action.payload.item || null,
      }
    case "TOGGLE_VALUE_EXPANSION": {
      const newSet = new Set(state.expandedValues)
      const key = `${action.payload.itemIndex}-${action.payload.fieldKey}`
      newSet.has(key) ? newSet.delete(key) : newSet.add(key)
      return { ...state, expandedValues: newSet }
    }
    case "TOGGLE_CARD_EXPANSION": {
      const newSet = new Set(state.expandedCards)
      newSet.has(action.payload) ? newSet.delete(action.payload) : newSet.add(action.payload)
      return { ...state, expandedCards: newSet }
    }
    case "RESET_EXPANSION":
      return { ...state, expandedCards: new Set(), expandedValues: new Set() }
    default:
      return state
  }
}

// --- Component ---

/**
 * Props for the DataViewer component.
 */
import type { AppliedFilters } from "@/lib/types"

import type { DataProcessorState } from "@/hooks/use-data-processor"

interface DataViewerProps {
  state: DataProcessorState
  onReset: () => void
  onApplyFilters: (
    pendingFilters: Omit<AppliedFilters, "searchTerm">,
    newSearchTerm?: string,
  ) => void
  onPageChange: (page: number) => void
}

/**
 * The main component for displaying processed data.
 * It acts as a "presentational" component, receiving all its data and logic via props.
 * It manages its own UI state (dialogs, expanded items) internally.
 */
export function DataViewer({ state, onReset, onApplyFilters, onPageChange }: DataViewerProps) {
  const initialUIState: DataViewerUIState = {
    isItemDetailsDialogOpen: false,
    selectedItemForDetails: null,
    expandedValues: new Set(),
    expandedCards: new Set(),
  }
  const [uiState, uiDispatch] = useReducer(uiReducer, initialUIState)
  const [hiddenFields, setHiddenFields] = React.useState(state.appliedFilters.hiddenFields)
  React.useEffect(() => {
    setHiddenFields(state.appliedFilters.hiddenFields)
  }, [state.appliedFilters.hiddenFields])

  const processedData = state.processedData ?? { items: [], metadata: {} }
  const safeItems: unknown[] = Array.isArray(processedData?.items) ? processedData.items : [];
  
  // Reset card/value expansions when new data is loaded
  const metadata = state.processedData?.metadata
  React.useEffect(() => { uiDispatch({ type: "RESET_EXPANSION" }) }, [processedData])

  const itemLabel = "Item"
  
  // Safe pagination info retrieval
  const paginationInfo = state.processedData?.metadata?.pagination ?? {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    filteredItems: 0,
  };

  // Field analysis now comes from worker
  const fieldAnalysis = useMemo<{ allFields: string[]; fieldCounts: Map<string, number> }>(() => {
    const fieldAnalysisData = state.processedData?.metadata?.fieldAnalysis;
    if (!fieldAnalysisData ||
        !Array.isArray(fieldAnalysisData.allFields) ||
        !fieldAnalysisData.fieldCounts) {
      return { allFields: [], fieldCounts: new Map<string, number>() };
    }
    return {
      allFields: fieldAnalysisData.allFields as string[],
      fieldCounts: fieldAnalysisData.fieldCounts instanceof Map 
        ? fieldAnalysisData.fieldCounts 
        : new Map<string, number>(Object.entries(fieldAnalysisData.fieldCounts as Record<string, number>)),
    };
  }, [state.processedData?.metadata?.fieldAnalysis]);

  const safeFieldAnalysis: { allFields: string[]; fieldCounts: Map<string, number> } = fieldAnalysis;
  const safeHiddenFields: Set<string> = hiddenFields instanceof Set ? hiddenFields : new Set<string>();
  const safeShowEmptyFields: boolean = typeof state.appliedFilters.showEmptyFields === 'boolean' ? state.appliedFilters.showEmptyFields : true;
  const safeFilterLogic: "AND" | "OR" = state.appliedFilters.filterLogic === "OR" ? "OR" : "AND";

  // Memoized calculation of the total number of applied filters.
  const totalAppliedFilters = useMemo(
    () =>
      (state.appliedFilters.searchTerm ? 1 : 0) +
      state.appliedFilters.conditionalFilters.length,
    [state.appliedFilters],
  )

  // Memoize appliedFilters for FilterSection to ensure stable reference unless contents change
  const appliedFiltersForSection = useMemo(() => (
    {
      ...state.appliedFilters,
      hiddenFields: safeHiddenFields,
      showEmptyFields: safeShowEmptyFields,
      filterLogic: safeFilterLogic,
    }
  ), [state.appliedFilters, safeHiddenFields, safeShowEmptyFields, safeFilterLogic]);

  // Fallbacks for ReactNode/number
  const safeTotalItems = typeof paginationInfo.totalItems === 'number' ? paginationInfo.totalItems : 0;
  const safeFilteredItems = typeof paginationInfo.filteredItems === 'number' ? paginationInfo.filteredItems : 0;

  return (
    <div className="flex flex-col space-y-4">
      {/* Header Section */}
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center justify-between border-b border-border pb-4">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={onReset}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
          <div>
            <h2 className="text-2xl font-bold">Data Analysis Results</h2>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              {metadata?.truncated && <Badge variant="destructive">Processing Capped</Badge>}
            </div>
          </div>
        </div>
      </div>

      {/* Controls Section */}
      <div className="space-y-4">
        <MetadataDisplay
          dataSource={state.dataSource}
          fileName={state.fileName}
          metadata={metadata}
          totalItems={safeTotalItems}
          processingTime={metadata?.processingTime}
        />
        <div className="grid grid-cols-1 gap-4">
          {/* Sol Sütun: Available Fields */}
          <AvailableFieldsSection
            fieldAnalysis={safeFieldAnalysis}
            hiddenFields={safeHiddenFields}
            onApply={(newHiddenFields) => {
              setHiddenFields(newHiddenFields);
              onApplyFilters({
                ...state.appliedFilters,
                hiddenFields: newHiddenFields,
                showEmptyFields: safeShowEmptyFields,
                filterLogic: safeFilterLogic,
              }, state.appliedFilters.searchTerm);
            }}
            isLoading={state.isLoading}
          />
          {/* Sağ Sütun: Filters */}
          <FilterSection
            fieldAnalysis={safeFieldAnalysis}
            appliedFilters={appliedFiltersForSection}
            onApplyFilters={(pendingFilters, searchTerm) => {
              // Only pass visible (not hidden) fields as allFields
              const visibleFields = safeFieldAnalysis.allFields.filter((f: string) => !safeHiddenFields.has(f));
              onApplyFilters({
                ...pendingFilters,
                allFields: visibleFields,
                hiddenFields: safeHiddenFields,
                showEmptyFields: safeShowEmptyFields,
                filterLogic: pendingFilters.filterLogic === "OR" ? "OR" : "AND",
              }, searchTerm);
            }}
            isLoading={state.isLoading}
            totalAppliedFilters={totalAppliedFilters}
          />
        </div>
      </div>

      {/* Top Pagination */}
      <Pagination
        currentPage={paginationInfo.currentPage || 1}
        totalPages={paginationInfo.totalPages || 1}
        totalItems={safeFilteredItems}
        pageSize={36}
        onPageChange={onPageChange}
        isLoading={state.isLoading}
      />

      {/* Items Grid */}
      {state.isLoading && safeItems.length === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 12 }).map((_, index) => (
            <ItemCardSkeleton key={index} />
          ))}
        </div>
      ) : safeItems.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground/20" />
          <p className="text-lg text-muted-foreground">No data to display</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {safeItems.map((item: unknown, index: number) => (
            <ItemCard
              key={item._itemId || index}
              item={item}
              index={index}
              appliedSearchTerm={state.appliedFilters.searchTerm}
              appliedHiddenFields={safeHiddenFields}
              appliedConditionalFilters={state.appliedFilters.conditionalFilters}
              isEmptyValue={isEmptyValue}
              expandedValues={uiState.expandedValues}
              toggleValueExpansion={(itemIndex, fieldKey) =>
                uiDispatch({ type: "TOGGLE_VALUE_EXPANSION", payload: { itemIndex, fieldKey } })
              }
              expandedCards={uiState.expandedCards}
              toggleCardExpansion={(itemId) =>
                uiDispatch({ type: "TOGGLE_CARD_EXPANSION", payload: itemId })
              }
              handleOpenCrawler={(item) =>
                uiDispatch({ type: "TOGGLE_ITEM_DETAILS", payload: { isOpen: true, item } })
              }
              elementName={itemLabel}
              showEmptyFields={safeShowEmptyFields}
            />
          ))}
        </div>
      )}

      {/* Bottom Pagination */}
      <Pagination
        currentPage={paginationInfo.currentPage || 1}
        totalPages={paginationInfo.totalPages || 1}
        totalItems={safeFilteredItems}
        pageSize={60}
        onPageChange={onPageChange}
        isLoading={state.isLoading}
      />

      {/* Item Details Dialog */}
      <ItemDetailsDialog
        isOpen={uiState.isItemDetailsDialogOpen}
        onClose={() => uiDispatch({ type: "TOGGLE_ITEM_DETAILS", payload: { isOpen: false } })}
        selectedItem={uiState.selectedItemForDetails}
        elementName={itemLabel}
        searchTerm={state.appliedFilters.searchTerm}
        showEmptyFields={state.appliedFilters.showEmptyFields}
        conditionalFilters={state.appliedFilters.conditionalFilters}
        showCdataRaw={false}
        appliedHiddenFields={state.appliedFilters.hiddenFields}
      />
    </div>
  )
}
