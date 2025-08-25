import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
                <Card key={i} className="aspect-[4/3]">
                    <CardContent className="p-6 h-full flex flex-col">
                        <Skeleton className="w-12 h-12 rounded-full mb-4" />
                        <Skeleton className="h-6 mb-2" />
                        <Skeleton className="h-4 mb-4 flex-1" />
                        <Skeleton className="h-4 w-24" />
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}