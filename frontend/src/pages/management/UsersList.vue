<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { api } from '../../api'
import { useUserStore } from '../../stores/userStore';
import type {User, ApplicationError} from "../../types";
import { isAxiosError } from 'axios';
import { isApplicationError } from '../../composables/useApplicationError'

const router = useRouter()

const userStore = useUserStore()

const users = ref([] as User[])
const error = ref<ApplicationError>()
const loading = ref(true)
const success = ref({
    status: false,
    message: ''
})
async function loadUsers(){
    try {
    const res = await api.get('/users', {
        headers: {
        Authorization: `Bearer ${userStore.jwt}`
      }
    });
    users.value = res.data.data;
  } catch (e) {
    if (isAxiosError(e) && isApplicationError(e)) {
            error.value = e.response?.data
        }
  } finally {
    loading.value = false
  }
};

async function deleteUser(id:number){
    try {
    const res = await api.delete(`/users/${id}`, {
        headers: {
        Authorization: `Bearer ${userStore.jwt}`
      }
    });
    let deleted = users.value.findIndex(a=>id === a.id);
    users.value.splice(deleted, 1)
    success.value.status = true;
    success.value.message = "Trabalho deletado com sucesso."
  
  } catch (e) {
    if (isAxiosError(e) && isApplicationError(e)) {
            error.value = e.response?.data
        }
  } finally {
    loading.value = false
  }
};

loadUsers()
</script>

<template>

<div class="table-container">

  <div v-if="error" class="alert alert-danger alert-dismissible" role="alert">
    {{ error.message }}
    <button @click="error=undefined" type="button" aria-label="Fechar"></button>
  </div>

  <div v-if="success" class="alert alert-success alert-dismissible" role="alert">
    {{ success.message }}
    <button @click="success.status=false" type="button" class="btn-close" aria-label="Close"></button>
  </div>

  <div v-if="loading" class="d-flex justify-content-center">
    <div class="spinner-grow" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>

  <table v-else class="list-table">
  <thead>
      <tr>
        <th>Id</th>
        <th>Nome</th>
        <th>Username</th>
        <th>Email</th>
        <th>Role</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in users" :key="user.id">
        <td>{{ user.id }}</td>
        <td>{{ user.name }}</td>
        <td>{{ user.username }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.role.name }}</td>
        <td>
          <RouterLink class="list-btn-action" :to="`/users/${user.id}`">Editar</RouterLink>
          <button @click="" class="list-btn-action"><i class="bi bi-trash">Deletar</i></button>
        </td>
      </tr>
    </tbody>
  </table>

</div>

</template>

<style scoped>
  .table-container{
    
    width: 100vw;
    box-sizing: border-box;
    padding: var(--main-padding);
  }

  .list-table{
    margin: 0 auto;
    width: 90%;
    box-sizing: border-box; 
    border-collapse: collapse;
    border-radius: 20px;
    background-color: var(--light-color);
  }

  .list-table tbody tr{
    align-items: center;
    margin-bottom: 1px solid gray;
  }

  .list-table td, .list-table th{
    text-align: center;
    padding: 15px;
  }

  .create-new a {
    background-color: var(--dark-color);
    color: var(--light-color);
    padding: 10px;
    border-radius: 20px;
  }

  .list-btn-action {
    background-color: #6E1110;
    color: var(--light-color);
    padding: 10px;
    border-radius: 10px;
    border: none;
    font-size: 0.8em;
    cursor: pointer;
  }

  .list-btn-action:first-child{
    margin-right: 10px;
    padding: 12px;
    background-color: #bb5604;
  }
</style>
