import axios from 'axios'

const api = axios.create()

// Injeta o token em todas as requisições
api.interceptors.request.use(config => {
  const token = localStorage.getItem('tatame-token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// 401 → limpa sessão e dispara evento de logout
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('tatame-token')
      localStorage.removeItem('tatame-authed')
      window.dispatchEvent(new CustomEvent('tatame:logout'))
    }
    return Promise.reject(error)
  }
)

export default api
