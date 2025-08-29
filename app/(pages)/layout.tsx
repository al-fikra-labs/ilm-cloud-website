import { Headphones } from "lucide-react"
import Link from "next/link"
import { Navbar } from "./navbar"

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            {children}
            <footer className="bg-muted/30 border-t border-border py-12 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="col-span-1 md:col-span-2">
                            <div className="flex items-center space-x-2 mb-4">
                                <div className="w-8 h-8 bg-[#1DB954] rounded-lg flex items-center justify-center">
                                    <Headphones className="h-5 w-5 text-white" />
                                </div>
                                <span className="text-xl font-bold text-foreground">AudioCourse</span>
                            </div>
                            <p className="text-muted-foreground mb-4 max-w-md">
                                Transforming Islamic education through high-quality audio content from qualified scholars.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-foreground mb-4">Platform</h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                                        Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/categories" className="text-muted-foreground hover:text-foreground transition-colors">
                                        Courses
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/teachers" className="text-muted-foreground hover:text-foreground transition-colors">
                                        Teachers
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/playlists" className="text-muted-foreground hover:text-foreground transition-colors">
                                        Playlists
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold text-foreground mb-4">Company</h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                                        About
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/login" className="text-muted-foreground hover:text-foreground transition-colors">
                                        Login
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/signup" className="text-muted-foreground hover:text-foreground transition-colors">
                                        Sign Up
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-border mt-8 pt-8 text-center">
                        <p className="text-muted-foreground">© 2024 AudioCourse. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}