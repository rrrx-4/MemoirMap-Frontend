import axios from "axios"



const API = axios.create({ baseURL: "http://localhost:3000" })

API.interceptors.request.use((req) => {
    if (localStorage.getItem('Profile')) {
        // console.log(JSON.parse(localStorage.getItem("Profile")).token);
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem("Profile")).token}`
    }
    return req
})

export const signIn = (formData) => API.post("/users/signin", formData)

export const signUp = (formData) => API.post("/users/signup", formData)

export const googleSignIn = (result) => API.post("/users/googleSignIn", result)

export const createTour = (tourData) => API.post("/tour", tourData)

export const getTours = (page) => API.get(`/tour?page=${page}`)
export const getTour = (id) => API.get(`/tour/${id}`)

export const getToursByUser = (userId) => API.get(`/tour/userTours/${userId}`)



export const deleteTour = (id) => API.delete(`/tour/${id}`)

export const updatedTour = (updatedTourData, id) => API.patch(`/tour/${id}`, updatedTourData)

export const getToursBySearch = (searchQuery) => API.get(`/tour/search?searchQuery=${searchQuery}`)

export const getTagTours = (tag) => API.get(`/tour/tag/${tag}`);
export const getRelatedTours = (tags) => API.post(`/tour/relatedTours`, tags);

export const likeTour = (id) => API.patch(`/tour/like/${id}`)