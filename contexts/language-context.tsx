"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export type Language = "en" | "ml"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Translation dictionaries
const translations = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.playlists": "Playlists",
    "nav.categories": "Categories",
    "nav.teachers": "Teachers",
    "nav.library": "My Library",
    "nav.settings": "Settings",
    "nav.menu": "Menu", // Added missing menu translation
    "nav.search.placeholder": "Search courses, teachers, playlists...",
    "nav.profile": "Profile",
    "nav.signout": "Sign out",
    "nav.theme.light": "Light",
    "nav.theme.dark": "Dark",
    "nav.theme.system": "System",

    // Home Page
    "home.hero.badge": "New Platform Launch",
    "home.hero.title": "Learn Anything,",
    "home.hero.title.accent": "Anywhere",
    "home.hero.description":
      "Discover thousands of audio courses from expert teachers worldwide. Perfect for learning on the go, during commutes, or while multitasking.",
    "home.hero.cta": "Start Learning Now",
    "home.hero.browse": "Browse Courses",
    "home.hero.stats.students": "50K+ Students",
    "home.hero.stats.rating": "4.8 Average Rating",
    "home.hero.stats.content": "1000+ Hours Content",
    "home.featured.title": "Featured Playlists",
    "home.trending.title": "Trending Now",
    "home.categories.title": "Browse by Category",
    "home.teachers.title": "Top Teachers",
    "home.viewall": "View All",

    // Audio Player
    "player.nowplaying": "Now Playing",
    "player.addtoplaylist": "Add to playlist",
    "player.download": "Download",
    "player.share": "Share",

    // Playlists
    "playlists.title": "Playlists",
    "playlists.description": "Discover curated collections of audio courses",
    "playlists.tracks": "tracks",
    "playlists.notfound": "Playlist not found",
    "playlists.back": "Back to Playlists",

    // Categories
    "categories.title": "Categories",
    "categories.description": "Explore courses by topic and subject",
    "categories.courses": "courses",
    "categories.notfound": "Category not found",
    "categories.back": "Back to Categories",
    "categories.available": "courses available",
    "categories.updated": "Updated regularly",
    "categories.playall": "Play All",
    "categories.filter": "Filter",
    "categories.filter.popular": "Most Popular",
    "categories.filter.newest": "Newest First",
    "categories.filter.shortest": "Shortest First",
    "categories.filter.longest": "Longest First",
    "categories.nocourses": "No courses available in this category yet.",

    // Teachers
    "teachers.title": "Teachers",
    "teachers.description": "Learn from expert instructors around the world",
    "teachers.filter.rated": "Highest Rated",
    "teachers.filter.students": "Most Students",
    "teachers.filter.courses": "Most Courses",
    "teachers.filter.newest": "Newest",
    "teachers.notfound": "Teacher not found",
    "teachers.back": "Back to Teachers",
    "teachers.rating": "rating",
    "teachers.students": "students",
    "teachers.courses": "courses",
    "teachers.playlatest": "Play Latest",
    "teachers.follow": "Follow",
    "teachers.share": "Share Profile",
    "teachers.report": "Report",
    "teachers.nocourses": "No courses available yet.",
    "teachers.noplaylists": "No playlists available yet.",

    // Search
    "search.title": "Search Results",
    "search.searching": "Searching...",
    "search.results": "results for",
    "search.prompt": "Enter a search term to find courses, playlists, and teachers",
    "search.start": "Start typing to search for courses, playlists, and teachers",
    "search.noresults": "No results found for",
    "search.tryagain": "Try different keywords or browse our categories",
    "search.topresults": "Top Results",
    "search.all": "All",
    "search.nocourses": "No courses found for",
    "search.noplaylists": "No playlists found for",
    "search.noteachers": "No teachers found for",
    "search.filter.relevant": "Most Relevant",
    "search.filter.recent": "Most Recent",
    "search.filter.popular": "Most Popular",

    // Common
    "common.back": "Back",
    "common.loading": "Loading...",
    "common.error": "Failed to load content",
    "common.tryagain": "Try Again",
    "common.min": "min",
    "common.hours": "hours",
    "common.plays": "plays",
    "common.trending": "Trending",
    "common.popular": "Popular",
    "common.course": "Course",
    "common.playlist": "Playlist",
    "common.teacher": "Teacher",
    "common.category": "Category",
  },
  ml: {
    // Navigation
    "nav.home": "ഹോം",
    "nav.playlists": "പ്ലേലിസ്റ്റുകൾ",
    "nav.categories": "വിഭാഗങ്ങൾ",
    "nav.teachers": "അധ്യാപകർ",
    "nav.library": "എന്റെ ലൈബ്രറി",
    "nav.settings": "ക്രമീകരണങ്ങൾ",
    "nav.menu": "മെനു", // Added missing menu translation in Malayalam
    "nav.search.placeholder": "കോഴ്സുകൾ, അധ്യാപകർ, പ്ലേലിസ്റ്റുകൾ തിരയുക...",
    "nav.profile": "പ്രൊഫൈൽ",
    "nav.signout": "സൈൻ ഔട്ട്",
    "nav.theme.light": "ലൈറ്റ്",
    "nav.theme.dark": "ഡാർക്ക്",
    "nav.theme.system": "സിസ്റ്റം",

    // Home Page
    "home.hero.badge": "പുതിയ പ്ലാറ്റ്ഫോം ലോഞ്ച്",
    "home.hero.title": "എന്തും പഠിക്കുക,",
    "home.hero.title.accent": "എവിടെയും",
    "home.hero.description":
      "ലോകമെമ്പാടുമുള്ള വിദഗ്ധ അധ്യാപകരിൽ നിന്ന് ആയിരക്കണക്കിന് ഓഡിയോ കോഴ്സുകൾ കണ്ടെത്തുക. യാത്രയിലും, യാത്രാമധ്യേയും, മൾട്ടിടാസ്കിംഗിനും അനുയോജ്യം.",
    "home.hero.cta": "ഇപ്പോൾ പഠനം ആരംഭിക്കുക",
    "home.hero.browse": "കോഴ്സുകൾ ബ്രൗസ് ചെയ്യുക",
    "home.hero.stats.students": "50K+ വിദ്യാർത്ഥികൾ",
    "home.hero.stats.rating": "4.8 ശരാശരി റേറ്റിംഗ്",
    "home.hero.stats.content": "1000+ മണിക്കൂർ ഉള്ളടക്കം",
    "home.featured.title": "ഫീച്ചർഡ് പ്ലേലിസ്റ്റുകൾ",
    "home.trending.title": "ഇപ്പോൾ ട്രെൻഡിംഗ്",
    "home.categories.title": "വിഭാഗം അനുസരിച്ച് ബ്രൗസ് ചെയ്യുക",
    "home.teachers.title": "മികച്ച അധ്യാപകർ",
    "home.viewall": "എല്ലാം കാണുക",

    // Audio Player
    "player.nowplaying": "ഇപ്പോൾ പ്ലേ ചെയ്യുന്നു",
    "player.addtoplaylist": "പ്ലേലിസ്റ്റിൽ ചേർക്കുക",
    "player.download": "ഡൗൺലോഡ്",
    "player.share": "പങ്കിടുക",

    // Playlists
    "playlists.title": "പ്ലേലിസ്റ്റുകൾ",
    "playlists.description": "ക്യൂറേറ്റഡ് ഓഡിയോ കോഴ്സ് ശേഖരങ്ങൾ കണ്ടെത്തുക",
    "playlists.tracks": "ട്രാക്കുകൾ",
    "playlists.notfound": "പ്ലേലിസ്റ്റ് കണ്ടെത്തിയില്ല",
    "playlists.back": "പ്ലേലിസ്റ്റുകളിലേക്ക് മടങ്ങുക",

    // Categories
    "categories.title": "വിഭാഗങ്ങൾ",
    "categories.description": "വിഷയവും വിഷയവും അനുസരിച്ച് കോഴ്സുകൾ പര്യവേക്ഷണം ചെയ്യുക",
    "categories.courses": "കോഴ്സുകൾ",
    "categories.notfound": "വിഭാഗം കണ്ടെത്തിയില്ല",
    "categories.back": "വിഭാഗങ്ങളിലേക്ക് മടങ്ങുക",
    "categories.available": "കോഴ്സുകൾ ലഭ്യമാണ്",
    "categories.updated": "പതിവായി അപ്ഡേറ്റ് ചെയ്യുന്നു",
    "categories.playall": "എല്ലാം പ്ലേ ചെയ്യുക",
    "categories.filter": "ഫിൽട്ടർ",
    "categories.filter.popular": "ഏറ്റവും ജനപ്രിയം",
    "categories.filter.newest": "ഏറ്റവും പുതിയത് ആദ്യം",
    "categories.filter.shortest": "ഏറ്റവും ചെറുത് ആദ്യം",
    "categories.filter.longest": "ഏറ്റവും നീളമുള്ളത് ആദ്യം",
    "categories.nocourses": "ഈ വിഭാഗത്തിൽ ഇതുവരെ കോഴ്സുകൾ ലഭ്യമല്ല.",

    // Teachers
    "teachers.title": "അധ്യാപകർ",
    "teachers.description": "ലോകമെമ്പാടുമുള്ള വിദഗ്ധ പ്രബോധകരിൽ നിന്ന് പഠിക്കുക",
    "teachers.filter.rated": "ഏറ്റവും ഉയർന്ന റേറ്റിംഗ്",
    "teachers.filter.students": "ഏറ്റവും കൂടുതൽ വിദ്യാർത്ഥികൾ",
    "teachers.filter.courses": "ഏറ്റവും കൂടുതൽ കോഴ്സുകൾ",
    "teachers.filter.newest": "ഏറ്റവും പുതിയത്",
    "teachers.notfound": "അധ്യാപകനെ കണ്ടെത്തിയില്ല",
    "teachers.back": "അധ്യാപകരിലേക്ക് മടങ്ങുക",
    "teachers.rating": "റേറ്റിംഗ്",
    "teachers.students": "വിദ്യാർത്ഥികൾ",
    "teachers.courses": "കോഴ്സുകൾ",
    "teachers.playlatest": "ഏറ്റവും പുതിയത് പ്ലേ ചെയ്യുക",
    "teachers.follow": "ഫോളോ ചെയ്യുക",
    "teachers.share": "പ്രൊഫൈൽ പങ്കിടുക",
    "teachers.report": "റിപ്പോർട്ട്",
    "teachers.nocourses": "ഇതുവരെ കോഴ്സുകൾ ലഭ്യമല്ല.",
    "teachers.noplaylists": "ഇതുവരെ പ്ലേലിസ്റ്റുകൾ ലഭ്യമല്ല.",

    // Search
    "search.title": "തിരയൽ ഫലങ്ങൾ",
    "search.searching": "തിരയുന്നു...",
    "search.results": "ഫലങ്ങൾ",
    "search.prompt": "കോഴ്സുകൾ, പ്ലേലിസ്റ്റുകൾ, അധ്യാപകർ കണ്ടെത്താൻ ഒരു തിരയൽ പദം നൽകുക",
    "search.start": "കോഴ്സുകൾ, പ്ലേലിസ്റ്റുകൾ, അധ്യാപകർ തിരയാൻ ടൈപ്പ് ചെയ്യാൻ ആരംഭിക്കുക",
    "search.noresults": "ഫലങ്ങൾ കണ്ടെത്തിയില്ല",
    "search.tryagain": "വ്യത്യസ്ത കീവേഡുകൾ പരീക്ഷിക്കുക അല്ലെങ്കിൽ ഞങ്ങളുടെ വിഭാഗങ്ങൾ ബ്രൗസ് ചെയ്യുക",
    "search.topresults": "മികച്ച ഫലങ്ങൾ",
    "search.all": "എല്ലാം",
    "search.nocourses": "കോഴ്സുകൾ കണ്ടെത്തിയില്ല",
    "search.noplaylists": "പ്ലേലിസ്റ്റുകൾ കണ്ടെത്തിയില്ല",
    "search.noteachers": "അധ്യാപകരെ കണ്ടെത്തിയില്ല",
    "search.filter.relevant": "ഏറ്റവും പ്രസക്തം",
    "search.filter.recent": "ഏറ്റവും പുതിയത്",
    "search.filter.popular": "ഏറ്റവും ജനപ്രിയം",

    // Common
    "common.back": "മടങ്ങുക",
    "common.loading": "ലോഡ് ചെയ്യുന്നു...",
    "common.error": "ഉള്ളടക്കം ലോഡ് ചെയ്യുന്നതിൽ പരാജയപ്പെട്ടു",
    "common.tryagain": "വീണ്ടും ശ്രമിക്കുക",
    "common.min": "മിനിറ്റ്",
    "common.hours": "മണിക്കൂർ",
    "common.plays": "പ്ലേകൾ",
    "common.trending": "ട്രെൻഡിംഗ്",
    "common.popular": "ജനപ്രിയം",
    "common.course": "കോഴ്സ്",
    "common.playlist": "പ്ലേലിസ്റ്റ്",
    "common.teacher": "അധ്യാപകൻ",
    "common.category": "വിഭാഗം",
  },
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "ml")) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Save language to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("language", language)
  }, [language])

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
