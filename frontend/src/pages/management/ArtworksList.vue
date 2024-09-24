<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { api } from '../../api'
import { useUserStore } from '../../stores/userStore';
import type {Author} from "../../types";

const router = useRouter()

const userStore = useUserStore()

const authors = ref([] as Author[])
const error = ref<Error>()
const loading = ref(true)
const success = ref(false)

async function loadArtworks(){
    try {
    const res = await api.get('/artworks', {
        headers: {
        Authorization: `Bearer ${userStore.jwt}`
      }
    });
    authors.value = res.data.data;
  } catch (e) {
    error.value = e as Error
  } finally {
    loading.value = false
  }
};

loadArtworks()
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
          <RouterLink class="btn btn-sm btn-info" :to="`/authors/${author.id}`">Editar</RouterLink>
          <button @click="" class="btn btn-sm btn-danger"><i class="bi bi-trash">Deletar</i></button>
        </td>
      </tr>
      <tr>
        
        <td><a href="/artworks/new">Adicionar um trabalho</a></td>
        
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
</style>
