/**
 * A central place for shared type definitions across the application.
 */

export interface ConditionalFilter {
  id: string
  field: string
  condition: string
  value: string
}

// Data item type - represents a single item in the dataset
export interface DataItem {
  [key: string]: unknown
}

// Metadata type for processed data
export interface ProcessedMetadata {
  itemCount: number
  pagination: {
    currentPage: number
    totalPages: number
    totalItems: number
    filteredItems: number
  }
  fields?: string[]
  [key: string]: unknown
}

// Processed data structure
export interface ProcessedData {
  items: DataItem[]
  metadata: ProcessedMetadata
}

// Field analysis result
export interface FieldAnalysis {
  [fieldName: string]: {
    count: number
    types: Set<string>
    sampleValues: string[]
  }
}

// Filter condition types
export type FilterCondition = 
  | 'equals' 
  | 'contains' 
  | 'startsWith' 
  | 'endsWith' 
  | 'greaterThan' 
  | 'lessThan'
  | 'notEquals'
  | 'notContains'
  | 'isEmpty'
  | 'isNotEmpty'

// Applied filters interface
export interface AppliedFilters {
  searchTerm: string
  conditionalFilters: ConditionalFilter[]
  hiddenFields?: Set<string>
  showEmptyFields?: boolean
  filterLogic?: "AND" | "OR"
  allFields?: string[]
}

// Worker message types
export interface WorkerMessage {
  type: string
  payload?: unknown
}

// Generic value type for flexible data handling
export type FlexibleValue = string | number | boolean | null | undefined | FlexibleValue[] | { [key: string]: FlexibleValue }

// Type for nested object values
export type NestedValue = string | number | boolean | null | undefined | NestedValue[] | Record<string, unknown>
