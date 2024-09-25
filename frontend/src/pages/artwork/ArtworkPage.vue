<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { api } from '../../api'
import { useUserStore } from '../../stores/userStore';
import type { Artwork, Author, Comment } from "../../types";

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const artwork = ref({} as Artwork)
const comments = ref([] as Comment[])
const commentText = ref("")
const isliked = ref(false)
const error = ref<Error>()
const loading = ref(true)
const success = ref(false)

async function loadArtwork(){
    try {
    const res = await api.get(`/artworks/${route.params.id}`);
    artwork.value = res.data.data;
  } catch (e) {
    error.value = e as Error
  } finally {
    loading.value = false
  }
};

async function loadComments(){
   console.log(route.params.id) 
   try {
        const res = await api.get(`/comments/${route.params.id}`);
        comments.value = res.data.data;
    } catch (e) {
        error.value = e as Error
    }
}

async function loadLike(){
   try {
        const res = await api.get(`/likes/${route.params.id}&&${userStore.user.id}`, {
            headers: {
                Authorization: `Bearer ${userStore.jwt}`
            }
        });
        if(res.data.data){
            isliked.value = true;
        }
    } catch (e) {
        error.value = e as Error
    }
}
const carrouselToggle = ref(false);

function toggleCarrousel() {
  console.log(carrouselToggle)
  carrouselToggle.value =!carrouselToggle.value;
  const assets = document.querySelectorAll('.assets-item');
  // em construção...
}

async function sendComment(){
    try {
        await api.post(`/comments`, { 
            comment: commentText.value,
            artwork: route.params.id,
            user: userStore.user.id,
        }, {
            headers: {
                Authorization: `Bearer ${userStore.jwt}`
            }
        })
        commentText.value = ""
        success.value = true
        
    } catch (e) {
        error.value = e as Error
    } 
    finally {
        await loadComments()

    }
}
async function sendLike(){
    try {
        await api.post(`/likes`, { 
            artwork: route.params.id,
            user: userStore.user.id,
        }, {
            headers: {
                Authorization: `Bearer ${userStore.jwt}`
            }
        })
        isliked.value =!isliked.value
        artwork.value.likes = artwork.value.likes + 1
    } catch (e) {
        error.value = e as Error
    } 
    finally {
        await loadComments()

    }
}

async function deleteLike(){
    try {
        await api.delete(`/likes/${route.params.id}&&${userStore.user.id}`,{
            headers: {
                Authorization: `Bearer ${userStore.jwt}`
            }
        })
        isliked.value =!isliked.value
    } catch (e) {
        error.value = e as Error
    } 
    finally {
        await loadComments()

    }
}


onMounted(async() => {
    await loadArtwork()
    await loadComments()
    await loadLike()
})
</script>

