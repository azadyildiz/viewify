/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import ItemCard from "./item-card"
import type { ConditionalFilter } from "@/lib/types"
import { isEmptyValue } from "@/lib/performance-utils"
import { useState, useEffect } from "react"

interface ItemDetailsDialogProps {
  isOpen: boolean
  onClose: () => void
  selectedItem: unknown | null
  elementName: string
  searchTerm: string
  showEmptyFields: boolean
  conditionalFilters: ConditionalFilter[]
  appliedHiddenFields: Set<string>
}

export function ItemDetailsDialog({
  isOpen,
  onClose,
  selectedItem,
  elementName,
  searchTerm,
  showEmptyFields,
  conditionalFilters,
  appliedHiddenFields,
}: ItemDetailsDialogProps) {
  const [expandedValues, setExpandedValues] = useState(new Set<string>())
  const [expandedCards, setExpandedCards] = useState(new Set<string>())

  useEffect(() => {
    if (selectedItem?._itemId) {
      setExpandedCards(new Set([selectedItem._itemId]))
    }
  }, [selectedItem])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full min-w-0 h-[80vh] flex flex-col p-4 sm:p-6 overflow-x-auto sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Item Details</DialogTitle>
          <DialogDescription>View all fields and values for the selected {elementName} item.</DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto mt-4 w-full max-w-full min-w-0">
          {selectedItem ? (
            <div className="w-full max-w-full min-w-0 px-2 sm:px-0 overflow-x-auto">
              <div className="w-full max-w-full min-w-0">
              <ItemCard
                key={selectedItem._itemId}
                item={selectedItem}
                index={selectedItem._itemIndex}
                appliedSearchTerm={searchTerm}
                showEmptyFields={showEmptyFields}
                appliedConditionalFilters={conditionalFilters}
                appliedHiddenFields={appliedHiddenFields}
                isEmptyValue={isEmptyValue}
                expandedValues={expandedValues}
                toggleValueExpansion={(itemIndex, fieldKey) =>
                  setExpandedValues((prev) => {
                    const newSet = new Set(prev)
                    const key = `${itemIndex}-${fieldKey}`
                    newSet.has(key) ? newSet.delete(key) : newSet.add(key)
                    return newSet
                  })
                }
                expandedCards={expandedCards}
                toggleCardExpansion={(itemId) =>
                  setExpandedCards((prev) => {
                    const newSet = new Set(prev)
                    newSet.has(itemId) ? newSet.delete(itemId) : newSet.add(itemId)
                    return newSet
                  })
                }
                handleOpenCrawler={() => {}} // No-op inside the dialog
                elementName={elementName}
                hideDetailsButton={true}
                detailsMaxLength={40}
              />
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground">{elementName} information could not be loaded.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
