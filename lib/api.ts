const API_BASE = "https://947eb8e1-c73e-42c4-934a-6a4ffd00fda7.mock.pstmn.io"
import axios from "axios"
import Cookie from "js-cookie"

export interface ApiTrack {
  id: string
  name: string
  description?: string
  fileUrl: string
  thumbnail?: string
  duration: number
  teacherId: string
  teacherName: string
  categoryId: string
  categoryName: string
  language: string
  createdAt: string
  plays: number
}

export interface ApiPlaylist {
  id: string
  name: string
  description: string
  thumbnail?: string
  tracks?: ApiTrack[]
  teacherId?: string
  teacherName?: string
  totalDuration: number
  trackCount: number
  createdAt: string
}

export interface ApiCategory {
  id: string
  name: string
  description: string
  thumbnail?: string
  tracks: ApiTrack[]
  trackCount: number
}

export interface ApiTeacher {
  id: string
  name: string
  bio: string
  avatar?: string
  trackCount: number
  totalStudents: number
  rating: number
}

const DUMMY_TEACHERS: ApiTeacher[] = [
  {
    id: "1",
    name: "Usthad Ashiq bin Abdul Azeez",
    bio: "Renowned Islamic scholar specializing in Aqeeda and Arabic language studies",
    avatar: "/placeholder.svg?height=200&width=200",
    trackCount: 45,
    totalStudents: 1250,
    rating: 4.9,
  },
  {
    id: "2",
    name: "Usthad Yahya bin Abdu Razak",
    bio: "Expert in Hadith studies and Islamic jurisprudence with over 15 years of teaching experience",
    avatar: "/placeholder.svg?height=200&width=200",
    trackCount: 38,
    totalStudents: 980,
    rating: 4.8,
  },
  {
    id: "3",
    name: "Usthad Thoufeeq bin Rafeeq",
    bio: "Specialist in Tafseer and Seerah studies, known for clear and engaging explanations",
    avatar: "/placeholder.svg?height=200&width=200",
    trackCount: 52,
    totalStudents: 1450,
    rating: 4.9,
  },
  {
    id: "4",
    name: "Usthad Niyaf bin Khalid",
    bio: "Arabic language expert and Fiqh scholar with extensive knowledge in Islamic law",
    avatar: "/placeholder.svg?height=200&width=200",
    trackCount: 41,
    totalStudents: 1100,
    rating: 4.7,
  },
  {
    id: "5",
    name: "Usthad Abdul Muhsin Aydeed",
    bio: "Distinguished scholar in Islamic theology and comparative religion studies",
    avatar: "/placeholder.svg?height=200&width=200",
    trackCount: 35,
    totalStudents: 850,
    rating: 4.8,
  },
  {
    id: "6",
    name: "Usthad Hashim Swalahi",
    bio: "Expert in Islamic spirituality and purification of the soul (Tazkiyah)",
    avatar: "/placeholder.svg?height=200&width=200",
    trackCount: 29,
    totalStudents: 720,
    rating: 4.9,
  },
]

const DUMMY_CATEGORIES: ApiCategory[] = [
  {
    id: "1",
    name: "Arabic",
    description: "Learn classical Arabic language and grammar",
    thumbnail: "/placeholder.svg?height=200&width=200",
    trackCount: 85,
  },
  {
    id: "2",
    name: "Aqeeda",
    description: "Islamic creed and theology studies",
    thumbnail: "/placeholder.svg?height=200&width=200",
    trackCount: 67,
  },
  {
    id: "3",
    name: "Fiqh",
    description: "Islamic jurisprudence and legal studies",
    thumbnail: "/placeholder.svg?height=200&width=200",
    trackCount: 92,
  },
  {
    id: "4",
    name: "Seerah",
    description: "Biography and life of Prophet Muhammad (PBUH)",
    thumbnail: "/placeholder.svg?height=200&width=200",
    trackCount: 45,
  },
  {
    id: "5",
    name: "Tafseer",
    description: "Quranic exegesis and interpretation",
    thumbnail: "/placeholder.svg?height=200&width=200",
    trackCount: 78,
  },
  {
    id: "6",
    name: "Hadees",
    description: "Prophetic traditions and sayings",
    thumbnail: "/placeholder.svg?height=200&width=200",
    trackCount: 156,
  },
]

