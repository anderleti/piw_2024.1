<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { api } from '../api'
import { useUserStore } from '../stores/userStore';
import type {Author} from "../types";

const router = useRouter()

const userStore = useUserStore()

const authors = ref([] as Author[])
const error = ref<Error>()
const loading = ref(true)
const success = ref(false)

async function loadUsers(){
    try {
    const res = await api.get('/authors', {
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

loadUsers()

</script>

<template>

<div class="container">
<div class="autor" v-for="author in authors" :key="author.id">
        <div><div class="imagem"><img :src="author.photo" :alt="author.name"></div></div>
        <H4>{{ author.name }}</H4>
        <p>{{ author.username }}</p>
        <p>{{ author.bio }}</p>
    
    </div>
</div>

</template>

<style scoped>

.imagem {
    display: flex;
    align-items: center;
    border-radius: 100px;
    overflow: hidden;
    margin-top: 20px;
    width: 100px;
    height: 100px;
    margin-bottom: 20px;
    
}

.imagem img{
  width: 100%;
  height: 100%;
}

.container {
  gap: 10px;
  margin-left: 20px;
  margin-right: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.container  p {
  text-align: center;
  color: blanchedalmond;
  margin-bottom: 2px;
}

.container  h4 {
  text-align: center;
  color: blanchedalmond;
  margin-bottom: 2px;
}

.autor {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;

}

</style>
