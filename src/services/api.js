import api from '../lib/api.js'

export const BookService = {
  getPopular: () => api.get('/books/popular'),
  search: (params) => api.get('/books', { params }),
  getById: (id) => api.get(`/books/${id}`),
  create: (data) => api.post('/books', data),
}

export const AuthService = {
  login: (credentials) => api.post('/login', credentials),
  logout: () => api.post('/logout'),
  me: () => api.get('/me'),
}

export const LoanService = {
  myLoans: () => api.get('/my-loans'),
  borrow: (data) => api.post('/loans/borrow', data),
  returnBook: (loanId) => api.post(`/loans/${loanId}/return`),
  extend: (loanId) => api.post(`/loans/${loanId}/extend`),
}

export default api
