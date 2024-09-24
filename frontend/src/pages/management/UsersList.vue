<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { api } from '../../api'
import { useUserStore } from '../../stores/userStore';
import type {User} from "../../types";

const router = useRouter()

const userStore = useUserStore()

const users = ref([] as User[])
const error = ref<Error>()
const loading = ref(true)
const success = ref(false)

async function loadUsers(){
    try {
    const res = await api.get('/users', {
        headers: {
        Authorization: `Bearer ${userStore.jwt}`
      }
    });
    users.value = res.data.data;
  } catch (e) {
    error.value = e as Error
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
    <!-- <button @click="erro=undefined" type="button" class="btn-close" aria-label="Close"></button> -->
  </div>

  <div v-if="success" class="alert alert-success alert-dismissible" role="alert">
    O usuário foi removido com sucesso
    <button @click="success=false" type="button" class="btn-close" aria-label="Close"></button>
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
          <RouterLink class="btn btn-sm btn-info" :to="`/users/${user.id}`">Editar</RouterLink>
          <button @click="" class="btn btn-sm btn-danger"><i class="bi bi-trash">Deletar</i></button>
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
    width: 100%;
    box-sizing: border-box; 
    border-collapse: collapse;
    border-radius: 20px;
    background-color: var(--light-color);
  }

  .list-table tbody tr{
    margin-bottom: 1px solid gray;
  }

  .list-table td, .list-table th{
    text-align: center;
    padding: var(--main-padding);
  }
</style>
