"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { File, Link, Database, Clock, Server } from "lucide-react"
import { formatFileSize } from "@/lib/performance-utils"
import { Loader2 } from "lucide-react"

interface MetadataDisplayProps {
  dataSource: { url?: string; fileContent?: string }
  fileName: string | null
  metadata: unknown
  totalItems?: number
  processingTime?: number
}

// MetadataDisplay: Shows file/source info, file size, item count, and processing time for the loaded data.

export function MetadataDisplay({ dataSource, fileName, metadata, totalItems, processingTime }: MetadataDisplayProps) {
  const formatProcessingTime = (timeInMs?: number) => {
    if (timeInMs === undefined) return "N/A"
    if (timeInMs < 1000) {
      return `${timeInMs}ms`
    }
    return `${(timeInMs / 1000).toFixed(1)}s`
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Source Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-x-8 gap-y-4 text-sm items-stretch lg:flex-nowrap">
          <div className="flex items-center gap-3 lg:col-span-2">
            {dataSource.url ? (
              <Link className="w-5 h-5 text-muted-foreground flex-shrink-0" />
            ) : (
              <File className="w-5 h-5 text-muted-foreground flex-shrink-0" />
            )}
            <div className="min-w-0">
              <div className="text-muted-foreground">Source</div>
              <div className="font-semibold truncate">{fileName || dataSource.url}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Server className="w-5 h-5 text-muted-foreground flex-shrink-0" />
            <div className="min-w-0">
              <div className="text-muted-foreground">File Size</div>
              <div className="font-semibold">{metadata ? formatFileSize(metadata.totalSize) : "N/A"}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Database className="w-5 h-5 text-muted-foreground flex-shrink-0" />
            <div className="min-w-0">
              <div className="text-muted-foreground">Items Read</div>
              <div className="font-semibold">
                {totalItems !== undefined ? totalItems.toLocaleString() : <Loader2 className="w-4 h-4 animate-spin" />}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Database className="w-5 h-5 text-muted-foreground flex-shrink-0" />
            <div className="min-w-0">
              <div className="text-muted-foreground">Lines Read</div>
              <div className="font-semibold">
                {metadata?.linesRead !== undefined ? metadata.linesRead.toLocaleString() : <Loader2 className="w-4 h-4 animate-spin" />}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-muted-foreground flex-shrink-0" />
            <div className="min-w-0">
              <div className="text-muted-foreground">Processing Time</div>
              <div className="font-semibold">{formatProcessingTime(processingTime)}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