<template>
  <div id="artwork-page-container">
        <section id="artwork-page-assets">

            <section class="artork-assets-section">
                <div class="artwork-assets-single-media">
                    <img @click="toggleCarrousel" class="assets-item" src="https://cdnb.artstation.com/p/assets/images/images/029/458/723/large/andissu-scene1-edit.jpg?1597626341"/>
                </div>
            </section>
            
        </section>
        <section id="artwork-page-infos">

            <h1 class="artwork-title">
                {{ artwork.title }}
            </h1>

            <div class="artwork-desc">
                <p>
                    {{ artwork.desc }}
                </p>
            </div>

            <div class="artwork-details">
                <div class="artwork-tags">
                    <a href="">{{ artwork.tag }}</a>
                </div>
                <div class="artwork-date">{{ artwork.date }}</div>
                
            </div>
       <div class="artwork-authors">
                <h3>Autores</h3>
                <div class="autores-cards-grid">
                    <div class="author">
                        <a href=""><img :src="artwork.author.photo"/> <span>{{ artwork.author.name }}</span></a>
                    </div>
                </div>

            </div>

            <div class="artwork-actions">
                <button class="artwork-like-btn" @click="isliked ? deleteLike() : sendLike()">
                    <svg class="artwork-svg-icon" :class="isliked ? 'liked': ''" version="1.1" viewBox="0 0 4.2333 4.2333" xmlns="http://www.w3.org/2000/svg">
                        <g transform="matrix(.075456 0 0 .075456 -15.223 -4.6379)" stroke-linecap="round" stroke-linejoin="round" stroke-width=".52917">
                            <path class="safespace-svg-part" d="m201.75 61.464h56.103v56.103h-56.103z"/>
                            <path class="dark-svg-part" d="m218.14 70.815c-6.471 2.7e-5 -11.717 5.2461-11.717 11.717 6e-3 2.3849 0.74062 4.7112 2.1043 6.6678h-0.0222l13.524 19.544 0.0651 5.2e-4c1.7229 2.5733 4.6082 4.1266 7.705 4.1481 3.0528-0.0195 5.9039-1.5281 7.6373-4.0411l0.0589 5.2e-4 13.688-19.614h-0.0269c1.382-1.9636 2.1274-4.3044 2.1353-6.7055-3e-5 -6.4711-5.246-11.717-11.717-11.717-6.4586 0.0017-11.698 5.2296-11.714 11.688-1e-3 0.0096-2e-3 0.01929-3e-3 0.02894-3.3e-4 -0.0096-6.8e-4 -0.01929-1e-3 -0.02894-0.016-6.4593-5.2568-11.688-11.716-11.688z"/>
                        </g>
                    </svg>
                    {{ artwork.likes }}
                </button>
                <button class="artwork-comment-btn">
                    <svg class="artwork-svg-icon" version="1.1" viewBox="0 0 4.2333 4.2333" xmlns="http://www.w3.org/2000/svg">
                        <g transform="matrix(.075457 0 0 .075457 -15.223 -4.6379)" stroke-linecap="round" stroke-linejoin="round">
                            <path class="safespace-svg-part" d="m201.75 61.464h56.103v56.103h-56.103z" fill="none" stroke-width=".52917"/>
                            <path class="dark-svg-part" d="m215.77 70.817c-2.5885 0-4.6726 2.0841-4.6726 4.6726v27.881l-4.4928 7.5582 1e-3 2e-3a1.2976 1.2983 0 0 0-0.18345 0.66197 1.2976 1.2983 0 0 0 1.2976 1.2981h40.78c2.5885 0 4.6721-2.0841 4.6721-4.6726v-32.729c0-2.5885-2.0836-4.6726-4.6721-4.6726z" stroke-width=".62748"/>
                            <path class="light-svg-part" d="m218.11 80.165c-1.2951 0-2.3378 1.0428-2.3378 2.3378s1.0428 2.3373 2.3378 2.3373h28.052c1.2951 0 2.3373-1.0423 2.3373-2.3373s-1.0423-2.3378-2.3373-2.3378zm27.863 9.3503c-1.191 0-2.1497 0.95923-2.1497 2.1503v0.37414c0 1.191 0.95871 2.1497 2.1497 2.1497h0.37569c1.191 0 2.1497-0.95871 2.1497-2.1497v-0.37414c0-1.191-0.95871-2.1503-2.1497-2.1503zm-27.862 0.0015c-1.2951 0-2.3373 1.0428-2.3373 2.3378s1.0422 2.3373 2.3373 2.3373h18.7c1.2951 0 2.3378-1.0423 2.3378-2.3373s-1.0428-2.3378-2.3378-2.3378z" fill="#e9afaf" stroke-width=".57157"/>
                        </g>
                    </svg>
                    {{ artwork.comments }}
                </button>
            </div>

            <div class="artwork-comments">
                <form v-if="userStore.isAuthenticated" @submit.prevent="sendComment()">
                    <textarea placeholder="Deixe um comentário..." v-model="commentText"></textarea>
                    <button type="submit">Comentar</button>
                </form>
                <span v-else><a href="/register">Crie uma conta</a> ou faça o <a href="/login" >Login</a> para comentar.</span>
                <div>
                    <div v-for="comment in comments" class="comment">
                        <div class="comment-user-info">
                            <span>{{ comment.user.name }}</span>
                            <span>{{ comment.date }}</span>
                        </div>
                        <div class="comment-text">
                            <p>{{ comment.text }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>

    <div v-if="carrouselToggle" id="artwork-image-click-popup" @click="toggleCarrousel">
        <div id="popup-image-details">
            <h3>Título</h3>
            <button @click="toggleCarrousel" >X</button>
        </div>
        <div id="popup-carrousel--buttons">
            <div id="prev-image-button">
                <button>a</button>
            </div>
            <div id="next-image-button">
                <button>b</button>
            </div>
        </div>
        <div id="popup-carrousel-selected-image">
            <img src="https://cdnb.artstation.com/p/assets/images/images/075/726/297/large/anderson-silva-4.jpg?1715270028"/>
        </div>
    </div>

    
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

.artwork-assets-l-grid-media {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
}
.artwork-assets-m-grid-media {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
}
.artwork-assets-s-grid-media {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
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

.artwork-title{
    font-size: 2rem;
    color: var(--secondary-text-color);
    margin-bottom: 0.5em;
}

.artwork-desc{
    font-size: 1rem;
    color: var(--secondary-text-color)
}

.artwork-desc p{
    margin-bottom: 1em;
}

.artwork-details{
    display: flex;
    color: var(--main-text-color);
    justify-content: space-between;
}

.artwork-details div {
    color: var(--secondary-text-color);
    font-size: 0.85rem;
}

.artwork-details .artwork-tags a {
    color: var(--secondary-text-color);
    font-size: 0.85rem;
    background-color: lightgray;
    padding: 0.7em 0.5em 0.5em 0.5em;
    border-radius: var(--card-border-radius);
}

.artwork-details, .artwork-authors{
    margin-bottom: calc(var(--main-padding)*3);
}

.artwork-authors{
    display: flex;
    flex-direction: column;
    color: var(--secondary-text-color);
}

.artwork-authors h3{
    font-size: 1.2rem;
    margin-bottom: 0.5em;
}

.autores-cards-grid{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    column-gap: 1rem;

}

.author a {
    color: var(--secondary-text-color);
    font-weight: 400;
    font-size: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
}

.author a img{
    border-radius: 100%;
    width: 3em;
    aspect-ratio: 1/1;
}

.author a span{
    margin-top: 0.1em;
    margin-left: 0.5em;
}  

.artwork-actions button{
    background-color: transparent;
    border: none
}

.artwork-actions {
    background-color: transparent;
    border: none
}

/*  */
.isActive {
    display: block !important;
}

#artwork-image-click-popup{
    position: fixed;
    box-sizing: border-box;
    top: 0;
    left: 0;
    z-index: 11;
    overflow: hidden;
    background-color: rgba(0,0,0,0.5);
    height: 100vh;
    width: 100vw;
}

.popup-image-details{
    width: 100%;
    padding: 1rem;
    box-sizing: border-box;
    color: var(--light-color);
    font-size: 1rem;
    position: absolute;
    z-index: 13;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.popup-carrousel--buttons{
    background-color: aqua;
    opacity: 0.5;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    position: absolute;
    z-index: 12;
    display: flex;
    justify-content: space-between;
}

.popup-carrousel--buttons > div {
    width: 5%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: pink;
    opacity: 1;
}

.popup-carrousel-selected-image{
    box-sizing: border-box;
}

.popup-carrousel-selected-image img{
    height: 100%;
};

/*  */

.card-svg-icon {
    height: 1.2rem;
    }

.card-svg-icon .safespace-svg-part{
    fill: transparent;
}

.card-svg-icon .dark-svg-part{
    fill: var(--light-color);
}

.card-svg-icon .light-svg-part{
    fill: var(--dark-color);
}

.artwork-svg-icon {
    height: 32px;
}

.artwork-svg-icon .safespace-svg-part{
    fill: transparent;
}

.artwork-svg-icon .dark-svg-part{
    fill: transparent;
    stroke: var(--dark-color);
    stroke-opacity: 60%;
    stroke-width: 4px;
    transition: 0.3s ease-in-out;
}
.artwork-svg-icon .light-svg-part{
    fill: var(--dark-color);
    fill-opacity: 60%;
    transition: 0.3s ease-in-out;
}

.artwork-actions button:hover .artwork-svg-icon .dark-svg-part, .artwork-actions button:hover .artwork-svg-icon .light-svg-part{
    stroke-opacity: 100%;
    fill-opacity: 100%
}

.liked .dark-svg-part{
    fill: var(--liked-color) !important;
    stroke-opacity: 100% !important;
    fill-opacity: 100% !important
}

.saved .dark-svg-part{
    fill: var(--dark-color) !important;
    stroke-opacity: 100% !important;
    fill-opacity: 100% !important
}

.commented .dark-svg-part{
    fill: var(--dark-color) !important;
    stroke-opacity: 100% !important;
    fill-opacity: 100% !important
}

.commented .light-svg-part{
    fill: var(--light-color);
    stroke-opacity: 100% !important;
    fill-opacity: 100% !important
}

.comment {
    margin-bottom:20px;
    background-color: #c4b79f;
    box-sizing: border-box;
    width: 100%;
    padding: 10px;
    border-radius: 10px;
}

.comment-user-info {
    display: flex;
    justify-content: space-between;
}
.comment-text {
    padding: 10px;
    background-color: #e6dcc9;
    border-radius: 5px;
}

.artwork-comments form{
    border-radius: 10px;
    box-sizing: border-box;
    width: 100%;
    border: 2px solid var(--dark-color);
    overflow: hidden;
    display: flex;
    flex-direction: row-reverse;
    margin-bottom: 20px !important;
}

.artwork-comments form textarea{
    box-sizing: border-box;
    width: 100%;
    max-width: 100%;
    border: none;
    background-color: none;
    padding: 10px
}

.artwork-comments button{
    position: absolute;
    z-index:1;
    align-self: flex-end;
    justify-self: flex-end;
    background-color: var(--dark-color);
    border: none;
    border-radius: 5px 0 5px 0;
    color: var(--light-color);
    padding: 5px;
}
</style>
