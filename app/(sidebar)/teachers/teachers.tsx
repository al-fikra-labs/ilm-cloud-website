"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Star, Users, Filter, Grid, List } from "lucide-react"
import { useEffect, useState } from "react"
import { apiClient, type ApiTeacher } from "@/lib/api"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

type Teachers = {
    id: string
    name: string
    bio: string
}

export default function TeachersPage({ teachers }: { teachers: Teachers[] }) {
    // const [teachers, setTeachers] = useState<ApiTeacher[]>([])
    const [loading, setLoading] = useState(false)
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold mb-2">Teachers</h1>
                    <p className="text-muted-foreground">Learn from expert instructors around the world</p>
                </div>
                <div className="flex items-center gap-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">
                                <Filter className="w-4 h-4 mr-2" />
                                Filter
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>Highest Rated</DropdownMenuItem>
                            <DropdownMenuItem>Most Students</DropdownMenuItem>
                            <DropdownMenuItem>Most Courses</DropdownMenuItem>
                            <DropdownMenuItem>Newest</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <div className="flex items-center gap-2">
                        <Button variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("grid")}>
                            <Grid className="w-4 h-4" />
                        </Button>
                        <Button variant={viewMode === "list" ? "default" : "outline"} size="sm" onClick={() => setViewMode("list")}>
                            <List className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Teachers Grid/List */}
            {/* {loading ? (
                <div
                    className={
                        viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"
                    }
                >
                    {Array.from({ length: 8 }).map((_, i) => (
                        <Card key={i}>
                            <CardContent className="p-6">
                                {viewMode === "grid" ? (
                                    <div className="text-center">
                                        <Skeleton className="w-24 h-24 rounded-full mx-auto mb-4" />
                                        <Skeleton className="h-5 mb-2" />
                                        <Skeleton className="h-4 mb-4" />
                                        <div className="flex justify-center gap-4">
                                            <Skeleton className="h-4 w-16" />
                                            <Skeleton className="h-4 w-16" />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-4">
                                        <Skeleton className="w-16 h-16 rounded-full" />
                                        <div className="flex-1">
                                            <Skeleton className="h-5 mb-2" />
                                            <Skeleton className="h-4 mb-2" />
                                            <Skeleton className="h-4 w-32" />
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : ( */}
                <div
                    className={
                        viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"
                    }
                >
                    {teachers.map((teacher) => (
                        <Link key={teacher.id} href={`/teachers/${teacher.id}`}>
                            <Card className="group cursor-pointer hover:bg-accent/50 transition-all duration-200 hover:shadow-lg h-full">
                                <CardContent className="p-6">
                                    {viewMode === "grid" ? (
                                        <div className="text-center">
                                            <div className="w-24 h-24 bg-muted rounded-full mx-auto mb-4 overflow-hidden">
                                                <img
                                                    src={"/placeholder.svg?height=96&width=96"}
                                                    alt={teacher.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <h3 className="text-lg font-semibold mb-2 group-hover:text-[#1DB954] transition-colors">
                                                {teacher.name}
                                            </h3>
                                            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{teacher.bio}</p>
                                            <div className="flex items-center justify-center gap-4 text-sm">
                                                {/* <div className="flex items-center gap-1">
                                                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                                    <span>{teacher.rating ? teacher.rating.toFixed(1) : "0.0"}</span>
                                                </div> */}
                                                <div className="flex items-center gap-1">
                                                    <Users className="w-4 h-4 text-muted-foreground" />
                                                    <span>  0
                                                        {/* {teacher.totalStudents > 1000
                                                            ? `${Math.floor(teacher.totalStudents / 1000)}k`
                                                            : teacher.totalStudents} */}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="mt-4">
                                                <Badge variant="secondary" className="bg-[#1DB954]/20 text-[#1DB954]">
                                                    {0} courses
                                                </Badge>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 bg-muted rounded-full overflow-hidden flex-shrink-0">
                                                <img
                                                    src={"/placeholder.svg?height=64&width=64"}
                                                    alt={teacher.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-lg font-semibold mb-1 group-hover:text-[#1DB954] transition-colors">
                                                    {teacher.name}
                                                </h3>
                                                <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{teacher.bio}</p>
                                                <div className="flex items-center gap-4 text-sm">
                                                    <div className="flex items-center gap-1">
                                                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                                        {/* <span>{teacher.rating ? teacher.rating.toFixed(1) : "0.0"}</span> */}
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Users className="w-4 h-4 text-muted-foreground" />
                                                        <span>0
                                                            {/* {teacher.totalStudents > 1000
                                                                ? `${Math.floor(teacher.totalStudents / 1000)}k`
                                                                : teacher.totalStudents} */}
                                                        </span>
                                                    </div>
                                                    <Badge variant="secondary" className="bg-[#1DB954]/20 text-[#1DB954]">
                                                        {0} courses
                                                    </Badge>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            {/* )} */}
        </div>
    )
}
