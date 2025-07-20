/**
 * Centralized error handling and validation utilities
 */

export interface ValidationError {
  field: string
  message: string
}

export interface ProcessingError {
  type: "parsing" | "validation" | "network" | "unknown"
  message: string
  details?: unknown
}

/**
 * Validates file upload parameters
 */
export function validateFileUpload(file: File | null, dataType: string, dataSelector: string): ValidationError[] {
  const errors: ValidationError[] = []

  if (!file) {
    errors.push({ field: "file", message: "Please select a file to upload" })
    return errors
  }

  // Check file size (500MB limit)
  const maxSize = 500 * 1024 * 1024
  if (file.size > maxSize) {
    errors.push({ 
      field: "file", 
      message: `File size (${formatFileSize(file.size)}) exceeds the 500MB limit` 
    })
  }

  // Check file extension matches data type
  const extension = file.name.split(".").pop()?.toLowerCase()
  const expectedExtensions = {
    xml: ["xml"],
    json: ["json"],
    csv: ["csv"]
  }

  if (dataType in expectedExtensions && extension && !expectedExtensions[dataType as keyof typeof expectedExtensions].includes(extension)) {
    errors.push({ 
      field: "file", 
      message: `File extension (.${extension}) doesn't match selected data type (${dataType})` 
    })
  }

  // Validate data selector for non-CSV types
  if (dataType !== "csv" && (!dataSelector || dataSelector.trim().length === 0)) {
    errors.push({ 
      field: "dataSelector", 
      message: `Please specify a ${dataType.toUpperCase()} element name or array key` 
    })
  }

  return errors
}

/**
 * Validates file content based on data type
 */
export function validateFileContent(content: string, dataType: string): ProcessingError | null {
  try {
    switch (dataType) {
      case "json":
        // Check if content looks like HTML
        if (content.trim().startsWith("<") && (content.includes("<!DOCTYPE") || content.includes("<html"))) {
          return {
            type: "parsing",
            message: "The file appears to be HTML, not JSON. Please upload a valid JSON file."
          }
        }
        
        // Try to parse JSON
        JSON.parse(content)
        break

      case "xml":
        // Basic XML validation
        if (!content.trim().startsWith("<")) {
          return {
            type: "parsing",
            message: "The file doesn't appear to be valid XML. Please check the file format."
          }
        }
        break

      case "csv":
        // Basic CSV validation
        const lines = content.split(/\r?\n/)
        if (lines.length < 2) {
          return {
            type: "parsing",
            message: "The CSV file appears to be empty or has no data rows."
          }
        }
        break

      default:
        return {
          type: "validation",
          message: `Unsupported data type: ${dataType}`
        }
    }
  } catch (error) {
    return {
      type: "parsing",
      message: error instanceof Error ? error.message : "Failed to parse file content",
      details: error
    }
  }

  return null
}

/**
 * Formats file size for display
 */
function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

/**
 * Creates a user-friendly error message
 */
export function createErrorMessage(error: ProcessingError): string {
  switch (error.type) {
    case "parsing":
      return `Parsing Error: ${error.message}`
    case "validation":
      return `Validation Error: ${error.message}`
    case "network":
      return `Network Error: ${error.message}`
    default:
      return error.message || "An unexpected error occurred"
  }
}

/**
 * Safely executes a function with error handling
 */
export async function safeExecute<T>(
  fn: () => Promise<T>,
  errorHandler?: (error: Error) => void
): Promise<T | null> {
  try {
    return await fn()
  } catch (error) {
    const err = normalizeError(error);
    logError(err, 'safeExecute');
    if (errorHandler) {
      errorHandler(err);
    }
    return null;
  }
}

/**
 * Debounced error logging to prevent spam
 */
export function createErrorLogger() {
  const loggedErrors = new Set<string>()
  
  return (error: Error, context?: string) => {
    const errorKey = `${error.message}-${context || "unknown"}`
    
    if (!loggedErrors.has(errorKey)) {
      loggedErrors.add(errorKey)
      
      // Sadece development'ta log
      if (process.env.NODE_ENV === 'development') {
        console.error(`[${context || "App"}] Error:`, error)
      }
      
      // Clear old errors after 5 minutes
      setTimeout(() => loggedErrors.delete(errorKey), 5 * 60 * 1000)
    }
  }
}

/**
 * Her türlü hata nesnesini (string, number, object, Error) normalize ederek Error instance'ı döndürür.
 */
export function normalizeError(err: unknown): Error {
  if (err instanceof Error) return err;
  if (typeof err === 'string') return new Error(err);
  if (typeof err === 'object' && err !== null) {
    try {
      return new Error(JSON.stringify(err));
    } catch {
      return new Error('Unknown object error');
    }
  }
  return new Error(String(err));
}

/**
 * Hataları development'da console'a, production'da ise log servisine gönderir (şimdilik sadece console).
 */
export function logError(error: unknown, context?: string) {
  const normalized = normalizeError(error);
  if (process.env.NODE_ENV === 'development') {
     
    console.error('[Error]', context ? `[${context}]` : '', normalized);
  } else {
    // TODO: Send to production log service
    // fetch('/api/log', { method: 'POST', body: ... })
    // For now, just console
     
    console.error('[Error]', context ? `[${context}]` : '', normalized);
  }
} 