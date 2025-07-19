"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function ItemCardSkeleton() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-3 border-b border-border">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-5 w-12" />
        </div>
      </CardHeader>
      <CardContent className="pt-4 flex-1">
        <div className="space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-2/3" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </CardContent>
      <div className="p-3 flex justify-between items-center border-t border-border">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-8 w-24" />
      </div>
    </Card>
  )
}
