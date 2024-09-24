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
    text-align: center;
    padding: 10px;
  }

  .list-table td, .list-table th{
    text-align: center;
    padding: var(--main-padding);
  }

  .list-redirect{
    color: var(--dark-color);
    text-decoration: none;
    transition: color 0.3s;
    font-size: 1.2em;
  }
</style>
