<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {useRouter, useRoute} from 'vue-router'
import { api } from '../../api'
import { useUserStore } from '../../stores/userStore'
import type { User, Role } from '../../types';


const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
console.log(userStore.jwt)

const user = ref({} as User);
const roles = ref([] as Role[])

const success = ref({
    status: false,
    message: ''
})
const error = ref<Error>()
const loading = ref(true)

const id = ref<Number>(-1)

async function addUser(){

    user.value.role = {
        id: 1,
        name: "User",
    }

    try{
        loading.value = true
        const res = await api.post('/users/', {
            username: user.value.username,
            name: user.value.name,
            email: user.value.email,
            password: user.value.password,
            role: user.value.role
        })
        user.value = res.data.data
        router.push('/login')
    } catch (e) {
        error.value = e as Error
    } finally {
        loading.value = false
    }
};

async function updateUser(){
    try{
        loading.value = true
        const res = await api.put(`/users/${id.value}`, {
            username: user.value.username,
            name: user.value.name,
            email: user.value.email,
            password: user.value.password,
            role: "User"
        }, {
            headers: {
                Authorization: `Bearer ${userStore.jwt}`
            }
        })
        user.value = res.data.data
        success.value.status = true
        success.value.message = "Usuário atualizado com sucesos"
    } catch (e) {
        error.value = e as Error
    } finally {
        loading.value = false
    }
}

async function loadUser(userId: Number){
    try{
        loading.value = true
        const res = await api.get(`/users/${userId}`, {
            headers: {
        Authorization: `Bearer ${userStore.jwt}`
      }
        })
        user.value = res.data.data
        user.value.password = ""
    } catch (e) {
        error.value = e as Error
    } finally {
        loading.value = false
    }

}

async function loadRoles(){
    try{
        loading.value = true
        const res = await api.get('/roles/', {
            headers: {
            Authorization: `Bearer ${userStore.jwt}`
            }
        })
        roles.value = res.data.data
    } catch (e) {
    error.value = e as Error
    } finally {
        loading.value = false
    }
}

onMounted(async() => {
    id.value = Number(route.params.id);
    console.log(id.value)
    if(id.value && id.value != -1){
        await loadUser(id.value);
        await loadRoles();
    } else {

    }
    
})

</script>

<template>
    <div id="form-page-container">
    
        <div id="login-content">
            <div id="form container">
                <form id="login-form" @submit.prevent="id? updateUser() : addUser()">
                    <div v-if="!id">
                        <h2>Criar uma conta</h2>
                        <span >Já possui uma conta? <a v-bind:href="`/login` ">Entre aqui</a></span><br/>
                    </div>
                    <div v-else>
                        <h2>Usuário {{ user.id }} - dados</h2>
                    </div>

                    <label for="username">Nome de usuário:</label><br/>
                    <input type="text" id="username" name="name" v-model="user.username" required><br/>
                    <label for="name">Seu nome completo:</label><br/>
                    <input type="text" id="name" name="name" v-model="user.name" required><br/>
                    <label for="email">Email:</label><br/>
                    <input type="email" id="email" name="email" v-model="user.email" required><br/>
                    <label for="password">Senha:</label><br/>
                    <input type="password" id="password" name="password" v-model="user.password" required><br>
                    <!-- <a>Esqueci minha senha</a><br/> -->
                     <label v-if="userStore.role == 'Admin'" for="role">Função:</label>
                    <select v-if="userStore.role == 'Admin'" id="role" name="role" v-model="user.role.name">
                        <option v-for="role in roles" :key="role.id">{{ role.name }}</option>
                    </select>

                    <div v-if="error">
                        {{ error }}
                    </div>

                    <input v-if="!id" type="submit" value="Entrar">
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
    font-weight: bold;
}

#login-form p {
    font-size: 0.9em;
    color: #1E1E1E;

    margin-bottom: 1em;
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
    box-sizing: border-box;
    font-weight: 600;
    font-size: 1.1em;
}

#login-form input[type="text"],input[type="email"], #login-form input[type="password"] {
    box-sizing: border-box;
    padding: 12px;
    margin-bottom: 20px;
    margin-top: 1em;
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