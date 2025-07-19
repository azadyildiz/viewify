/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RotateCcw, Plus, Filter, Loader2, Eye } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ConditionalFilter } from "@/lib/types"
import { ConditionalFilterRow } from "./conditional-filter-row"
import { Input } from "@/components/ui/input"

/**
 * Defines the shape of the filters that have been applied.
 */
interface AppliedFilters {
  hiddenFields: Set<string>
  showEmptyFields: boolean
  conditionalFilters: ConditionalFilter[]
  filterLogic: "AND" | "OR"
  searchTerm: string
}

/**
 * Props for the FilterSection component.
 */
interface FilterSectionProps {
  fieldAnalysis: {
    allFields: string[]
    fieldCounts: Map<string, number>
  }
  appliedFilters: AppliedFilters
  onApplyFilters: (pendingFilters: AppliedFilters & { allFields?: string[] }, searchTerm: string) => void
  isLoading: boolean
  totalAppliedFilters: number
}

/**
 * AvailableFieldsSection: Available Fields UI ve state yönetimi
 */
interface AvailableFieldsSectionProps {
  fieldAnalysis: {
    allFields: string[]
    fieldCounts: Map<string, number>
  }
  hiddenFields: Set<string>
  onApply: (hiddenFields: Set<string>) => void
  isLoading?: boolean
}

