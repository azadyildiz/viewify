"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Check, X } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ConditionalFilter } from "@/lib/types"
import { Input } from "./ui/input"

/**
 * Props for the ConditionalFilterRow component.
 */
interface ConditionalFilterRowProps {
  filter: ConditionalFilter
  allFields: string[]
  onUpdate: (id: string, key: keyof ConditionalFilter, value: string) => void
  onRemove: (id: string) => void
  disabled?: boolean
  isHiddenField?: boolean
}

/**
 * A list of available conditions for filtering.
 */
const conditionOptions = [
  { value: "equals", label: "Equals" },
  { value: "notEquals", label: "Not Equals" },
  { value: "contains", label: "Contains" },
  { value: "notContains", label: "Not Contains" },
  { value: "startsWith", label: "Starts With" },
  { value: "endsWith", label: "Ends With" },
  { value: "isEmpty", label: "Is Empty" },
  { value: "isNotEmpty", label: "Is Not Empty" },
]

/**
 * Renders a single row for a conditional filter, including field selection,
 * condition, value input, and a remove button.
 */
export function ConditionalFilterRow({ filter, allFields, onUpdate, onRemove, disabled = false, isHiddenField = false }: ConditionalFilterRowProps) {
  const [isFieldSelectOpen, setIsFieldSelectOpen] = useState(false)

  const isValueInputDisabled = filter.condition === "isEmpty" || filter.condition === "isNotEmpty"

  return (
    <div key={filter.id} className={cn(
      "grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_auto] gap-1.5 items-center p-2 rounded-md mt-2",
      disabled && "opacity-50",
      isHiddenField && "border border-red-300"
    )}>
      {/* Field Selection Popover */}
      <Popover open={isFieldSelectOpen} onOpenChange={setIsFieldSelectOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" className="w-full justify-between h-8 bg-transparent text-sm font-normal" disabled={disabled}>
            {filter.field ? filter.field.replace(/\./g, ' > ') : "Select Field"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
          <Command>
            <CommandInput placeholder="Search field..." />
            <CommandList>
              <CommandEmpty>No field found.</CommandEmpty>
              <CommandGroup>
                {allFields.map((field) => (
                  <CommandItem
                    key={field}
                    value={field}
                    onSelect={(currentValue) => {
                      onUpdate(filter.id, "field", currentValue)
                      setIsFieldSelectOpen(false)
                    }}
                  >
                    <Check className={cn("mr-2 h-4 w-4", filter.field === field ? "opacity-100" : "opacity-0")} />
                    {field.replace(/\./g, ' > ')}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Condition Selection Dropdown */}
      <Select value={filter.condition} onValueChange={(value) => onUpdate(filter.id, "condition", value)} disabled={disabled}>
        <SelectTrigger className="h-8 text-sm">
          <SelectValue placeholder="Select Condition" />
        </SelectTrigger>
        <SelectContent>
          {conditionOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Value Input */}
      <Input
        type="text"
        placeholder="Enter Value"
        value={filter.value}
        onChange={(e) => onUpdate(filter.id, "value", e.target.value)}
        className="h-8 text-sm"
        disabled={isValueInputDisabled || disabled}
      />

      {/* Remove Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onRemove(filter.id)}
        className="text-muted-foreground hover:bg-red-500/10 hover:text-red-500 h-8 w-8"
        aria-label="Remove filter"
        disabled={disabled}
      >
        <X className="w-4 h-4" />
      </Button>
    </div>
  )
}