const DUMMY_TRACKS: ApiTrack[] = [
  // Three Fundamental Principles tracks
  {
    id: "1",
    title: "Introduction to Three Fundamental Principles",
    description: "Understanding the basic principles every Muslim should know",
    fileUrl: "/audio/sample.mp3",
    thumbnail: "/placeholder.svg?height=200&width=200",
    duration: 1800,
    teacherId: "1",
    teacherName: "Usthad Ashiq bin Abdul Azeez",
    categoryId: "2",
    categoryName: "Aqeeda",
    language: "en",
    createdAt: "2024-01-15",
    plays: 2450,
  },
  {
    id: "2",
    title: "The First Principle - Knowing Allah",
    description: "Deep dive into knowing your Lord",
    fileUrl: "/audio/sample.mp3",
    thumbnail: "/placeholder.svg?height=200&width=200",
    duration: 2100,
    teacherId: "1",
    teacherName: "Usthad Ashiq bin Abdul Azeez",
    categoryId: "2",
    categoryName: "Aqeeda",
    language: "en",
    createdAt: "2024-01-16",
    plays: 1980,
  },
  // Arabic Course tracks
  {
    id: "3",
    title: "Madina Arabic Course - Lesson 1",
    description: "Beginning Arabic grammar and vocabulary",
    fileUrl: "/audio/sample.mp3",
    thumbnail: "/placeholder.svg?height=200&width=200",
    duration: 2400,
    teacherId: "4",
    teacherName: "Usthad Niyaf bin Khalid",
    categoryId: "1",
    categoryName: "Arabic",
    language: "en",
    createdAt: "2024-01-10",
    plays: 3200,
  },
  {
    id: "4",
    title: "Ajrumiyya - Arabic Grammar Fundamentals",
    description: "Classical Arabic grammar text explanation",
    fileUrl: "/audio/sample.mp3",
    thumbnail: "/placeholder.svg?height=200&width=200",
    duration: 2700,
    teacherId: "4",
    teacherName: "Usthad Niyaf bin Khalid",
    categoryId: "1",
    categoryName: "Arabic",
    language: "en",
    createdAt: "2024-01-12",
    plays: 1850,
  },
  // Hadith tracks
  {
    id: "5",
    title: "Bulugh al-Maram - Chapter on Purification",
    description: "Hadith collection on Islamic law",
    fileUrl: "/audio/sample.mp3",
    thumbnail: "/placeholder.svg?height=200&width=200",
    duration: 3000,
    teacherId: "2",
    teacherName: "Usthad Yahya bin Abdu Razak",
    categoryId: "6",
    categoryName: "Hadees",
    language: "en",
    createdAt: "2024-01-08",
    plays: 2750,
  },
  {
    id: "6",
    title: "Sahih Muslim - Book of Faith",
    description: "Authentic hadith collection study",
    fileUrl: "/audio/sample.mp3",
    thumbnail: "/placeholder.svg?height=200&width=200",
    duration: 2850,
    teacherId: "2",
    teacherName: "Usthad Yahya bin Abdu Razak",
    categoryId: "6",
    categoryName: "Hadees",
    language: "en",
    createdAt: "2024-01-05",
    plays: 3100,
  },
]