export function AvailableFieldsSection({ fieldAnalysis, hiddenFields, onApply, isLoading = false }: AvailableFieldsSectionProps) {
  const [pendingHiddenFields, setPendingHiddenFields] = useState(new Set(hiddenFields))
  const [showAllFields, setShowAllFields] = useState(false)
  const isUserInteracting = React.useRef(false)
  const lastAppliedHiddenFields = React.useRef(new Set(hiddenFields))

  useEffect(() => {
    // Sadece gerçekten parent'tan gelen değişiklik varsa güncelle
    const currentHiddenFields = new Set(hiddenFields)
    const lastApplied = lastAppliedHiddenFields.current
    
    // Eğer kullanıcı etkileşimde değilse ve gerçekten değişiklik varsa güncelle
    if (!isUserInteracting.current && 
        (lastApplied.size !== currentHiddenFields.size ||
         !Array.from(lastApplied).every(field => currentHiddenFields.has(field)))) {
      setPendingHiddenFields(currentHiddenFields)
      lastAppliedHiddenFields.current = new Set(currentHiddenFields)
    }
  }, [hiddenFields])

  const initialDisplayLimit = 20
  const visibleFieldCount = showAllFields
    ? fieldAnalysis.allFields.length
    : Math.min(initialDisplayLimit, fieldAnalysis.allFields.length)
  const shouldShowToggleBadge = fieldAnalysis.allFields.length > initialDisplayLimit

  const toggleFieldVisibility = (field: string) => {
    isUserInteracting.current = true
    const newHidden = new Set(pendingHiddenFields)
    newHidden.has(field) ? newHidden.delete(field) : newHidden.add(field)
    setPendingHiddenFields(newHidden)
    requestAnimationFrame(() => { isUserInteracting.current = false })
  }

  const handleShowAll = () => {
    isUserInteracting.current = true
    setPendingHiddenFields(new Set())
    requestAnimationFrame(() => { isUserInteracting.current = false })
  }
  
  const handleHideAll = () => {
    isUserInteracting.current = true
    setPendingHiddenFields(new Set(fieldAnalysis.allFields))
    requestAnimationFrame(() => { isUserInteracting.current = false })
  }
  
  const handleApply = () => {
    isUserInteracting.current = true
    lastAppliedHiddenFields.current = new Set(pendingHiddenFields)
    onApply(new Set(pendingHiddenFields))
    requestAnimationFrame(() => { isUserInteracting.current = false })
  }

  const shownFieldCount = fieldAnalysis.allFields.filter(f => !hiddenFields.has(f)).length

  return (
    <Card className="flex flex-col justify-between p-4 gap-4">
      <CardHeader className="p-0">
        <CardTitle className="flex items-center justify-between text-base">
          <div className="flex items-center gap-3">
            <span>Visible Fields</span>
            <span className="text-xs font-normal text-muted-foreground">({shownFieldCount} shown)</span>
          </div>
          <div className="flex items-center gap-3">
            <button type="button" onClick={handleShowAll} className="text-sm font-medium text-foreground underline hover:text-muted-foreground py-1" disabled={isLoading}>Show All</button>
            <button type="button" onClick={handleHideAll} className="text-sm font-medium text-foreground underline hover:text-muted-foreground py-1" disabled={isLoading}>Hide All</button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="flex flex-wrap gap-1.5">
          {fieldAnalysis.allFields.slice(0, visibleFieldCount).map((field) => (
            <Badge
              key={field}
              variant="outline"
              className={cn(
                "cursor-pointer transition-colors text-xs font-normal py-0.5 px-1.5",
                isLoading ? "cursor-not-allowed opacity-50" : "",
                pendingHiddenFields.has(field)
                  ? "bg-red-100 border-red-200 text-red-800 hover:bg-red-200"
                  : "bg-green-100 border-green-200 text-green-800 hover:bg-green-200",
              )}
              onClick={() => !isLoading && toggleFieldVisibility(field)}
              title={`${fieldAnalysis.fieldCounts.get(field) || 0} items use this field`}
            >
              {field.replace(/\./g, ' > ')}
            </Badge>
          ))}
          {shouldShowToggleBadge && (
            <Badge
              variant="outline"
              className={cn("cursor-pointer text-xs font-normal py-0.5 px-1.5", isLoading ? "cursor-not-allowed opacity-50" : "")}
              onClick={() => !isLoading && setShowAllFields(!showAllFields)}
            >
              {showAllFields ? "Show less" : `+${fieldAnalysis.allFields.length - initialDisplayLimit} more`}
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end p-0">
        <Button variant="default" size="sm" onClick={handleApply} disabled={isLoading}>
          {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Eye className="w-4 h-4 mr-2" />}
          Apply Visibility
        </Button>
      </CardFooter>
    </Card>
  )
}

/**
 * A component that provides a comprehensive UI for filtering data,
 * including field visibility, conditional filters, and more.
 * It manages a "pending" state locally and only calls the onApplyFilters
 * callback when the user clicks the "Apply Filters" button.
 */
export const FilterSection = React.memo(function FilterSection({
  fieldAnalysis,
  appliedFilters,
  onApplyFilters,
  isLoading,
  totalAppliedFilters,
}: FilterSectionProps) {
  // --- PENDING state, managed locally within this component ---
  const [pendingFilters, setPendingFilters] = useState<AppliedFilters>(appliedFilters)
  const isUserInteracting = React.useRef(false)
  const lastAppliedFilters = React.useRef(appliedFilters)

  // Sync local pending state only when there's a significant change (like reset)
  // Don't sync on every minor change to prevent losing user input
  useEffect(() => {
    // Sadece gerçekten parent'tan gelen değişiklik varsa güncelle
    const currentFilters = appliedFilters
    const lastApplied = lastAppliedFilters.current
    
    // Eğer kullanıcı etkileşimde değilse ve gerçekten değişiklik varsa güncelle
    if (!isUserInteracting.current && 
        JSON.stringify(currentFilters) !== JSON.stringify(lastApplied)) {
      setPendingFilters(currentFilters)
      lastAppliedFilters.current = currentFilters
    }
  }, [appliedFilters])

  // Sync hidden fields immediately when they change (for warning display)
  useEffect(() => {
    const currentHiddenFields = appliedFilters.hiddenFields
    const currentPendingHiddenFields = pendingFilters.hiddenFields
    
    // Hidden fields değiştiğinde hemen güncelle (warning için)
    if (JSON.stringify(currentHiddenFields) !== JSON.stringify(currentPendingHiddenFields)) {
      setPendingFilters(prev => ({ ...prev, hiddenFields: currentHiddenFields }))
    }
  }, [appliedFilters.hiddenFields, pendingFilters.hiddenFields])



  /**
   * Updates a specific key in the pending filters state.
   */
  const updatePendingFilter = (key: keyof AppliedFilters, value: unknown) => {
    isUserInteracting.current = true
    setPendingFilters((prev) => ({ ...prev, [key]: value }))
    // For search term updates, reset the interaction flag immediately
    if (key === "searchTerm") {
      isUserInteracting.current = false
    } else {
      requestAnimationFrame(() => { isUserInteracting.current = false })
    }
  }

  /**
   * Calls the parent callback to apply the currently pending filters.
   */
  const handleApplyClick = () => {
    // Remove conditional filters that use hidden fields
    const cleanedConditionalFilters = pendingFilters.conditionalFilters.filter(filter => 
      !filter.field || !pendingFilters.hiddenFields.has(filter.field)
    )
    
    const visibleFields = fieldAnalysis.allFields.filter((f) => !pendingFilters.hiddenFields.has(f));
    
    // Apply filters with current search term from pending state
    const appliedFiltersWithCleanedConditionals = {
      ...pendingFilters,
      conditionalFilters: cleanedConditionalFilters,
      allFields: visibleFields
    }
    
    lastAppliedFilters.current = appliedFiltersWithCleanedConditionals
    
    onApplyFilters(
      appliedFiltersWithCleanedConditionals,
      pendingFilters.searchTerm // Use the current pending search term
    );
  }

  /**
   * Resets both pending and applied filters to their initial state.
   */
  const handleResetClick = () => {
    isUserInteracting.current = true
    const initialFilters: AppliedFilters = {
      hiddenFields: new Set<string>(),
      showEmptyFields: true,
      conditionalFilters: [],
      filterLogic: "AND",
      searchTerm: "",
    }
    const visibleFields = fieldAnalysis.allFields;
    setPendingFilters(initialFilters)
    lastAppliedFilters.current = initialFilters
    onApplyFilters(
      { 
        ...initialFilters, 
        conditionalFilters: [],
        allFields: visibleFields 
      },
      ""
    );
    requestAnimationFrame(() => { isUserInteracting.current = false })
  }

  const updateConditionalFilter = (id: string, key: keyof ConditionalFilter, value: string) => {
    isUserInteracting.current = true
    const updated = pendingFilters.conditionalFilters.map((filter) =>
      filter.id === id ? { ...filter, [key]: value } : filter,
    )
    setPendingFilters(prev => ({ ...prev, conditionalFilters: updated }))
    requestAnimationFrame(() => { isUserInteracting.current = false })
  }

  const addConditionalFilter = () => {
    isUserInteracting.current = true
    const newFilters = [
      ...pendingFilters.conditionalFilters,
      { id: Math.random().toString(36).substr(2, 9), field: "", condition: "contains", value: "" },
    ]
    setPendingFilters(prev => ({ ...prev, conditionalFilters: newFilters }))
    requestAnimationFrame(() => { isUserInteracting.current = false })
  }

  const removeConditionalFilter = (id: string) => {
    isUserInteracting.current = true
    const newFilters = pendingFilters.conditionalFilters.filter((f) => f.id !== id)
    setPendingFilters(prev => ({ ...prev, conditionalFilters: newFilters }))
    requestAnimationFrame(() => { isUserInteracting.current = false })
  }

  // Filter out hidden fields from conditional filtering options (her zaman parent'tan gelen appliedFilters ile güncel)
  const visibleFieldsForConditional = fieldAnalysis.allFields.filter(field => !appliedFilters.hiddenFields.has(field))
  
  // Check for conditional filters that use hidden fields
  const hiddenFieldFilters = pendingFilters.conditionalFilters.filter(filter => 
    filter.field && appliedFilters.hiddenFields.has(filter.field)
  )

  return (
    <fieldset disabled={isLoading}>
      <Card className="flex flex-col justify-between p-4 gap-4">
        <CardHeader className="p-0">
          <CardTitle className="flex items-center justify-between text-base">
            <div className="flex items-center gap-1">
              <span>Filters</span>
              {totalAppliedFilters > 0 && (
                <span className="ml-2 text-xs font-normal text-muted-foreground">({totalAppliedFilters} active)</span>
              )}
            </div>
            <Button className="h-auto py-1 text-sm" variant="outline" size="sm" onClick={handleResetClick} disabled={isLoading || totalAppliedFilters === 0}>
              <RotateCcw className="mr-2 size-2 " />
              Reset All
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-4">
            {/* Üst Kısım: Search */}
            <div className="space-y-2">
              <label htmlFor="filter-search" className="text-md md:text-base font-medium">Search</label>
              <Input
                id="filter-search"
                type="search"
                placeholder="Search in results..."
                value={pendingFilters.searchTerm}
                onChange={e => updatePendingFilter("searchTerm", e.target.value)}
                className="text-xs md:text-sm leading-none h-auto"
              />
            </div>

            {/* Alt Kısım: Conditional Filters */}
            <div className="space-y-2 pt-4 border-t">
              <div className="flex items-center justify-between">
                <h4 className="text-md md:text-base font-medium text-foreground">Conditional Filtering</h4>
                <div className="flex items-center gap-2">
                  <label className="text-xs font-medium">Logic:</label>
                  <Select
                    value={pendingFilters.filterLogic}
                    onValueChange={(value: "AND" | "OR") => updatePendingFilter("filterLogic", value)}
                    disabled={isLoading}
                  >
                    <SelectTrigger className="w-24 h-8 text-xs leading-none md:text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AND">AND</SelectItem>
                      <SelectItem value="OR">OR</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Hidden Field Warning */}
              {hiddenFieldFilters.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-md p-3" role="alert" aria-live="polite">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-1.5 flex-shrink-0" aria-hidden="true"></div>
                    <div className="text-xs text-red-800">
                      <p className="font-medium mb-1">Hidden field filters detected:</p>
                      <ul className="space-y-1">
                        {hiddenFieldFilters.map(filter => (
                          <li key={filter.id} className="text-red-700">
                            • {filter.field} will be removed when filters are applied
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
                
              {pendingFilters.conditionalFilters.map((filter) => (
                <ConditionalFilterRow
                  key={filter.id}
                  filter={filter}
                  onUpdate={updateConditionalFilter}
                  onRemove={removeConditionalFilter}
                  allFields={visibleFieldsForConditional}
                  disabled={isLoading}
                  isHiddenField={filter.field ? appliedFilters.hiddenFields.has(filter.field) : false}
                />
              ))}
              <Button variant="outline" size="sm" className="w-full" onClick={addConditionalFilter} disabled={isLoading}>
                <Plus className="w-4 h-4 mr-2" />
                Add Filter
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-0 flex justify-end">
          <Button variant="default" size="sm" onClick={handleApplyClick} disabled={isLoading}>
            {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Filter className="w-4 h-4 mr-2" />}
            Apply Filters
          </Button>
        </CardFooter>
      </Card>
    </fieldset>
  )
})
