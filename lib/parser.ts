import { XMLParser } from "fast-xml-parser";
import * as Papa from "papaparse";

/**
 * Recursively cleans up the object structure from fast-xml-parser.
 * It simplifies objects that only contain a "#text" property into a simple string.
 * @param obj The object to clean.
 * @returns The cleaned object.
 */
function cleanupParsedObject(obj: unknown): unknown {
  if (Array.isArray(obj)) {
    return obj.map(cleanupParsedObject);
  }
  if (obj !== null && typeof obj === 'object') {
    const keys = Object.keys(obj);
    if (keys.length === 1 && (keys[0] === '#text' || keys[0] === '__cdata')) {
      return obj[keys[0]];
    }
    
    const newObj: { [key: string]: unknown } = {};
    for (const key of keys) {
      newObj[key] = cleanupParsedObject(obj[key]);
    }
    return newObj;
  }
  return obj;
}

/**
 * Recursively searches for a key in a nested object and returns the corresponding array.
 * @param obj The object to search.
 * @param key The key to find.
 * @returns The found array or null.
 */
function findArrayRecursively(obj: unknown, key: string): unknown[] | null {
  if (!obj || typeof obj !== "object") {
    return null;
  }

  if (key in obj && Array.isArray(obj[key])) {
    return obj[key];
  }

  for (const prop in obj) {
    if (typeof obj[prop] === "object") {
      const found = findArrayRecursively(obj[prop], key);
      if (found) {
        return found;
      }
    }
  }

  return null;
}

export function parseData(
  source: { url?: string; fileContent?: string },
  type: "xml" | "json" | "csv",
  selector: string
): { data: Record<string, unknown>[]; metadata: Record<string, unknown> } {
  let data: Record<string, unknown>[] = []
  let metadata: Record<string, unknown> = {}
  const startTime = performance.now()

  try {
    if (!source.fileContent) {
      throw new Error("No file content provided")
    }
    if (type === "json") {
      let raw = source.fileContent || "[]"
      if (raw.trim().startsWith("<") && (raw.includes("<!DOCTYPE") || raw.includes("<html>"))) {
        throw new Error("The file appears to be HTML, not JSON. Please upload a valid JSON file.")
      }
      let parsed = JSON.parse(raw)
      let selected = parsed
      if (selector && selector.trim().length > 0) {
        function findArrayByKey(obj: unknown, key: string): unknown {
          if (!obj || typeof obj !== "object") return undefined
          if (Array.isArray(obj)) {
            for (const item of obj) {
              const found = findArrayByKey(item, key)
              if (found) return found
            }
          } else {
            for (const k of Object.keys(obj)) {
              if (k === key && Array.isArray(obj[k])) {
                return obj[k]
              }
              const found = findArrayByKey(obj[k], key)
              if (found) return found
            }
          }
          return undefined
        }
        const found = findArrayByKey(parsed, selector)
        if (Array.isArray(found)) {
          selected = found
        } else {
          throw new Error(`Array with key '${selector}' not found in JSON.`)
        }
      }
      if (Array.isArray(selected)) {
        data = selected
      } else {
        throw new Error(`Selector '${selector}' does not point to an array in JSON.`)
      }
      metadata.linesRead = data.length
    } else if (type === "csv") {
      const result = Papa.parse(source.fileContent || "", {
        header: true,
        skipEmptyLines: true,
      });

      if (result.errors.length > 0) {
        // Take the first error as the most relevant one.
        const error = result.errors[0];
        throw new Error(`CSV Parsing Error: ${error.message} on row ${error.row}.`);
      }
      
      data = result.data as Record<string, unknown>[];
      metadata.linesRead = result.data.length + (result.meta.delimiter ? 1 : 0); // data + header
    } else if (type === "xml") {
      const xmlContent: string = typeof source.fileContent === "string" ? source.fileContent : ""
      
      const parser = new XMLParser({
        ignoreAttributes: false,
        attributeNamePrefix: "@_",
        textNodeName: "#text",
        parseAttributeValue: true,
        allowBooleanAttributes: true,
        trimValues: true,
        cdataPropName: "__cdata",
        isArray: (tagName: string) => tagName === selector,
      });

      const parsedJson = parser.parse(xmlContent);
      
      // Recursively find the array of items based on the selector
      let items = findArrayRecursively(parsedJson, selector);
      
      // Clean up the structure of each item
      if (items) {
        items = items.map(cleanupParsedObject);
      }

      data = items || []; // If items are not found, default to an empty array
      metadata.linesRead = xmlContent.split(/\r?\n/).filter((l) => l.trim().length > 0).length
    }

    // Ensure data is an array
    if (!Array.isArray(data)) {
      data = [];
    }
    
    data = data.map((item, i) => ({
      ...item,
      _itemIndex: i,
      _itemId:
        typeof self !== "undefined" && self.crypto && self.crypto.randomUUID
          ? self.crypto.randomUUID()
          : `item-${i}`,
    }))
    const endTime = performance.now()
    const fileSize = new Blob([source.fileContent || ""]).size
    metadata = {
      ...metadata,
      itemCount: data.length,
      totalSize: fileSize,
      processingTime: Math.round(endTime - startTime),
    }
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : "Unknown error"
    throw new Error(`Parsing error: ${errorMessage}`)
  }
  return { data, metadata }
}