const DUMMY_PLAYLISTS: ApiPlaylist[] = [
  {
    id: "1",
    title: "Three Fundamental Principles",
    description: "Complete course on the three fundamental principles every Muslim should know",
    thumbnail: "/placeholder.svg?height=200&width=200",
    tracks: DUMMY_TRACKS.slice(0, 2),
    teacherId: "1",
    teacherName: "Usthad Ashiq bin Abdul Azeez",
    totalDuration: 3900,
    trackCount: 2,
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    title: "Four Fundamental Principles",
    description: "Advanced study of the four fundamental principles of Islamic monotheism",
    thumbnail: "/placeholder.svg?height=200&width=200",
    tracks: [],
    teacherId: "1",
    teacherName: "Usthad Ashiq bin Abdul Azeez",
    totalDuration: 4200,
    trackCount: 3,
    createdAt: "2024-01-20",
  },
  {
    id: "3",
    title: "The Nullifiers of Islam",
    description: "Understanding what nullifies one's Islam - essential knowledge",
    thumbnail: "/placeholder.svg?height=200&width=200",
    tracks: [],
    teacherId: "1",
    teacherName: "Usthad Ashiq bin Abdul Azeez",
    totalDuration: 3600,
    trackCount: 4,
    createdAt: "2024-01-25",
  },
  {
    id: "4",
    title: "Removing Doubts",
    description: "Clarifying misconceptions and doubts about Islamic teachings",
    thumbnail: "/placeholder.svg?height=200&width=200",
    tracks: [],
    teacherId: "3",
    teacherName: "Usthad Thoufeeq bin Rafeeq",
    totalDuration: 5400,
    trackCount: 6,
    createdAt: "2024-02-01",
  },
  {
    id: "5",
    title: "Aqeeda Wasitiya",
    description: "Ibn Taymiyyah's famous treatise on Islamic creed",
    thumbnail: "/placeholder.svg?height=200&width=200",
    tracks: [],
    teacherId: "1",
    teacherName: "Usthad Ashiq bin Abdul Azeez",
    totalDuration: 7200,
    trackCount: 8,
    createdAt: "2024-02-05",
  },
  {
    id: "6",
    title: "Risala Tadmuriyya",
    description: "Ibn Taymiyyah's letter on the divine names and attributes",
    thumbnail: "/placeholder.svg?height=200&width=200",
    tracks: [],
    teacherId: "5",
    teacherName: "Usthad Abdul Muhsin Aydeed",
    totalDuration: 6300,
    trackCount: 7,
    createdAt: "2024-02-10",
  },
  {
    id: "7",
    title: "Haiyya of Ibn Abi Dawud",
    description: "Classical poem on Islamic creed with detailed explanation",
    thumbnail: "/placeholder.svg?height=200&width=200",
    tracks: [],
    teacherId: "1",
    teacherName: "Usthad Ashiq bin Abdul Azeez",
    totalDuration: 4800,
    trackCount: 5,
    createdAt: "2024-02-15",
  },
  {
    id: "8",
    title: "Aqeeda Tahawiyya",
    description: "Imam Tahawi's comprehensive statement of Islamic belief",
    thumbnail: "/placeholder.svg?height=200&width=200",
    tracks: [],
    teacherId: "5",
    teacherName: "Usthad Abdul Muhsin Aydeed",
    totalDuration: 8100,
    trackCount: 9,
    createdAt: "2024-02-20",
  },
  {
    id: "9",
    title: "Usul Sunnah",
    description: "Foundations of the Sunnah by Imam Ahmad",
    thumbnail: "/placeholder.svg?height=200&width=200",
    tracks: [],
    teacherId: "2",
    teacherName: "Usthad Yahya bin Abdu Razak",
    totalDuration: 5700,
    trackCount: 6,
    createdAt: "2024-02-25",
  },
  {
    id: "10",
    title: "Sharh Sunnah",
    description: "Explanation of the Sunnah methodology",
    thumbnail: "/placeholder.svg?height=200&width=200",
    tracks: [],
    teacherId: "2",
    teacherName: "Usthad Yahya bin Abdu Razak",
    totalDuration: 6900,
    trackCount: 8,
    createdAt: "2024-03-01",
  },
  {
    id: "11",
    title: "Meezaan",
    description: "The scale of Islamic knowledge and understanding",
    thumbnail: "/placeholder.svg?height=200&width=200",
    tracks: [],
    teacherId: "3",
    teacherName: "Usthad Thoufeeq bin Rafeeq",
    totalDuration: 4500,
    trackCount: 5,
    createdAt: "2024-03-05",
  },
  {
    id: "12",
    title: "Ajnaas",
    description: "Categories and classifications in Islamic knowledge",
    thumbnail: "/placeholder.svg?height=200&width=200",
    tracks: [],
    teacherId: "4",
    teacherName: "Usthad Niyaf bin Khalid",
    totalDuration: 3900,
    trackCount: 4,
    createdAt: "2024-03-10",
  },
  {
    id: "13",
    title: "Ajrumiyya",
    description: "Classical Arabic grammar text - complete course",
    thumbnail: "/placeholder.svg?height=200&width=200",
    tracks: [DUMMY_TRACKS[3]],
    teacherId: "4",
    teacherName: "Usthad Niyaf bin Khalid",
    totalDuration: 9600,
    trackCount: 12,
    createdAt: "2024-03-15",
  },
  {
    id: "14",
    title: "Madina Arabic Course",
    description: "Comprehensive Arabic language learning program",
    thumbnail: "/placeholder.svg?height=200&width=200",
    tracks: [DUMMY_TRACKS[2]],
    teacherId: "4",
    teacherName: "Usthad Niyaf bin Khalid",
    totalDuration: 14400,
    trackCount: 18,
    createdAt: "2024-03-20",
  },
  {
    id: "15",
    title: "Alfiyya",
    description: "Ibn Malik's famous thousand-line poem on Arabic grammar",
    thumbnail: "/placeholder.svg?height=200&width=200",
    tracks: [],
    teacherId: "4",
    teacherName: "Usthad Niyaf bin Khalid",
    totalDuration: 18000,
    trackCount: 25,
    createdAt: "2024-03-25",
  },
  {
    id: "16",
    title: "Umdatul Ahkam",
    description: "Selected authentic hadiths on Islamic rulings",
    thumbnail: "/placeholder.svg?height=200&width=200",
    tracks: [],
    teacherId: "2",
    teacherName: "Usthad Yahya bin Abdu Razak",
    totalDuration: 10800,
    trackCount: 15,
    createdAt: "2024-04-01",
  },
  {
    id: "17",
    title: "Bulugh al-Maram",
    description: "Attainment of the objective according to evidence of the ordinances",
    thumbnail: "/placeholder.svg?height=200&width=200",
    tracks: [DUMMY_TRACKS[4]],
    teacherId: "2",
    teacherName: "Usthad Yahya bin Abdu Razak",
    totalDuration: 21600,
    trackCount: 30,
    createdAt: "2024-04-05",
  },
  {
    id: "18",
    title: "Sahih Muslim",
    description: "Complete study of Imam Muslim's authentic hadith collection",
    thumbnail: "/placeholder.svg?height=200&width=200",
    tracks: [DUMMY_TRACKS[5]],
    teacherId: "2",
    teacherName: "Usthad Yahya bin Abdu Razak",
    totalDuration: 36000,
    trackCount: 50,
    createdAt: "2024-04-10",
  },
  {
    id: "19",
    title: "Da'wa wa Dawa",
    description: "The call to Islam and its methodology",
    thumbnail: "/placeholder.svg?height=200&width=200",
    tracks: [],
    teacherId: "3",
    teacherName: "Usthad Thoufeeq bin Rafeeq",
    totalDuration: 7200,
    trackCount: 10,
    createdAt: "2024-04-15",
  },
  {
    id: "20",
    title: "Madariju Salikeen",
    description: "Ranks of the divine seekers - spiritual journey in Islam",
    thumbnail: "/placeholder.svg?height=200&width=200",
    tracks: [],
    teacherId: "6",
    teacherName: "Usthad Hashim Swalahi",
    totalDuration: 25200,
    trackCount: 35,
    createdAt: "2024-04-20",
  },
]

