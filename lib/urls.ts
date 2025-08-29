export const baseURL = process.env.NEXT_PUBLIC_BASE_URL

export const endpoints = {
    getTeachers: 'teachers',
    getPlaylists: 'playlists',
    getCategories: 'categories',
    getUser: 'users',
    signIn: 'users/signup',
    login: 'users/login',
    verifyOtp: '/users/verify-otp'
}