<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {useRouter, useRoute} from 'vue-router'
import { api } from '../../api'
import { useUserStore } from '../../stores/userStore'
import { isAxiosError } from 'axios';
import { isApplicationError } from '../../composables/useApplicationError'
import type { Author, Artwork, ApplicationError } from '../../types';

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const id = ref<Number>(-1)

const artwork = ref({} as Artwork);
const authors = ref([] as Author[])
const selectedAuthors = ref([] as Number[])

const success = ref({
    status: false,
    message: ''
})
const error = ref<ApplicationError>()
const loading = ref(false)

function addAuthor(authorId: Number) {
    selectedAuthors.value.push(authorId)
}

async function addArtwork(){
    try{
        loading.value = true
        const res = await api.post('/artworks/', {
            title: artwork.value.title,
            desc: artwork.value.desc,
            tag: artwork.value.tag,
            authorId: selectedAuthors.value,
        })
        artwork.value = res.data.data
        success.value = {
            status: true,
            message: 'Trabalho adicionado com sucesso'
        }
    } catch (e) {
        if (isAxiosError(e) && isApplicationError(e)) {
            error.value = e.response?.data
        }
    } finally {
        loading.value = false
    }
};

async function updateArtwork(){
    try{
        loading.value = true
        const res = await api.put(`/artworks/${id}`, {
            title: artwork.value.title,
            desc: artwork.value.desc,
            tag: artwork.value.tag,
            authorId: artwork.value.author ,
        })
        artwork.value = res.data.data
        success.value = {
            status: true,
            message: 'Trabalho atualizado com sucesso'
        }
    } catch (e) {
        if (isAxiosError(e) && isApplicationError(e)) {
            error.value = e.response?.data
        }
    } finally {
        loading.value = false
    }
}

async function loadArtwork(userId: Number){
    try{
        loading.value = true
        const res = await api.get(`/artworks/${userId}`, {
            headers: {
                Authorization: `Bearer ${userStore.jwt}`
            }
        })
        artwork.value = res.data.data
    } catch (e) {
        if (isAxiosError(e) && isApplicationError(e)) {
            error.value = e.response?.data
        }
    } finally {
        loading.value = false
    }
}

async function loadAuthors(){
    try{
        loading.value = true
        const res = await api.get(`/authors`, {
            headers: {
                Authorization: `Bearer ${userStore.jwt}`
            }
        })
        authors.value = res.data.data
    } catch (e) {
        if (isAxiosError(e) && isApplicationError(e)) {
            error.value = e.response?.data
        }
    } finally {
        loading.value = false
    }
}

onMounted(async() => {
    id.value = Number(route.params.id);
    if(id.value && id.value != -1){
        await loadArtwork(id.value);
    }
    await loadAuthors();
})
</script>

<template>
    <div v-if="loading" class="loading">Carregando...</div>
    <form id="artwork-page-container" @submit.prevent="id ? updateArtwork() : addArtwork()">
        <section id="artwork-page-assets">
            <section class="artork-assets-section">
                <div class="artwork-assets-single-media">
                    <img class="assets-item" src="https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg"/>
                </div>
            </section>
        </section>
        <section id="artwork-page-infos">

            <div class="artwork-title">
                <label for="title">Título</label>
                <input type="text" name="title" id="title" v-model="artwork.title">
            </div>

            <div class="artwork-desc">
                <label for="desc">Descrição</label>
                <textarea name="desc" id="desc" v-model="artwork.desc"></textarea>
            </div>

            <div class="artwork-tag">
                <label for="tag">Tag</label>
                <input type="text" name="tag" id="tag" v-model="artwork.tag">
            </div>

            <fieldset class="artwork-authors">
                <legend>Autores</legend>
                <div v-for="author in authors" class="artwork-author-single">
                    <input @click="addAuthor(author.id)" type="checkbox" id="author1">
                    <label for="author1">{{ author.name }}</label>
                </div>
            </fieldset>

            <input v-if="!id" type="submit" id="submit" name="submit" value="Cadastrar trabalho">
            <input v-else type="submit" id="submit" name="submit" value="Atualizar trabalho">
            
            <div v-if="success.status" class="success">
                {{ success.message }}
                <button @click="success.status=false" type="button" class="btn-close" aria-label="Close"></button>
            </div>
            <div v-if="error" class="error">
                {{ error.message }}
                <button @click="error=undefined" type="button" aria-label="Fechar"></button>
            </div>
        </section>
    </form>



</template>

<style scoped>
#artwork-page-container{
    height: 100%;
    box-sizing: border-box;
    padding: 0 var(--main-padding);
    display: flex;
    flex-direction: row;
}

#artwork-page-assets{
    color: var(--secondary-text-color);
    box-sizing: border-box;
    width: 70%;
    margin-right: calc(var(--main-padding)*2);
}

.artork-assets-section{
    margin-bottom: 1rem;
}

.artork-assets-section > div{
    column-gap: 1rem;
    row-gap: 1rem;
}

#artwork-page-assets > section > div > img{
    display: block;
    box-sizing: border-box;
    width: 100%;
    border-radius: var(--card-border-radius);
    border: rgba(0,0,0,0.4) 3px solid;
    transition: 0.5s ease-in-out;
}

#artwork-page-assets > section > div > img:hover{
    border: var(--light-color) 3px solid;
}

.artwork-assets-single-media {
    width: 100%;
}

/* ARTWORK INFOS */

#artwork-page-infos{
    box-sizing: border-box;
    max-height: 93vh;
    width: calc(30% - calc(var(--main-padding)*1.5));
    position: fixed;
    top: 60px;
    right: var(--main-padding);
    padding: 2rem;
    padding-top: 1.5rem;
    margin-bottom: auto;;
    overflow-y: scroll;
    background-color: var(--light-color);
    border-radius: var(--card-border-radius);
}

form div {
    display: flex;
    flex-direction: column;
}

form input, form textarea{
    box-sizing: border-box;
    color: var(--secondary-text-color);
    margin-bottom: 0.5em;
    padding: 12px;
    background-color: #FFFAF0;
    border: 2px solid var(--dark-color);
    border-radius: 10px;
}

form #title{
    font-size: 2rem;
}

form fieldset{
    display: flex;
    flex-direction: column;
    border: none;
    padding: 0;
}

form fieldset div{
    margin-left: 20px;
    display: flex;
    flex-direction: row;
    margin-bottom: 0.5em;
}

form fieldset div input{
    color: var(--secondary-text-color);
    margin-bottom: 0.1em;
    margin-right: 1em;
}

input[type="submit"]{
    box-sizing: border-box;
    background-color: var(--dark-color);
    color: white;
    font-size: 1rem;
    font-weight: 600;
    padding: 10px 20px;
    margin-top: 20px;
    border: none;
    border-radius: 10px;
    margin-left: auto;
    cursor: pointer;
}

</style>
