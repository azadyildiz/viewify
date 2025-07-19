/**
 * Performance optimization utilities
 */
import type { FlexibleValue } from "./types"

/**
 * Debounce function to limit API calls
 */
export function debounce<T extends (...args: unknown[]) => unknown>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Throttle function to limit execution frequency
 */
export function throttle<T extends (...args: unknown[]) => unknown>(func: T, limit: number): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

/**
 * Check if a value is empty for filtering purposes
 * @param value - The value to check
 * @returns true if empty, false otherwise
 */
export function isEmptyValue(value: FlexibleValue): boolean {
  if (value === null || value === undefined) return true
  if (typeof value === "string") return value.trim() === ""
  if (Array.isArray(value)) return value.length === 0
  if (typeof value === "object") {
    const meaningfulKeys = Object.keys(value).filter((k) => !k.startsWith("_") && !k.startsWith("@"))
    if (meaningfulKeys.length === 0) {
      if (value._text !== undefined) {
        return String(value._text).trim() === ""
      }
      return true
    }
  }
  return false
}

/**
 * Get nested value from object using dot notation
 * @param obj - The object to search
 * @param path - Dot-separated path (e.g. 'a.b.c')
 * @returns The nested value or undefined
 */
export function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  return path.split(".").reduce((acc: unknown, part: string) => {
    if (acc && typeof acc === 'object' && acc !== null) {
      return (acc as Record<string, unknown>)[part]
    }
    return undefined
  }, obj as unknown)
}

/**
 * Format file size for display
 * @param bytes - The file size in bytes
 * @returns Formatted string
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

/**
 * Create stable key for React components
 */
export function createStableKey(prefix: string, index: number, id?: string): string {
  return id ? `${prefix}-${id}` : `${prefix}-${index}`
}
