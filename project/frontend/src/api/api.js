import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:8000/api/',
})

// Add JWT token to requests if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Auth endpoints
export const loginUser = (data) => API.post('accounts/token/', data)
export const registerUser = (data) => API.post('accounts/register/', data)
export const fetchProfile = () => API.get('accounts/profile/')
export const updateProfile = (data) => API.patch('accounts/profile/', data)

// Jobs endpoints
export const fetchJobs = (params = {}) => API.get('jobs/listings/', { params })
export const fetchJobDetail = (id) => API.get(`jobs/listings/${id}/`)
export const applyToJob = (jobId, data) => API.post('jobs/applications/', { job: jobId, ...data })
export const fetchMyApplications = () => API.get('jobs/my-applications/')

// Companies endpoints
export const fetchCompanies = () => API.get('jobs/companies/')

// Analytics endpoints
export const fetchJobAnalytics = () => API.get('analytics/jobs/')

export default API