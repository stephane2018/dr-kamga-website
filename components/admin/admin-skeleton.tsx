import { Skeleton } from "@/components/ui/skeleton"

export function MasterclassCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3 flex-1">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-8 w-8 rounded" />
          <Skeleton className="h-8 w-8 rounded" />
        </div>
      </div>

      <Skeleton className="h-12 w-full mb-4" />

      <div className="space-y-2">
        <Skeleton className="h-4 w-32 mb-2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <Skeleton className="h-4 w-40" />
      </div>
    </div>
  )
}

export function SeminarCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-3">
            <Skeleton className="h-6 w-64" />
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-28" />
          </div>
          <Skeleton className="h-4 w-48" />
          <div className="flex gap-4">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-40" />
          </div>
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-8 w-8 rounded" />
          <Skeleton className="h-8 w-8 rounded" />
        </div>
      </div>

      <Skeleton className="h-12 w-full mb-4" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-24 mb-2" />
          <Skeleton className="h-24 w-full rounded" />
          <Skeleton className="h-24 w-full rounded" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-20 mb-2" />
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-8 w-32" />
        </div>
      </div>
    </div>
  )
}

export function AdminListSkeleton({ count = 2, type = "masterclass" }: { count?: number, type?: "masterclass" | "seminar" | "axis-cards" }) {
  const SkeletonCard = type === "masterclass" ? MasterclassCardSkeleton : SeminarCardSkeleton

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-48" />
        </div>
        <Skeleton className="h-10 w-48" />
      </div>

      <div className="space-y-4">
        <Skeleton className="h-6 w-48" />
        <div className={type === "masterclass" ? "grid grid-cols-1 lg:grid-cols-2 gap-4" : "space-y-4"}>
          {Array.from({ length: count }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}

export function AdminSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-48" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-8 w-24" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
