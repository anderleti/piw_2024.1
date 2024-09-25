<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { api } from '../../api'
import { useUserStore } from '../../stores/userStore';
import type {Author, ApplicationError} from "../../types";
import { isAxiosError } from 'axios';
import { isApplicationError } from '../../composables/useApplicationError'


const router = useRouter()

const userStore = useUserStore()

const authors = ref([] as Author[])

const error = ref<ApplicationError>()
const loading = ref(true)
const success = ref({
    status: false,
    message: ''
})

async function loadUsers(){
    try {
    const res = await api.get('/authors', {
        headers: {
        Authorization: `Bearer ${userStore.jwt}`
      }
    });
    authors.value = res.data.data;
  } catch (e) {
    if (isAxiosError(e) && isApplicationError(e)) {
            error.value = e.response?.data
        }
  } finally {
    loading.value = false
  }
};

async function deleteAuthor(id:number){
    try {
    const res = await api.delete(`/authors/${id}`, {
        headers: {
        Authorization: `Bearer ${userStore.jwt}`
      }
    });
    let deleted = authors.value.findIndex(a=>id === a.id);
    authors.value.splice(deleted, 1)
    success.value.status = true;
    success.value.message = "Artista deletado com sucesso."
  
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

  <div v-if="error" class="error" role="alert">
    {{ error.message }}
    <button @click="error=undefined" type="button" class="btn-close" aria-label="Close"></button>
  </div>

  <div v-if="success.status" class="success" role="alert">
    {{ success.message }}
    <button @click="success.status = false" type="button" class="btn-close" aria-label="Close"></button>
  </div>

  <div v-if="loading" class="d-flex justify-content-center">
    <div class="spinner-grow" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>

  <table v-else class="list-table">
  <thead>
      <tr>
        <th>Foto</th>
        <th>Id</th>
        <th>Nome</th>
        <th>Username</th>
        <th>Bio</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="author in authors" :key="author.id">
        <td><div><img :src="author.photo" :alt="author.name"></div></td>
        <td>{{ author.id }}</td>
        <td>{{ author.name }}</td>
        <td>{{ author.username }}</td>
        <td>{{ author.bio }}</td>
        <td>
          <RouterLink class="list-btn-action" :to="`/authors/${author.id}`">Editar</RouterLink>
          <button @click="deleteAuthor(author.id)" class="list-btn-action">Deletar</button>
        </td>
      </tr>
      <tr>
        
        <td colspan="6" class="create-new" ><a  href="/authors/new">Adicionar um artista</a></td>
        
      </tr>
    </tbody>
  </table>

</div>

</template>

<style scoped>
  .table-container{
    margin-top: 20px;
    display: block; 
    margin-left: auto; 
    margin-right: auto; 
    padding-top: 20px, 20px, 20px;
    width: 80vw;
    box-sizing: border-box;
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

  .list-table td div{
    height: 30px;
    width: 100%;
    overflow: hidden;
    display: flex;
    justify-content: center;
  }

  .list-table td div img{
    height: 100%;
  }

  .create-new a {
    display: inline-block;
    align-items: end;
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
    padding: 12px;
    margin-right: 10px;
    background-color: #bb5604;
  }

</style>
