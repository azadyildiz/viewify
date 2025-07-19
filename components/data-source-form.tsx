"use client"

import React from "react"
import { useState, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, FileText, Code, Upload, XCircle, Beaker, FileSearch, Table, Braces, FileCode2 } from "lucide-react"
import { FilePreviewDialog } from "./xml-preview-dialog"
import { cn } from "@/lib/utils"
import { getSampleXml, getSampleJson, getSampleCsv } from "@/lib/sample-data"
import Link from "next/link"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { validateFileUpload, validateFileContent, createErrorMessage, normalizeError, logError } from "@/lib/error-utils"

type DataType = "xml" | "json" | "csv"

interface DataSourceFormProps {
  onSubmit: (
    source: { url?: string; fileContent?: string },
    dataType: DataType,
    dataSelector: string,
    maxItems: number,
    fileName: string | null,
  ) => void
  isLoading: boolean
}

const fileAcceptTypes: Record<DataType, string> = {
  xml: ".xml,application/xml,text/xml",
  json: ".json,application/json",
  csv: ".csv,text/csv",
}

// DataSourceForm: Lets the user upload a file, select data type, and start preview/analysis. Only local files are supported.

export function DataSourceForm({ onSubmit, isLoading }: DataSourceFormProps) {
  const { toast } = useToast()
  const [file, setFile] = useState<File | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const [fileSize, setFileSize] = useState<string | null>(null)
  const [dataType, setDataType] = useState<DataType>("xml")
  const [dataSelector, setDataSelector] = useState("product")
  const [maxItems, setMaxItems] = useState(1000)

  const [showPreviewDialog, setShowPreviewDialog] = useState(false)
  const [previewContent, setPreviewContent] = useState<string | null>(null)
  const [isPreviewLoading, setIsPreviewLoading] = useState(false)
  const [previewError, setPreviewError] = useState<string | null>(null)

  useEffect(() => {
    if (dataType === "json") {
      setMaxItems(-1)
    } else {
      if (maxItems === -1) {
        setMaxItems(1000)
      }
    }
    setFile(null)
    setFileName(null)
  }, [dataType]) // Only run when dataType changes

  // Helper function to format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  // Handles file upload and sets state
  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      // Validate file upload
      const errors = validateFileUpload(selectedFile, dataType, dataSelector)
      if (errors.length > 0) {
        const errorMessage = errors.map(e => e.message).join("; ")
        toast({
          variant: "destructive",
          title: "File Upload Error",
          description: errorMessage,
        })
        return
      }

      const extension = selectedFile.name.split(".").pop()?.toLowerCase()
      if (extension === "json") setDataType("json")
      else if (extension === "csv") setDataType("csv")
      else setDataType("xml")
      setFile(selectedFile)
      setFileName(selectedFile.name)
      setFileSize(formatFileSize(selectedFile.size))
    }
  }, [dataType, dataSelector, toast])

  // Clears the uploaded file
  const clearFile = useCallback(() => {
    setFile(null)
    setFileName(null)
    setFileSize(null)
    const fileInput = document.getElementById("data-file-upload") as HTMLInputElement
    if (fileInput) fileInput.value = ""
  }, [])

  // Handles preview button click
  const handlePreviewClick = async () => {
    if (!file) {
      toast({
        variant: "destructive",
        title: "No File Selected",
        description: "Please upload a file to preview.",
      })
      return;
    }
    setIsPreviewLoading(true);
    setPreviewError(null);
    setPreviewContent(null);
    setShowPreviewDialog(true);
    try {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const text = event.target?.result as string;
          if (!text) {
            throw new Error("Failed to read file content")
          }
          let preview: string;
          if (dataType === "json") {
            preview = text;
          } else {
            preview = text.split('\n').slice(0, 500).join('\n');
          }
          setPreviewContent(preview);
          setIsPreviewLoading(false);
        } catch (error) {
          const err = normalizeError(error);
          setPreviewError(err.message);
          setIsPreviewLoading(false);
          logError(err, 'handlePreviewClick.reader.onload');
          toast({
            variant: "destructive",
            title: "Preview Error",
            description: err.message,
          })
        }
      };
      reader.onerror = (event) => {
        const err = normalizeError(event);
        setPreviewError(err.message);
        setIsPreviewLoading(false);
        logError(err, 'handlePreviewClick.reader.onerror');
        toast({
          variant: "destructive",
          title: "File Read Error",
          description: err.message,
        })
      };
      // Read only the first ~100KB for preview (should be enough for 500 lines)
      const blob = file.slice(0, 100 * 1024);
      reader.readAsText(blob);
    } catch (error) {
      const err = normalizeError(error);
      setPreviewError(err.message);
      setIsPreviewLoading(false);
      logError(err, 'handlePreviewClick');
      toast({
        variant: "destructive",
        title: "Preview Error",
        description: err.message,
      })
    }
  };

  // Handles analyze (submit) button click
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate file selection
    if (!file) {
      toast({
        variant: "destructive",
        title: "No File Selected",
        description: "Please upload a file to continue.",
      })
      return
    }

    // Validate form inputs
    const errors = validateFileUpload(file, dataType, dataSelector)
    if (errors.length > 0) {
      const errorMessage = errors.map(e => e.message).join("; ")
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: errorMessage,
      })
      return
    }

    try {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const text = event.target?.result as string;
          if (!text) {
            throw new Error("Failed to read file content")
          }

          // Validate file content
          const contentError = validateFileContent(text, dataType)
          if (contentError) {
            toast({
              variant: "destructive",
              title: "File Content Error",
              description: createErrorMessage(contentError),
            })
            return
          }

          let content = text;
          if (dataType !== "json" && maxItems > 0) {
            content = text.split('\n').slice(0, maxItems).join('\n');
          }
          onSubmit({ fileContent: content }, dataType, dataSelector.trim(), maxItems, fileName)
        } catch (error) {
          const err = normalizeError(error);
          logError(err, 'handleSubmit.reader.onload');
          toast({
            variant: "destructive",
            title: "File Processing Error",
            description: err.message,
          })
        }
      };
      reader.onerror = (event) => {
        const err = normalizeError(event);
        logError(err, 'handleSubmit.reader.onerror');
        toast({
          variant: "destructive",
          title: "File Read Error",
          description: err.message,
        })
      };
      // Read a chunk big enough to cover maxItems lines (assume avg 200 bytes/line)
      const approxBytes = dataType === "json" ? file.size : (maxItems > 0 ? maxItems * 200 : file.size);
      const blob = file.slice(0, approxBytes);
      reader.readAsText(blob);
    } catch (error) {
      const err = normalizeError(error);
      logError(err, 'handleSubmit');
      toast({
        variant: "destructive",
        title: "Error",
        description: err.message,
      })
    }
  }

  const handleTestAnalyze = () => {
    let sampleContent: string
    let sampleFileName: string

    switch (dataType) {
      case "json":
        sampleContent = getSampleJson()
        sampleFileName = "sample-products.json"
        break
      case "csv":
        sampleContent = getSampleCsv()
        sampleFileName = "sample-products.csv"
        break
      case "xml":
      default:
        sampleContent = getSampleXml()
        sampleFileName = "sample-products.xml"
        break
    }

    // Create a File object from the sample content so the rest of the logic works
    const blob = new Blob([sampleContent], { type: "text/plain" })
    const sampleFile = new File([blob], sampleFileName, { type: "text/plain" })
    setFile(sampleFile)
    setFileName(sampleFileName)
    setFileSize(formatFileSize(sampleFile.size))
  }

  const getSelectorLabel = () => {
    switch (dataType) {
      case "xml":
        return "XML Element Name"
      case "json":
        return "JSON Array Key Name"
      case "csv":
        return "Data Selector (Not Applicable)"
      default:
        return "Data Selector"
    }
  }

  const getSelectorPlaceholder = () => {
    switch (dataType) {
      case "xml":
        return "e.g., item or product"
      case "json":
        return "e.g., items"
      default:
        return ""
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="border-2 border-gray-200">
        <CardHeader className="text-center p-4">
          <Link href="/" className="inline-flex justify-center items-center gap-3 mb-4 group">
            <FileSearch className="w-8 h-8 text-slate-900 group-hover:text-slate-700 transition-colors" />
            <h1 className="text-4xl font-bold text-black group-hover:text-slate-700 transition-colors">Viewify</h1>
          </Link>
          <CardTitle className="text-2xl font-bold text-black">Data Source Configuration</CardTitle>
          <CardDescription className="text-gray-600">
            Upload an XML, JSON, or CSV file.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-4 pt-0">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-black">Data Type</Label>
              <Tabs value={dataType} onValueChange={(value) => setDataType(value as DataType)} className="w-full">
                <TabsList className="mb-2 w-full grid grid-cols-3">
                  <TabsTrigger value="xml" className="flex flex-row items-center gap-1" aria-label="XML">
                    <FileCode2 className="w-5 h-5" />
                    <span>XML</span>
                  </TabsTrigger>
                  <TabsTrigger value="csv" className="flex flex-row items-center gap-1" aria-label="CSV">
                    <Table className="w-5 h-5" />
                    <span>CSV</span>
                  </TabsTrigger>
                  <TabsTrigger value="json" className="flex flex-row items-center gap-1" aria-label="JSON">
                    <Braces className="w-5 h-5" />
                    <span>JSON</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="space-y-2">
              <Label htmlFor="data-file-upload" className="text-sm font-medium text-black">
                Upload File
              </Label>
              <div
                className={cn(
                  "flex items-center justify-center w-full h-auto border-2 border-dashed rounded-lg",
                  (isLoading || isPreviewLoading) && "opacity-50 cursor-not-allowed",
                  fileName && "border-solid border-green-500 bg-green-50",
                )}
              >
                <input
                  id="data-file-upload"
                  type="file"
                  className="hidden"
                  accept={fileAcceptTypes[dataType]}
                  onChange={handleFileChange}
                  disabled={isLoading || isPreviewLoading}
                />
                {fileName ? (
                  <div className="flex flex-col items-center gap-1 text-green-700 p-2">
                    <div className="flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      <span className="font-medium text-center">{fileName}</span>
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="icon" 
                        onClick={clearFile} 
                        className="text-red-500"
                        aria-label="Remove selected file"
                      >
                        <XCircle className="w-4 h-4" />
                      </Button>
                    </div>
                    {fileSize && (
                      <span className="text-xs text-green-600">{fileSize}</span>
                    )}
                  </div>
                ) : (
                  <label
                    htmlFor="data-file-upload"
                    className={cn("flex flex-col items-center justify-center w-full h-full, p-4", "cursor-pointer")}
                  >
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">
                      <span className="font-semibold">Choose a file</span> or drag and drop
                    </p>
                    {/* File size limit info */}
                    <div className="text-xs text-gray-500 mt-1">
                      Maximum file size: 500MB
                    </div>
                  </label>
                )}
              </div>
              {/* URL'den dosya indirme rehberi - yeni tasarım */}
              <div className="mt-2">
                <Accordion type="single" collapsible>
                  <AccordionItem value="download-guide">
                    <AccordionTrigger className="text-sm font-medium text-left text-black hover:no-underline focus:no-underline gap-2">
                      How can I download a file from a URL?
                    </AccordionTrigger>
                    <AccordionContent>
                      <Tabs defaultValue="windows" className="w-full">
                        <TabsList className="mb-4">
                          <TabsTrigger value="windows" className="flex items-center gap-2">
                            {/* Windows Icon */}
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-windows"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                            Windows
                          </TabsTrigger>
                          <TabsTrigger value="linux" className="flex items-center gap-2">
                            {/* Linux Icon */}
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linux"><path d="M12 2c-2.5 0-4.5 2-4.5 4.5S9.5 11 12 11s4.5-2 4.5-4.5S14.5 2 12 2z"/><path d="M2 22s2-4 10-4 10 4 10 4"/><path d="M8 16v2"/><path d="M16 16v2"/></svg>
                            Linux
                          </TabsTrigger>
                          <TabsTrigger value="mac" className="flex items-center gap-2">
                            {/* Mac Icon */}
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-apple"><path d="M16.5 2a5.38 5.38 0 0 1-2.5 4.5"/><path d="M12 8c-4.5 0-8 3.5-8 8 0 2.5 2 4.5 4.5 4.5 1.5 0 2.5-1 3.5-1s2 1 3.5 1C20 20.5 22 18.5 22 16c0-4.5-3.5-8-8-8z"/></svg>
                            Mac
                          </TabsTrigger>
                        </TabsList>
                        <TabsContent value="windows">
                          <div className="bg-[#1e1e1e] rounded-t-md px-4 pt-3 pb-2 flex items-center justify-between border border-gray-800 border-b-0">
                            <span className="text-xs text-gray-300 font-semibold">powershell</span>
                            <span className="flex items-center gap-1">
                              <span className="inline-block w-3 h-3 rounded-full bg-red-500"></span>
                              <span className="inline-block w-3 h-3 rounded-full bg-yellow-400"></span>
                              <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span>
                            </span>
                          </div>
                          <div className="bg-[#23272e] text-green-400 font-mono rounded-b-md p-4 text-sm flex items-center gap-2 shadow-inner border border-gray-800 border-t-0">
                            <span className="select-none">C:\&gt;</span>
                            <span>curl.exe -O "URL_HERE"</span>
                          </div>
                        </TabsContent>
                        <TabsContent value="linux">
                          <div className="bg-[#1e1e1e] rounded-t-md px-4 pt-3 pb-2 flex items-center justify-between border border-gray-800 border-b-0">
                            <span className="text-xs text-gray-300 font-semibold">terminal</span>
                            <span className="flex items-center gap-1">
                              <span className="inline-block w-3 h-3 rounded-full bg-red-500"></span>
                              <span className="inline-block w-3 h-3 rounded-full bg-yellow-400"></span>
                              <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span>
                            </span>
                          </div>
                          <div className="bg-[#23272e] text-green-400 font-mono rounded-b-md p-4 text-sm flex items-center gap-2 shadow-inner border border-gray-800 border-t-0">
                            <span className="select-none">$</span>
                            <span>wget "URL_HERE"</span>
                          </div>
                        </TabsContent>
                        <TabsContent value="mac">
                          <div className="bg-[#1e1e1e] rounded-t-md px-4 pt-3 pb-2 flex items-center justify-between border border-gray-800 border-b-0">
                            <span className="text-xs text-gray-300 font-semibold">terminal</span>
                            <span className="flex items-center gap-1">
                              <span className="inline-block w-3 h-3 rounded-full bg-red-500"></span>
                              <span className="inline-block w-3 h-3 rounded-full bg-yellow-400"></span>
                              <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span>
                            </span>
                          </div>
                          <div className="bg-[#23272e] text-green-400 font-mono rounded-b-md p-4 text-sm flex items-center gap-2 shadow-inner border border-gray-800 border-t-0">
                            <span className="select-none">$</span>
                            <span>curl -O "URL_HERE"</span>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>

            <div className="flex gap-2 flex-wrap">
              <Button
                type="button"
                onClick={handlePreviewClick}
                className="flex-1 text-sm md:text-base font-semibold bg-gray-700 hover:bg-gray-600 text-white"
                disabled={isLoading || isPreviewLoading || !file}
              >
                {isPreviewLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Code className="w-4 h-4 mr-2" />}
                Preview
              </Button>

              <Button
                type="button"
                onClick={handleTestAnalyze}
                className="flex-1 text-sm md:text-base font-semibold bg-purple-700 hover:bg-purple-600 text-white"
                disabled={isLoading || isPreviewLoading}
              >
                <Beaker className="w-4 h-4 mr-2" />
                Test Analyze
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="data-selector" className="text-sm font-medium text-black">
                {getSelectorLabel()}
              </Label>
              <Input
                id="data-selector"
                type="text"
                placeholder={getSelectorPlaceholder()}
                value={dataSelector}
                onChange={(e) => setDataSelector(e.target.value)}
                className="h-12 border-2 border-gray-200 focus:border-black"
                disabled={isLoading || isPreviewLoading || dataType === "csv"}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="max-items" className="text-sm font-medium text-black">
                Maximum Number of Lines to Process
              </Label>
              <Select
                value={maxItems.toString()}
                onValueChange={(value) => setMaxItems(Number.parseInt(value))}
                disabled={isLoading || isPreviewLoading || dataType === "json"}
              >
                <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-black">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1000">1,000 lines</SelectItem>
                  <SelectItem value="5000">5,000 lines</SelectItem>
                  <SelectItem value="10000">10,000 lines</SelectItem>
                  <SelectItem value="50000">50,000 lines</SelectItem>
                  <SelectItem value="100000">100,000 lines</SelectItem>
                  <SelectItem value="500000">500,000 lines</SelectItem>
                  <SelectItem value="1000000">1,000,000 lines</SelectItem>
                  <SelectItem value="-1">All Lines (Full File)</SelectItem>
                </SelectContent>
              </Select>
              {dataType === "json" ? (
                <p className="text-xs text-muted-foreground mt-1">
                  JSON files are always processed completely for accurate parsing. This setting is ignored.
                </p>
              ) : (
                <p className="text-xs text-muted-foreground mt-1">
                  The "All Lines" option can be slow for large files. A limited selection is recommended for better
                  performance.
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-lg font-semibold bg-black hover:bg-gray-800 text-white"
              disabled={isLoading || isPreviewLoading || !file}
            >
              {isLoading ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : "Analyze Data"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <FilePreviewDialog
        isOpen={showPreviewDialog}
        onClose={() => setShowPreviewDialog(false)}
        fileContent={previewContent}
        isLoading={isPreviewLoading}
        error={previewError}
      />
    </div>
  )
}
