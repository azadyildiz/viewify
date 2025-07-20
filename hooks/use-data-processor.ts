"use client"

import { useReducer, useCallback, useEffect, useRef, useTransition } from "react"
import type { AppliedFilters, ProcessedData } from "@/lib/types"
import { useToast } from "@/hooks/use-toast"
import { normalizeError, logError } from "@/lib/error-utils"

// --- STATE MANAGEMENT ---

/**
 * Defines the shape of the state for the data viewer.
 */
export interface DataProcessorState {
  // processedData holds paginated data and metadata from worker
  processedData: ProcessedData | null
  dataSource: { url?: string; fileContent?: string }
  fileName: string | null
  dataType: "xml" | "json" | "csv"
  dataSelector: string
  maxItems: number
  isLoading: boolean
  error: string | null
  // Represents the filters that have been APPLIED
  appliedFilters: AppliedFilters
}

/**
 * Defines the actions that can be dispatched to update the state.
 */
type DataProcessorAction =
  | { type: "START_PROCESSING" }
  | {
      type: "SET_INITIAL_SOURCE"
      payload: Omit<
        DataProcessorState,
        "processedData" | "isLoading" | "error" | "appliedFilters"
      >
    }
  | { type: "PROCESSING_SUCCESS"; payload: { processedData: ProcessedData } }
  | { type: "PROCESSING_ERROR"; payload: string }
  | { type: "SET_PAGE_LOADING"; payload: boolean }
  | { type: "APPLY_FILTERS"; payload: DataProcessorState["appliedFilters"] }
  | { type: "RESET" }

/**
 * The initial state for the data processor.
 */
const initialState: DataProcessorState = {
  processedData: null,
  dataSource: {},
  fileName: null,
  dataType: "xml",
  dataSelector: "item",
  maxItems: 1000,
  isLoading: false,
  error: null,
  appliedFilters: {
    searchTerm: "",
    hiddenFields: new Set(),
    showEmptyFields: true,
    conditionalFilters: [],
    filterLogic: "AND",
  },
}

/**
 * The reducer function to manage state transitions.
 */
function dataProcessorReducer(state: DataProcessorState, action: DataProcessorAction): DataProcessorState {
  switch (action.type) {
    case "START_PROCESSING":
      return { ...state, isLoading: true, error: null, processedData: null }
    case "SET_INITIAL_SOURCE":
      return { ...state, ...action.payload }
    case "PROCESSING_SUCCESS":
      return {
        ...state,
        isLoading: false,
        processedData: action.payload.processedData,
      }
    case "PROCESSING_ERROR":
      return { ...state, isLoading: false, error: action.payload }
    case "SET_PAGE_LOADING":
      return { ...state, isLoading: action.payload }
    case "APPLY_FILTERS":
      return { ...state, appliedFilters: action.payload }
    case "RESET":
      return initialState
    default:
      return state
  }
}

// --- CUSTOM HOOK ---

export function useDataProcessor() {
  const [isPending, startTransition] = useTransition();
  const [state, dispatch] = useReducer(dataProcessorReducer, initialState)
  const { toast } = useToast()
  const workerRef = useRef<Worker | null>(null)

    useEffect(() => {
    try {
      workerRef.current = new Worker(new URL('../src/workers/data.worker.ts', import.meta.url));
      workerRef.current.onerror = (error) => {
        logError(error, 'worker.onerror');
        toast({
          variant: "destructive",
          title: "Worker Error",
          description: normalizeError(error).message,
        });
      };
      
      workerRef.current.onmessage = (event: MessageEvent) => {
        try {
          const { type, payload } = event.data;
          switch (type) {
            case 'PARSE_SUCCESS':
            case 'FILTER_SUCCESS':
            case 'PAGE_SUCCESS': {
              dispatch({
                type: "PROCESSING_SUCCESS",
                payload: { processedData: payload },
              });
              if(type === 'PARSE_SUCCESS') {
                const itemCount = payload.metadata?.itemCount || payload.metadata?.totalItems || 0;
                toast({
                  title: "Data Processed Successfully",
                  description: `Processed ${itemCount} items.`,
                });
              }
              if(type === 'FILTER_SUCCESS') {
                toast({
                  title: "Filters Applied",
                  description: `Found ${payload.metadata.pagination.filteredItems} matching items.`,
                });
              }
              break;
            }
            case 'WORKER_ERROR': {
              const { message } = payload;
              dispatch({ type: "PROCESSING_ERROR", payload: message });
              toast({
                variant: "destructive",
                title: "Processing Error",
                description: message,
              });
              break;
            }
          }
        } catch (err) {
          logError(err, 'worker.onmessage');
          toast({
            variant: "destructive",
            title: "Worker Message Error",
            description: normalizeError(err).message,
          });
        }
      };

      return () => {
        workerRef.current?.terminate();
      };
    } catch (error) {
      logError(error, 'workerRef initialization');
      toast({
        variant: "destructive",
        title: "Worker Initialization Error",
        description: normalizeError(error).message,
      });
    }
  }, [toast]);


  const handleDataSubmit = useCallback(
    async (
      source: { url?: string; fileContent?: string },
      type: "xml" | "json" | "csv",
      selector: string,
      items: number,
      selectedFileName: string | null
    ) => {
      dispatch({ type: "START_PROCESSING" })
      dispatch({
        type: "SET_INITIAL_SOURCE",
        payload: {
          dataSource: source,
          fileName: selectedFileName,
          dataType: type,
          dataSelector: selector,
          maxItems: items,
        },
      });

      if (source.fileContent) {
        workerRef.current?.postMessage({
          type: 'PARSE_DATA',
          payload: { fileContent: source.fileContent, dataType: type, selector },
        });
      } else {
        const errorMessage = "File content is missing."
        dispatch({ type: "PROCESSING_ERROR", payload: errorMessage });
        toast({
          variant: "destructive",
          title: "Processing Error",
          description: errorMessage,
        });
      }
    },
    [toast]
  )

  const handleApplyFilters = useCallback(
    (pendingFilters: Omit<AppliedFilters, "searchTerm">, newSearchTerm?: string) => {
      const allFilters: AppliedFilters = {
        ...pendingFilters,
        searchTerm: newSearchTerm ?? "", // Use empty string as fallback instead of state.appliedFilters.searchTerm
      };
      
      dispatch({ type: "SET_PAGE_LOADING", payload: true });
      dispatch({ type: "APPLY_FILTERS", payload: allFilters });
      
      toast({
        title: "Applying filters...",
        description: "This may take a moment for large datasets.",
      });

      workerRef.current?.postMessage({
        type: 'APPLY_FILTERS',
        payload: { filters: allFilters },
      });
    },
    []
  )

  const handleSearch = useCallback(
    (searchTerm: string) => {
      const newFilters = { 
        ...state.appliedFilters,
        searchTerm: searchTerm,
      }
      handleApplyFilters(newFilters, searchTerm)
    },
    [handleApplyFilters, state.appliedFilters]
  )

  const handlePageChange = useCallback(
    (newPage: number) => {
      startTransition(() => {
         workerRef.current?.postMessage({
          type: 'GET_PAGE',
          payload: { page: newPage },
        });
      });
    },
    []
  )

  const handleReset = useCallback(() => {
    dispatch({ type: "RESET" })
  }, [])

  return {
    state: { ...state, isLoading: state.isLoading || isPending },
    handleDataSubmit,
    handleApplyFilters,
    handleSearch,
    handlePageChange,
    handleReset,
  }
}
