"use client"

import * as React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Loader2 } from "lucide-react"

interface FilePreviewDialogProps {
  isOpen: boolean
  onClose: () => void
  fileContent: string | null
  isLoading: boolean
  error: string | null
}

export function FilePreviewDialog({ isOpen, onClose, fileContent, isLoading, error }: FilePreviewDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-black">File Preview</DialogTitle>
          <DialogDescription className="text-zinc-600">
            The first 500 lines of the file content.
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 border border-zinc-200 rounded-md bg-zinc-50 p-4 overflow-hidden relative">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
              <Loader2 className="w-8 h-8 animate-spin text-black" />
              <span className="ml-2 text-black">Loading...</span>
            </div>
          )}
          {fileContent && !isLoading ? (
            <ScrollArea className="h-full w-full">
              <pre className="whitespace-pre-wrap break-words text-sm font-mono text-zinc-800">
                {fileContent.split('\n').slice(0, 500).join('\n')}
              </pre>
            </ScrollArea>
          ) : (
            !isLoading && !fileContent && error && <div className="text-red-600 text-sm text-center py-4">Error: {error}</div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
