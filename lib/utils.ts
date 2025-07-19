import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

import type { FlexibleValue } from "./types"

/**
 * Recursively checks if a search term exists within a value (including nested objects and arrays).
 * This function is used for highlighting search results in the UI.
 */
export function hasSearchTerm(value: FlexibleValue, searchTerm: string): boolean {
  if (value === null || value === undefined || !searchTerm) {
    return false
  }
  const lowerCaseSearchTerm = searchTerm.toLowerCase()

  if (Array.isArray(value)) {
    return value.some(item => hasSearchTerm(item, lowerCaseSearchTerm))
  }
  if (typeof value === "object" && value !== null && !(value as Record<string, unknown>)._cdata) {
    return Object.values(value as Record<string, unknown>).some(nestedValue => hasSearchTerm(nestedValue as FlexibleValue, lowerCaseSearchTerm))
  }
  
  return String(value).toLowerCase().includes(lowerCaseSearchTerm)
}
