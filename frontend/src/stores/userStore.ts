import { ref, computed } from 'vue';
import { defineStore } from 'pinia'
import type { User } from '../types'

export const useUserStore = defineStore('user', () => {
    const user = ref<Omit<User, 'password'>>({
        id: Number(localStorage.getItem('id')),
        name: localStorage.getItem('name') || "",
        username: localStorage.getItem('username') || "",
        email: localStorage.getItem('email') || "",
        role: {
            id: Number(localStorage.getItem('roleId')),
            name: localStorage.getItem('role') || ""
    }
})

const jwt = ref('')

const role = computed(() => user.value.role.name)
const username = computed(() => user.value.username)
const isAuthenticated = computed(() => jwt.value !== "")


function authenticaded(authUser: User, token: string) {
  user.value = authUser
  jwt.value = token

  localStorage.setItem('username', authUser.username)
  localStorage.setItem('id', authUser.id.toString())
  localStorage.setItem('email', authUser.email)
  localStorage.setItem('role', authUser.role.name)
<<<<<<< HEAD
=======
  localStorage.setItem('jwt', token)
>>>>>>> d473681 (Entrega 05: Página de login e cadastro OK)
}

function logout() {
    jwt.value = ""
    user.value = {} as User
<<<<<<< HEAD

=======
>>>>>>> d473681 (Entrega 05: Página de login e cadastro OK)
    localStorage.clear()
  }

  return { user, username, jwt, role, isAuthenticated, authenticaded, logout}
})