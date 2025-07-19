import type { ConditionalFilter, DataItem, FlexibleValue, FilterCondition } from "./types"
import { hasSearchTerm } from "./utils"

function checkCondition(value: FlexibleValue, condition: FilterCondition, target: string): boolean {
  // Handle null and undefined values first
  if (value === null || value === undefined) {
    if (condition === "isEmpty") return true
    if (condition === "isNotEmpty") return false
    // For other conditions, null/undefined rarely matches unless target is also null/undefined
    return condition === "equals" ? String(value) === target : false
  }

  // Type-specific checks
  if (Array.isArray(value)) {
    switch (condition) {
      case "contains":
        return value.some(item => String(item).toLowerCase().includes(target.toLowerCase()))
      case "notContains":
        return !value.some(item => String(item).toLowerCase().includes(target.toLowerCase()))
      case "isEmpty":
        return value.length === 0
      case "isNotEmpty":
        return value.length > 0
      case "equals":
        return JSON.stringify(value) === target // Compare stringified version
      default:
        return false // Most conditions are not applicable to arrays as a whole
    }
  }

  if (typeof value === "object" && value !== null) {
    // For objects, we can check against a stringified version or values.
    const stringifiedValue = JSON.stringify(value).toLowerCase()
    switch (condition) {
      case "contains":
        // Check if any value within the object contains the target
        return Object.values(value).some(v => String(v).toLowerCase().includes(target.toLowerCase()))
      case "notContains":
        return !Object.values(value).some(v => String(v).toLowerCase().includes(target.toLowerCase()))
      case "isEmpty":
        return Object.keys(value).length === 0
      case "isNotEmpty":
        return Object.keys(value).length > 0
       case "equals":
        return stringifiedValue === target.toLowerCase()
      default:
        return false // Other conditions are ambiguous for objects
    }
  }
  
  // Default behavior for primitive types (string, number, boolean)
  const strValue = String(value).toLowerCase()
  const lowerTarget = target.toLowerCase()

  switch (condition) {
    case "equals":
      return strValue === lowerTarget
    case "notEquals":
      return strValue !== lowerTarget
    case "contains":
      return strValue.includes(lowerTarget)
    case "notContains":
      return !strValue.includes(lowerTarget)
    case "startsWith":
      return strValue.startsWith(lowerTarget)
    case "endsWith":
      return strValue.endsWith(lowerTarget)
    case "isEmpty":
      return strValue === ""
    case "isNotEmpty":
      return strValue !== ""
    case "greaterThan":
      // Use original value for numeric comparison to avoid string conversion issues
      return typeof value === 'number' ? value > parseFloat(target) : parseFloat(strValue) > parseFloat(target)
    case "lessThan":
      return typeof value === 'number' ? value < parseFloat(target) : parseFloat(strValue) < parseFloat(target)
    default:
      return true
  }
}

function collectFieldPaths(obj: Record<string, unknown>, prefix = ""): string[] {
  if (!obj || typeof obj !== "object") return []
  let paths: string[] = []
  Object.keys(obj).forEach((key) => {
    if (key.startsWith("_")) return
    const fullKey = prefix ? `${prefix}.${key}` : key
    paths.push(fullKey)
    const value = obj[key]
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      paths = paths.concat(collectFieldPaths(value as Record<string, unknown>, fullKey))
    }
  })
  return paths
}



export function applyFilters(
  data: DataItem[],
  filters: {
    searchTerm: string
    hiddenFields: Set<string>
    showEmptyFields: boolean
    conditionalFilters: ConditionalFilter[]
    filterLogic: "AND" | "OR"
    allFields?: string[]
  }
): DataItem[] {
  // Ensure data is valid
  if (!data || !Array.isArray(data)) {
    return [];
  }
  
  let filtered = data

  const allFields = Array.from(new Set(data.flatMap((item) => collectFieldPaths(item))))
  const activeFields = allFields.filter((field) => !filters.hiddenFields.has(field))

  const hasInvalidCondition = filters.conditionalFilters.some(
    (filter: ConditionalFilter) => filter.field && !activeFields.includes(filter.field)
  )
  if (hasInvalidCondition) {
    return []
  }

  if (filters.conditionalFilters && filters.conditionalFilters.length > 0) {
    filtered = filtered.filter((item: DataItem) => {
      const results = filters.conditionalFilters.map((filter: ConditionalFilter) => {
        if (filters.hiddenFields.has(filter.field)) return true
        const value = filter.field
          .split(".")
          .reduce((obj: unknown, key: string) => (obj ? (obj as Record<string, unknown>)[key] : undefined), item)
        return checkCondition(value as FlexibleValue, filter.condition as FilterCondition, filter.value)
      })
      return filters.filterLogic === "AND" ? results.every(Boolean) : results.some(Boolean)
    })
  }

  if (!filters.showEmptyFields) {
    filtered = filtered.filter((item: Record<string, unknown>) => {
      return Object.entries(item).some(
        ([key, val]) =>
          !filters.hiddenFields.has(key) && val !== null && val !== undefined && String(val).trim() !== ""
      )
    })
  }

  if (filters.searchTerm) {
    const visibleTopLevelFields = Array.from(
      new Set((filters.allFields || []).map((path) => path.split(".")[0]))
    )

    filtered = filtered.filter((item: Record<string, unknown>) => {
      return visibleTopLevelFields.some((key) => {
        if (key in item) {
          return hasSearchTerm(item[key], filters.searchTerm)
        }
        return false
      })
    })
  }

  return filtered
}
