import { parseData } from '@/lib/parser';
import { applyFilters } from '@/lib/filter';
import type { DataItem, ProcessedMetadata, ProcessedData } from '@/lib/types';

let rawData: DataItem[] = [];
let filteredData: DataItem[] = [];
let staticMetadata: Partial<ProcessedMetadata> = {};

const PAGE_SIZE = 60;

// Extract fields from a single object recursively
function extractFieldsFromObject(obj: Record<string, unknown>, prefix = ""): Set<string> {
    const fields = new Set<string>();
    
    if (!obj || typeof obj !== "object") {
        return fields;
    }
    
    const keys = Object.keys(obj);
    keys.forEach((key) => {
        if (key.startsWith("_")) return;
        
        const fullKey = prefix ? `${prefix}.${key}` : key;
        fields.add(fullKey);
        
        const value = obj[key];
        if (typeof value === "object" && value !== null && !Array.isArray(value)) {
            const nestedFields = extractFieldsFromObject(value as Record<string, unknown>, fullKey);
            nestedFields.forEach(field => fields.add(field));
        }
    });
    
    return fields;
}

// Analyze fields from the entire dataset
function analyzeFields(data: DataItem[]) {
    const fieldCounts = new Map<string, number>();
    const allFields = new Set<string>();

    // Check if data is valid
    if (!data || !Array.isArray(data)) {
        return {
            allFields: [],
            fieldCounts: []
        };
    }

    data.forEach((item: DataItem) => {
        const uniquePathsInItem = new Set<string>();
        const itemFields = extractFieldsFromObject(item);
        
        itemFields.forEach(field => {
            allFields.add(field);
            // Count each field only once per item
            if (!uniquePathsInItem.has(field)) {
                fieldCounts.set(field, (fieldCounts.get(field) || 0) + 1);
                uniquePathsInItem.add(field);
            }
        });
    });

    return {
        allFields: Array.from(allFields).sort(),
        fieldCounts: Array.from(fieldCounts.entries()) // Convert Map to array for serialization
    };
}

function paginate(data: DataItem[], page: number): DataItem[] {
  const start = (page - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  return data.slice(start, end);
}

function createMetadata(page: number, dataToPaginate: DataItem[]): ProcessedMetadata {
    return {
        ...staticMetadata,
        pagination: {
            currentPage: page,
            totalPages: Math.ceil(dataToPaginate.length / PAGE_SIZE),
            totalItems: rawData.length,
            filteredItems: dataToPaginate.length,
        },
        itemCount: rawData.length
    } as ProcessedMetadata;
}

function getPaginatedData(page: number, customData?: DataItem[]): ProcessedData {
    const dataToPaginate = customData || filteredData;
    const paginatedItems = paginate(dataToPaginate, page);
    const metadata = createMetadata(page, dataToPaginate);
    
    return {
        items: paginatedItems,
        metadata
    };
}

self.onmessage = (event: MessageEvent) => {
  const { type, payload } = event.data;

  try {
    switch (type) {
      case 'PARSE_DATA': {
        const { fileContent, dataType, selector } = payload;
        const source = { fileContent };
        const { data, metadata } = parseData(source, dataType, selector);
        
        // Ensure data is valid
        if (!data || !Array.isArray(data)) {
          throw new Error("Invalid data format: Expected an array of items");
        }
        
        rawData = data;
        filteredData = data;
        
        // Analyze fields and add to static metadata
        const fieldAnalysis = analyzeFields(rawData);
        staticMetadata = { ...metadata, fieldAnalysis };

        const responsePayload = getPaginatedData(1);
        self.postMessage({ type: 'PARSE_SUCCESS', payload: responsePayload });
        break;
      }
      case 'APPLY_FILTERS': {
        const { filters } = payload;
        filteredData = applyFilters(rawData, filters);
        const responsePayload = getPaginatedData(1);
        self.postMessage({ type: 'FILTER_SUCCESS', payload: responsePayload });
        break;
      }
      case 'GET_PAGE': {
        const { page } = payload;
        const responsePayload = getPaginatedData(page);
        self.postMessage({ type: 'PAGE_SUCCESS', payload: responsePayload });
        break;
      }
    }
  } catch (error) {
    self.postMessage({ type: 'WORKER_ERROR', payload: { message: (error as Error).message } });
  }
};