class ApiClient {
  private async fetchWithErrorHandling<T>(endpoint: string): Promise<T> {
    console.log(`Fetching data for ${endpoint}`)
    const dummyData = this.getDummyData<T>(endpoint)
    console.log(`Returning dummy data for ${endpoint}:`, dummyData)
    return dummyData

    // Original API fetch code commented out for now
    /*
    try {
      const response = await fetch(`${API_BASE}${endpoint}`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error(`API Error for ${endpoint}:`, error)
      return this.getDummyData<T>(endpoint)
    }
    */
  }

  private getDummyData<T>(endpoint: string): T {
    if (endpoint === "/media") {
      return DUMMY_TRACKS as T
    } else if (endpoint.startsWith("/media/")) {
      const id = endpoint.split("/")[2]
      return DUMMY_TRACKS.find((track) => track.id === id) as T
    } else if (endpoint === "/playlists") {
      return DUMMY_PLAYLISTS as T
    } else if (endpoint.startsWith("/playlists/")) {
      const id = endpoint.split("/")[2]
      return DUMMY_PLAYLISTS.find((playlist) => playlist.id === id) as T
    } else if (endpoint === "/categories") {
      return DUMMY_CATEGORIES as T
    } else if (endpoint.startsWith("/categories/")) {
      const id = endpoint.split("/")[2]
      return DUMMY_CATEGORIES.find((category) => category.id === id) as T
    } else if (endpoint === "/teachers") {
      return DUMMY_TEACHERS as T
    } else if (endpoint.startsWith("/teachers/")) {
      const id = endpoint.split("/")[2]
      return DUMMY_TEACHERS.find((teacher) => teacher.id === id) as T
    }
    throw new Error(`No dummy data available for ${endpoint}`)
  }

