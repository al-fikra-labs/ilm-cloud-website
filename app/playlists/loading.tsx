import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
    return (
        <div
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6"
        >
            {Array.from({ length: 8 }).map((_, i) => (
                <Card key={i}>
                    <CardContent className="p-3 sm:p-4">
                        <>
                            <Skeleton className="aspect-square rounded-md mb-3 sm:mb-4" />
                            <Skeleton className="h-3 sm:h-4 mb-2" />
                            <Skeleton className="h-2 sm:h-3 mb-2" />
                            <div className="flex gap-2">
                                <Skeleton className="h-2 sm:h-3 w-12 sm:w-16" />
                                <Skeleton className="h-2 sm:h-3 w-16 sm:w-20" />
                            </div>
                        </>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}