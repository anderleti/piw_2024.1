<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { api } from '../../api'
import { useUserStore } from '../../stores/userStore';
import { isAxiosError } from 'axios';
import { isApplicationError } from '../../composables/useApplicationError'
import type { Author, Artwork, ApplicationError } from '../../types';

const router = useRouter()

const userStore = useUserStore()

const artworks = ref([] as Artwork[])
const success = ref({
    status: false,
    message: ''
})
const error = ref<ApplicationError>()
const loading = ref(false)

async function loadArtworks(){
  loading.value = true
    try {
    const res = await api.get('/artworks', {
        headers: {
        Authorization: `Bearer ${userStore.jwt}`
      }
    });
    artworks.value = res.data.data;
  } catch (e) {
    if (isAxiosError(e) && isApplicationError(e)) {
            error.value = e.response?.data
        }
  } finally {
    loading.value = false
  }
};

async function deleteArtwork(id:number){
    try {
    const res = await api.delete(`/artworks/${id}`, {
        headers: {
        Authorization: `Bearer ${userStore.jwt}`
      }
    });
    let deleted = artworks.value.findIndex(a=>id === a.id);
    artworks.value.splice(deleted, 1)
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

onMounted(async() => {
  loadArtworks()
})

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
        <th>Título</th>
        <th>Descrição</th>
        <th>Tag</th>
        <th>Autor</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="artwork in artworks" :key="artwork.id">
        <td>{{ artwork.id }}</td>
        <td>{{ artwork.title }}</td>
        <td>{{ artwork.desc }}</td> 
        <td>{{ artwork.tag }}</td>
        <td>{{ artwork.author.name }}</td>
        <td>
          <RouterLink class="list-btn-action" :to="`/authors/${artwork.id}`">Editar</RouterLink>
          <button @click="deleteArtwork(artwork.id)" class="list-btn-action">Deletar</button>
        </td>
      </tr>
      <tr>
        
        <td colspan="6" class="create-new"><a href="/artworks/new">Adicionar um trabalho</a></td>
        
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
    margin-bottom: 1px solid gray;
  }

  .list-table td, .list-table th{
    padding: 12px;
    text-align: center;
    
  }

  .list-table td div{
    height: 30px;
    width: 100%;
    overflow: hidden;
    display: flex;
    align-items: stretch;
  }

  .list-table td div img{
    height: 100%;
  }

  .create-new a {
    background-color: var(--dark-color);
    color: var(--light-color);
    padding: 10px;
    border-radius: 20px;
  }

  .list-btn-action {
    margin-top: 10px;
    background-color: #6E1110;
    color: var(--light-color);
    padding: 8px;
    border-radius: 10px;
    border: none;
    font-size: 0.8em;
    cursor: pointer;
  }

  .list-btn-action:first-child{
    padding: 10px;
    background-color: #bb5604;
  }
</style>
