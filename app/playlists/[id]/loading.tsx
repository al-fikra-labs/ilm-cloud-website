import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="space-y-6 p-4 md:p-6">
            <div className="flex items-center gap-4 mb-6">
                <Skeleton className="w-8 h-8" />
                <Skeleton className="h-6 w-32" />
            </div>
            <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                <Skeleton className="w-full max-w-64 h-64 rounded-lg mx-auto md:mx-0" />
                <div className="flex-1 space-y-4">
                    <Skeleton className="h-6 md:h-8 w-full max-w-64" />
                    <Skeleton className="h-4 w-full max-w-96" />
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Skeleton className="h-10 w-full sm:w-32" />
                        <Skeleton className="h-10 w-10" />
                    </div>
                </div>
            </div>
        </div>
    )
}