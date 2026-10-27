import { reactive } from 'vue'

// Tiny auth store (no Vuex needed). State is kept in localStorage.
export const auth = reactive({
  token: localStorage.getItem('token'),
  user: JSON.parse(localStorage.getItem('user') || 'null'),
})

export function setSession(data) {
  auth.token = data.accessToken
  auth.user = { id: data.id, username: data.username, firstName: data.firstName }
  localStorage.setItem('token', auth.token)
  localStorage.setItem('user', JSON.stringify(auth.user))
}

export function logout() {
  auth.token = null
  auth.user = null
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}
