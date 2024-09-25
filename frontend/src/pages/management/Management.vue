<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { api } from '../../api'
import { useUserStore } from '../../stores/userStore';
import type {User} from "../../types";

const router = useRouter()

const userStore = useUserStore()
</script>

<template>

<div class="table-container">
  <table class="list-table">
  <thead>
      <tr>
        <th>Ação</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <RouterLink class="list-redirect" :to="`/users`">Gerenciar usuários</RouterLink>
      </tr>
      <tr>
        <RouterLink class="list-redirect" :to="`/authors`">Gerenciar artistas</RouterLink>
      </tr>
      <tr>
        <RouterLink class="list-redirect" :to="`/artworks`">Gerenciar trabalhos</RouterLink>
      </tr>
    </tbody>
  </table>

</div>

</template>

<style scoped>

  .table-container{
    align-items: end;
    padding: 20px;
    margin: auto;
    width: 500px;
    height: 200px;
    box-sizing: border-box;
  }

  .list-table{
    padding: 20px;
    margin-top: 10px;
    text-align: left;
    width: 100%;
    box-sizing: border-box; 
    border-radius: 20px;
    background-color: var(--light-color);
  }

  .list-table tbody tr{
    
    margin-bottom: 1px solid gray;
    text-align: center;
    padding: 10px;
  }

  .list-table td, .list-table th{
    
    text-align: center;
    padding: var(--main-padding);
  }

  .list-redirect{
    text-align: start;
    color: var(--dark-color);
    text-decoration: none;
    font-size: 20px;
  }

</style>
