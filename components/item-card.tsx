"use client"

import React, { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ConditionalFilter, FlexibleValue, DataItem } from "@/lib/types"
import { RenderField } from "./render-field"

interface ItemCardProps {
  item: DataItem
  index: number
  appliedSearchTerm: string
  appliedHiddenFields: Set<string>
  appliedConditionalFilters: ConditionalFilter[]
  isEmptyValue: (value: FlexibleValue) => boolean
  expandedValues: Set<string>
  toggleValueExpansion: (itemIndex: number, fieldKey: string) => void
  expandedCards: Set<string>
  toggleCardExpansion: (itemId: string) => void
  handleOpenCrawler: (item: DataItem) => void
  elementName: string
  showEmptyFields: boolean
  hideDetailsButton?: boolean
  detailsMaxLength?: number
}

// ItemCard: Renders a single data item as a card, with support for nested objects/arrays and field highlighting. Uses memoization for performance.

// Memoized ItemCard to prevent re-rendering all cards when only one expands/collapses.
const ItemCard = React.memo<ItemCardProps>(function ItemCard({
  item,
  index,
  appliedSearchTerm,
  appliedHiddenFields,
  appliedConditionalFilters,
  isEmptyValue,
  expandedValues,
  toggleValueExpansion,
  expandedCards,
  toggleCardExpansion,
  handleOpenCrawler,
  elementName,
  showEmptyFields,
  hideDetailsButton = false,
  detailsMaxLength,
}: ItemCardProps) {
  // Memoize the calculation of which fields to show for this specific card.
  const visibleItemFields = useMemo(() => {
    const fields = Object.entries(item).filter(([key, value]) => {
      if (key.startsWith("_")) return false // Internal fields
      if (appliedHiddenFields.has(key)) return false // User-hidden fields
      if (!showEmptyFields && isEmptyValue(value as FlexibleValue)) return false // Empty fields
      return true
    })

    // Sort fields to prioritize filtered and searched fields
    fields.sort(([keyA], [keyB]) => {
      // Since hasSearchTerm is in render-field.tsx, we can't directly use it here for sorting.
      // This sorting logic might need to be simplified or re-thought.
      // For now, let's just sort by whether the field is filtered.
      const isFilteredA = appliedConditionalFilters.some((f) => {
        const filterPath = f.field
        return filterPath === keyA || filterPath.startsWith(keyA + '.') || filterPath.startsWith(keyA + '[')
      })
      const isFilteredB = appliedConditionalFilters.some((f) => {
        const filterPath = f.field
        return filterPath === keyB || filterPath.startsWith(keyB + '.') || filterPath.startsWith(keyB + '[')
      })

      if (isFilteredA && !isFilteredB) return -1
      if (!isFilteredA && isFilteredB) return 1
      return 0
    })

    return fields
  }, [item, appliedHiddenFields, showEmptyFields, isEmptyValue, appliedConditionalFilters])

  // If no fields are visible after filtering, don't render the card at all.
  if (visibleItemFields.length === 0) return null

  const isCardExpanded = expandedCards.has(item._itemId as string)

  return (
    <Card
      key={`item-${index}`}
      className="h-fit flex flex-col min-w-0 w-full max-w-full overflow-x-auto"
    >
      <CardHeader className="pb-3 border-b border-border flex-shrink-0 w-full max-w-full min-w-0">
        <CardTitle className="text-lg flex items-center justify-between w-full max-w-full min-w-0">
                  <div className="flex items-center gap-2 truncate w-full max-w-full min-w-0">
          <span className="font-semibold truncate">
            {elementName} {(item._itemIndex as number) + 1}
          </span>
          <Badge variant="secondary">{String(visibleItemFields.length)} fields</Badge>
        </div>
        </CardTitle>
      </CardHeader>

      <CardContent className={cn("pt-4 flex-1 break-all w-full max-w-full min-w-0 overflow-x-auto", !isCardExpanded && "max-h-[300px] overflow-y-auto")}>
        {visibleItemFields.map(([key, value]) => (
          <RenderField
            key={key}
            fieldKey={key}
            value={value as FlexibleValue}
            path={key}
            index={index}
            appliedSearchTerm={appliedSearchTerm}
            appliedConditionalFilters={appliedConditionalFilters}
            expandedValues={expandedValues}
            toggleValueExpansion={toggleValueExpansion}
            detailsMaxLength={detailsMaxLength}
          />
        ))}
      </CardContent>

      <div className="p-3 flex justify-between items-center border-t border-border flex-shrink-0 w-full max-w-full min-w-0">
        <div>
          {!hideDetailsButton && (
            <Button variant="outline" size="sm" onClick={() => handleOpenCrawler(item as DataItem)} className="text-sm">
              <ExternalLink className="w-4 h-4 mr-1" />
              Details
            </Button>
          )}
        </div>
        <Button variant="ghost" size="sm" onClick={() => toggleCardExpansion(item._itemId as string)} className="text-xs">
          {isCardExpanded ? "Show Less" : "Show More"}
          {isCardExpanded ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />}
        </Button>
      </div>
    </Card>
  )
})

export default ItemCard
