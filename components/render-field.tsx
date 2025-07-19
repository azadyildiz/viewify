"use client"

import React, { useMemo, useRef, useEffect, useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"
import { cn, hasSearchTerm } from "@/lib/utils"
import { formatValue } from "@/lib/display-utils"
import type { ConditionalFilter, FlexibleValue } from "@/lib/types"

interface RenderFieldProps {
  fieldKey: string
  value: FlexibleValue
  path: string
  index: number
  appliedSearchTerm: string
  appliedConditionalFilters: ConditionalFilter[]
  expandedValues: Set<string>
  toggleValueExpansion: (itemIndex: number, fieldKey: string) => void
  detailsMaxLength?: number
}

// A sub-component to render a single field. It can recursively render for nested objects/arrays.
export const RenderField = ({
  fieldKey,
  value,
  path,
  index,
  appliedSearchTerm,
  appliedConditionalFilters,
  expandedValues,
  toggleValueExpansion,
  detailsMaxLength,
}: RenderFieldProps) => {
  const isObject = typeof value === "object" && value !== null && !Array.isArray(value) && !value._cdata
  const isArray = Array.isArray(value)
  const expandKey = `${index}-${path}`
  const isExpanded = expandedValues.has(expandKey)
  const textRef = useRef<HTMLDivElement>(null)
  const [isOverflowing, setIsOverflowing] = useState(false)

  // Optimized overflow detection with debouncing
  const checkOverflow = useCallback(() => {
    if (textRef.current) {
      const element = textRef.current
      const isOverflow = element.scrollWidth > element.clientWidth || element.scrollHeight > element.clientHeight
      setIsOverflowing(isOverflow)
    }
  }, [])

  useEffect(() => {
    // Only check overflow for simple values that might be truncated
    if (!isObject && !isArray) {
      // Use requestAnimationFrame instead of setTimeout(0)
      const timeoutId = requestAnimationFrame(checkOverflow)
      
      // Debounced resize handler
      let resizeTimeout: NodeJS.Timeout
      const handleResize = () => {
        clearTimeout(resizeTimeout)
        resizeTimeout = setTimeout(checkOverflow, 100)
      }
      
      window.addEventListener('resize', handleResize)
      
      return () => {
        cancelAnimationFrame(timeoutId)
        clearTimeout(resizeTimeout)
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [value, isExpanded, isObject, isArray, checkOverflow])

  // Optimized filter and search term detection
  const isFilteredField = useMemo(() => {
    if (!appliedConditionalFilters.length) return false
    
    // Direct match
    if (appliedConditionalFilters.some((filter) => filter.field === path)) {
      return true
    }
    
    // Check if any nested child is filtered (for parent highlighting)
    if (isObject || isArray) {
      return appliedConditionalFilters.some((filter) => {
        const filterPath = filter.field
        return filterPath.startsWith(path + '.') || filterPath.startsWith(path + '[')
      })
    }
    
    return false
  }, [appliedConditionalFilters, path, isObject, isArray])

  const hasNestedSearchTerm = useMemo(() => {
    if (!appliedSearchTerm) return false
    return hasSearchTerm(value, appliedSearchTerm)
  }, [value, appliedSearchTerm])

  // Simple fields (string, number, etc.)
  if (!isObject && !isArray) {
    const { display, isTruncated, full } = formatValue(value, detailsMaxLength ?? 40, appliedSearchTerm)
    return (
      <div className="border-b border-gray-100 py-2 last:border-b-0 flex justify-between items-baseline flex-wrap">
        <div className="flex items-start justify-between gap-2 min-w-0">
                  <div className="text-sm font-medium break-words flex-grow min-w-0">
          <span className={cn((isFilteredField || hasNestedSearchTerm) && "bg-green-100 text-green-800 px-1 rounded-sm font-semibold")}>{fieldKey}</span>
        </div>
          {(isTruncated || isOverflowing) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleValueExpansion(index, path)}
              className="flex-shrink-0 h-6 px-2 text-xs whitespace-nowrap"
            >
              {isExpanded ? "hide" : "show"}
            </Button>
          )}
        </div>
        <div className="text-sm text-muted-foreground mt-1 w-auto max-w-full">
          {isExpanded ? (
            <div className="whitespace-pre-wrap break-all">{full}</div>
          ) : (
            <div 
              ref={textRef}
              className="text-overflow-container"
              style={{ maxWidth: '100%' }}
            >
              {display}
            </div>
          )}
        </div>
      </div>
    )
  }

  // Nested fields (objects or arrays)
  return (
    <div className="border-b border-gray-100 py-2 last:border-b-0 flex justify-between items-baseline flex-wrap">
      <div
        className="flex items-center justify-between gap-2 cursor-pointer min-w-0"
        onClick={() => toggleValueExpansion(index, path)}
      >
        <div className="text-sm font-medium break-words flex-grow min-w-0">
          <span className={cn((isFilteredField || hasNestedSearchTerm) && "bg-green-100 text-green-800 px-1 rounded-sm font-semibold")}>{fieldKey}</span>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="flex-shrink-0 h-6 w-6 text-xs"
          aria-label={isExpanded ? `Collapse ${fieldKey} field` : `Expand ${fieldKey} field`}
        >
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </Button>
      </div>
      {isExpanded && (
        <div className="pl-4 mt-2 border-l-2 border-border w-full">
          {isObject &&
            Object.entries(value)
              .filter(([key]) => !key.startsWith("@") && !key.startsWith("_"))
              .map(([key, val]) => (
                <RenderField
                  key={key}
                  fieldKey={key}
                  value={val}
                  path={`${path}.${key}`}
                  index={index}
                  appliedSearchTerm={appliedSearchTerm}
                  appliedConditionalFilters={appliedConditionalFilters}
                  expandedValues={expandedValues}
                  toggleValueExpansion={toggleValueExpansion}
                  detailsMaxLength={detailsMaxLength}
                />
              ))}
          {isArray &&
            value.map((val, i) => (
              <RenderField
                key={i}
                fieldKey={`${fieldKey}[${i}]`}
                value={val}
                path={`${path}[${i}]`}
                index={index}
                appliedSearchTerm={appliedSearchTerm}
                appliedConditionalFilters={appliedConditionalFilters}
                expandedValues={expandedValues}
                toggleValueExpansion={toggleValueExpansion}
                detailsMaxLength={detailsMaxLength}
              />
            ))}
        </div>
      )}
    </div>
  )
} 