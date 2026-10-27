import axios from 'axios'
import { auth } from '../auth'

const api = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 10000,
})

// Attach the token to every request when the user is logged in
api.interceptors.request.use((config) => {
  if (auth.token) config.headers.Authorization = `Bearer ${auth.token}`
  return config
})

export function errorText(err) {
  if (err.code === 'ECONNABORTED') return 'The server took too long to answer. Try again.'
  if (err.response) return err.response.data?.message || `Server error (${err.response.status}).`
  return 'No connection. Check your internet and try again.'
}

export default api
