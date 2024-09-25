<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {useRouter, useRoute} from 'vue-router'
import { api } from '../../api'
import { useUserStore } from '../../stores/userStore'
import type { Author } from '../../types';
import { isAxiosError } from 'axios';
import { isApplicationError } from '../../composables/useApplicationError'
import type { ApplicationError } from '../../types';

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const error = ref<ApplicationError>()
const loading = ref(true)
const success = ref({
    status: false,
    message: ''
})

const author = ref({} as Author);


const id = ref<Number>(-1)

function getBase64(file: File, callback: (base64String: string) => void){
    const reader = new FileReader();
    reader.onloadend = () => {
        if (reader.result) {
            callback(reader.result as string);
        } else {    
            console.error('Failed to convert file to Base64.');
        }
    };
    reader.onerror = () => {
        console.error('Error reading file.');
    };
    reader.readAsDataURL(file);
}

function updatePhoto(input: any){
    if (input.files){
        getBase64(input.files[0], (base64String: string) => {
            author.value.photo = base64String; 
        });
    }
}

async function addUser(){
    try{
        loading.value = true
        const res = await api.post('/authors/', {
            username: author.value.username,
            name: author.value.name,
            bio: author.value.bio,
            photo: author.value.photo
        })
        author.value = res.data.data
        success.value.status = true;
        success.value.message = "Autor criado com sucesso";
    } catch (e) {
        if (isAxiosError(e) && isApplicationError(e)) {
            error.value = e.response?.data
        }
    } finally {
        loading.value = false
    }
};

async function updateUser(){
    try{
        loading.value = true
        const res = await api.put(`/authors/${id.value}`, {
            username: author.value.username,
            name: author.value.name,
            bio: author.value.bio,
            photo: author.value.photo
        }, {
            headers: {
                Authorization: `Bearer ${userStore.jwt}`
            }
        })
        author.value = res.data.data
        success.value.status = true
        success.value.message = "Autor atualizado com sucesso"
    } catch (e) {
        if (isAxiosError(e) && isApplicationError(e)) {
            error.value = e.response?.data
        }
    } finally {
        loading.value = false
    }
}

async function loadAuthor(userId: Number){
    try{
        loading.value = true
        const res = await api.get(`/authors/${userId}`, {
            headers: {
                Authorization: `Bearer ${userStore.jwt}`
            }
        })
        author.value = res.data.data
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
    console.log(id.value)
    if(id.value && id.value != -1){
        await loadAuthor(id.value);
    } else {

    }
    
})

</script>

<template>
    <div id="form-page-container">
    
        <div id="login-content">
            <div id="form container">
                <form id="login-form" @submit.prevent="id? updateUser() : addUser()">
                    <div v-if="success.status" class="success">
                        {{ success.message }}
                    </div>
                    <div v-if="!id">
                        <h2>Adicionar artista</h2>
                    </div>
                    <div v-else>
                        <h2>Artista {{ author.id }} - dados</h2>
                    </div>

                    <label for="username">@ do artista:</label><br/>
                    <input type="text" id="username" name="name" v-model="author.username" required><br/>
                    <label for="name">Nome do artista:</label><br/>
                    <input type="text" id="name" name="name" v-model="author.name" required><br/>
                    
                    <label for="bio">Bio:</label><br/>
                    <input type="text" id="bio" name="bio" v-model="author.bio" required><br/>

                    <label for="photo">Foto:</label><br/>
                    <div class="artist-picture">
                        <input type="file" id="photo" name="photo" accept="image/*" @change="updatePhoto($event.target)">
                        <img v-if="author.photo" :src="author.photo" alt="artist-photo" width="100%" />
                    </div>
          

                    <div v-if="error">
                        {{ error.message }}
                        <button @click="error=undefined" type="button" aria-label="Fechar"></button>
                    </div>

                    <input v-if="!id" type="submit" value="Adicionar">
                    <input v-else type="submit" value="Salvar edições">
                </form>
            </div>

        </div>

    </div>
</template>

<style scoped>

#form-page-container {
    width: 100%;
    height: 100%;
}

#login-content {
    width: 100%;
    height: calc(100vh - 80px);
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

#login-form {
    width: 25vw;
    box-sizing: border-box;
    background-color: var(--light-color);
    padding: 2em;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
}

#login-form h2 {
    margin-bottom: 10px;
    font-weight: bold;
}

#login-form p {
    font-size: 0.9em;
    color: #1E1E1E;
    margin-bottom: 10px;
    margin-top: 10px;
}

#login-form span{
    font-size: 0.9em;
    color: #1E1E1E;
    margin-bottom: 1em;
}

#login-form span a{
    font-weight: 700;
}



#login-form label{
    font-weight: 600;
    font-size: 1.1em;
}

#login-form input[type="text"],input[type="email"], #login-form input[type="password"] {
    box-sizing: border-box;
    padding: 10px;
    margin-bottom: 7px;
    margin-top: 5px;
    background-color: #FFFAF0;
    border: 2px solid var(--dark-color);
    border-radius: 10px;
    font-size: 1em;
}


#login-form input[type="submit"] {
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