  async getMedia(): Promise<ApiTrack[]> {
    return this.fetchWithErrorHandling<ApiTrack[]>("/media")
  }

  async getMediaById(id: string): Promise<ApiTrack> {
    return this.fetchWithErrorHandling<ApiTrack>(`/media/${id}`)
  }

  async getPlaylists(): Promise<ApiPlaylist[]> {
    return this.fetchWithErrorHandling<ApiPlaylist[]>("/playlists")
  }

  async getPlaylistById(id: string): Promise<ApiPlaylist> {
    return this.fetchWithErrorHandling<ApiPlaylist>(`/playlists/${id}`)
  }

  async getCategories(): Promise<ApiCategory[]> {
    return this.fetchWithErrorHandling<ApiCategory[]>("/categories")
  }

  async getCategoryById(id: string): Promise<ApiCategory> {
    return this.fetchWithErrorHandling<ApiCategory>(`/categories/${id}`)
  }

  async getTeachers(): Promise<ApiTeacher[]> {
    return this.fetchWithErrorHandling<ApiTeacher[]>("/teachers")
  }

  async getTeacherById(id: string): Promise<ApiTeacher> {
    return this.fetchWithErrorHandling<ApiTeacher>(`/teachers/${id}`)
  }
}

export const apiClient = new ApiClient()

// Helper function to convert API track to audio context track
export function convertApiTrackToTrack(apiTrack: ApiTrack) {
  return {
    id: apiTrack.id,
    name: apiTrack.name,
    teacher: apiTrack.teacherName,
    fileUrl: apiTrack.fileUrl,
    thumbnail: apiTrack.thumbnail || "/placeholder.svg?height=200&width=200",
    duration: apiTrack.duration,
    language: apiTrack.language,
  }
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,

})

api.interceptors.request.use(async function (config) {
  let token = null;
  if (typeof window === "undefined") {
    const { cookies } = (await import('next/headers'))
    token = (await cookies()).get('token')?.value
  } else {
    token = Cookie.get('token')
  }
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

api.interceptors.response.use(undefined, async (error) => {
  if (error.response?.status === 401) {
    // await refreshToken();
    // return instance(error.config); // Retry original request
  }

  throw error;
});



export { api }
