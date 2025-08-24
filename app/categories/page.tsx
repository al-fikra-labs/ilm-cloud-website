"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { BookOpen, TrendingUp } from "lucide-react"
import { useEffect, useState } from "react"
import { apiClient, type ApiCategory } from "@/lib/api"
import Link from "next/link"

export default function CategoriesPage() {
  const [categories, setCategories] = useState<ApiCategory[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true)
        const data = await apiClient.getCategories()
        setCategories(data)
      } catch (error) {
        console.error("Error fetching categories:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-2">Categories</h1>
        <p className="text-muted-foreground">Explore courses by topic and subject</p>
      </div>

      {/* Categories Grid */}
      {loading ? (
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
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link key={category.id} href={`/categories/${category.id}`}>
              <Card className="group cursor-pointer hover:bg-accent/50 transition-all duration-200 aspect-[4/3] hover:shadow-lg">
                <CardContent className="p-6 h-full flex flex-col">
                  <div className="w-12 h-12 bg-[#1DB954]/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#1DB954]/30 transition-colors">
                    {category.thumbnail ? (
                      <img src={category.thumbnail || "/placeholder.svg"} alt={category.name} className="w-6 h-6" />
                    ) : (
                      <BookOpen className="w-6 h-6 text-[#1DB954]" />
                    )}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-[#1DB954] transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 flex-1 line-clamp-3">{category.description}</p>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="bg-[#1DB954]/20 text-[#1DB954]">
                      {category.trackCount} courses
                    </Badge>
                    {index < 3 && (
                      <Badge variant="outline" className="text-xs">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Popular
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
