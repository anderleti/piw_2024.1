<script setup lang="ts">
<<<<<<< HEAD

=======
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
>>>>>>> d473681 (Entrega 05: Página de login e cadastro OK)
</script>

<template>

    <div id="nav-bar-container">
            <nav id="nav-bar">

                    <ul id="portfolio-links">
                        <li>
                            <a href="/artworks">Portifolio</a>
                        </li>

                        <li>
                            <a href="/about">Os Artistas</a>
                        </li>

                    </ul>

                    <ul id="user-details">

                        <li>
                            <a class="user-profile-link">
                                <div class="user-profile-img">
                                    <img/>
                                </div>
<<<<<<< HEAD
=======
                                <a>Meus dados</a>
                                <a @click="logout">Sair</a>
>>>>>>> d473681 (Entrega 05: Página de login e cadastro OK)
                            </a>
                        </li>

                    </ul>

            </nav>
        </div>

    <RouterView></RouterView>

</template>

<style scoped>

</style>
