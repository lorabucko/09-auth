import axios from 'axios'

const baseURL = process.env.NEXT_PUBLIC_API_URL + '/api'

if (!baseURL) {
  throw new Error('NEXT_PUBLIC_API_URL is not defined')
}

export const api = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  withCredentials: true,
})
