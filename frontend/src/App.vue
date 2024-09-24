<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { api } from './api'
import { useRouter } from 'vue-router'
import { useUserStore } from './stores/userStore';
import type { User} from "./types";

const router = useRouter()
const userStore = useUserStore()

async function logout(){
    console.log('foi')
    try{
        api.get('/logout')
        userStore.logout()
        router.push('/login');
    } catch (e) {
        console.error(e)
    }
}
</script>

<template>

    <div id="nav-bar-container">
            <nav id="nav-bar">

                    <ul id="portfolio-links">
                        <li>
                            <a href="/portfolio">Portifolio</a>
                        </li>

                        <li>
                            <a href="/about">Os Artistas</a>
                        </li>
                        
                        <li>
                            <a href="/manage">Gerenciar</a>
                        </li>

                    </ul>

                    <ul id="user-details">

                        <li>
                            <a class="user-profile-link">
                                <div class="user-profile-img">
                                    <img/>
                                </div>
                                <a>Meus dados</a>
                                <a @click="logout">Sair</a>
                            </a>
                        </li>

                    </ul>

            </nav>
        </div>

    <RouterView></RouterView>

</template>

<style scoped>

</style>
