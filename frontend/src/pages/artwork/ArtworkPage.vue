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
        const res = await api.get(`/likes/${route.params.id}&&${userStore.user.id}`);
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
        })
        isliked.value =!isliked.value
    } catch (e) {
        error.value = e as Error
    } 
    finally {
        await loadComments()

    }
}

async function deleteLike(){
    try {
        await api.delete(`/likes`, { 
            artwork: route.params.id,
            user: userStore.user.id,
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
       <!-- <div class="artwork-authors">
                <h3>Autores</h3>
                <div class="autores-cards-grid">
                    <div class="author">
                        <a href=""><img :src="artwork.author.photo"/> <span>{{ artwork.author.name }}</span></a>
                    </div>
                </div>

            </div> -->

            <div class="artwork-actions">
                <button @click="isliked ? deleteLike : sendLike">{{ isliked ? "tirar like" : "dar like"}}</button>
                <button class="artwork-like-btn">
                    <svg class="artwork-svg-icon" version="1.1" viewBox="0 0 4.2333 4.2333" xmlns="http://www.w3.org/2000/svg">
                        <g transform="matrix(.075456 0 0 .075456 -15.223 -4.6379)" stroke-linecap="round" stroke-linejoin="round" stroke-width=".52917">
                            <path class="safespace-svg-part" d="m201.75 61.464h56.103v56.103h-56.103z" fill="none"/>
                            <path class="dark-svg-part" d="m218.14 70.815c-6.471 2.7e-5 -11.717 5.2461-11.717 11.717 6e-3 2.3849 0.74062 4.7112 2.1043 6.6678h-0.0222l13.524 19.544 0.0651 5.2e-4c1.7229 2.5733 4.6082 4.1266 7.705 4.1481 3.0528-0.0195 5.9039-1.5281 7.6373-4.0411l0.0589 5.2e-4 13.688-19.614h-0.0269c1.382-1.9636 2.1274-4.3044 2.1353-6.7055-3e-5 -6.4711-5.246-11.717-11.717-11.717-6.4586 0.0017-11.698 5.2296-11.714 11.688-1e-3 0.0096-2e-3 0.01929-3e-3 0.02894-3.3e-4 -0.0096-6.8e-4 -0.01929-1e-3 -0.02894-0.016-6.4593-5.2568-11.688-11.716-11.688z"/>
                        </g>
                    </svg>
                </button>
                <button class="artwork-save-btn">
                    <svg class="artwork-svg-icon" version="1.1" viewBox="0 0 4.2333 4.2333" xmlns="http://www.w3.org/2000/svg">
                        <g transform="matrix(.075457 0 0 .075457 -15.223 -4.6379)" stroke-linecap="round" stroke-linejoin="round" stroke-width=".52917">
                        <path class="safespace-svg-part" d="m201.75 61.464 56.103 2.63e-4 8e-5 56.103h-56.103z" fill="none"/>
                        <path class="dark-svg-part" d="m229.8 70.815v5.17e-4h-14.023c-2.59 0-4.6752 2.0847-4.6752 4.6746v32.726c0 0.0142 2e-3 0.0278 2e-3 0.0419 1e-3 0.1321 8e-3 0.26296 0.0202 0.39223 3e-3 0.0317 5e-3 0.0631 9e-3 0.0946 0.0131 0.11629 0.0312 0.23115 0.0527 0.34469 0.01 0.0533 0.0213 0.10594 0.0331 0.15864 0.0194 0.0862 0.0415 0.1715 0.0656 0.2558 0.021 0.0741 0.0436 0.14713 0.0682 0.21963 0.022 0.0644 0.0456 0.1281 0.0703 0.1912 0.0342 0.0881 0.0713 0.17453 0.11059 0.25993 0.0199 0.0431 0.0403 0.0859 0.0615 0.12816 0.0522 0.10473 0.10783 0.20693 0.16743 0.30696 0.0114 0.0191 0.0224 0.0379 0.0341 0.0568 0.0717 0.11646 0.14815 0.22913 0.22945 0.33848 2e-3 2e-3 3e-3 5e-3 5e-3 7e-3 2e-3 3e-3 3e-3 5e-3 5e-3 7e-3 0.0882 0.11777 0.18181 0.23079 0.28061 0.33952 0.10071 0.11088 0.20641 0.21658 0.31729 0.31729 0.10955 0.0995 0.22338 0.19387 0.3421 0.28267 2e-3 1e-3 3e-3 2e-3 4e-3 3e-3 2e-3 1e-3 3e-3 2e-3 4e-3 3e-3 0.11063 0.0824 0.22467 0.15995 0.34261 0.23255 0.0188 0.0116 0.0378 0.0232 0.0568 0.0346 0.10379 0.0618 0.21 0.11932 0.31884 0.17312 0.0333 0.0165 0.0666 0.0324 0.10025 0.0481 0.0954 0.0443 0.19214 0.086 0.29094 0.12403 0.0519 0.0201 0.1043 0.0392 0.1571 0.0574 0.0848 0.0291 0.17045 0.0558 0.25735 0.0801 0.0715 0.0201 0.14372 0.0385 0.21652 0.0553 0.0654 0.0149 0.1309 0.0291 0.1974 0.0413 0.10093 0.0187 0.20284 0.0344 0.30593 0.0465 0.045 5e-3 0.09 9e-3 0.13539 0.0134 0.11596 0.0101 0.23317 0.0161 0.3514 0.0181 0.021 0 0.0414 3e-3 0.0625 3e-3l5e-3 -2e-3c1.455-7e-3 2.8545-0.7073 3.7331-1.8671l8.3318-11.098 3e-3 -0.0016c0.43131-0.65867 1.1652-1.0559 1.9523-1.0568l1e-3 -5.16e-4c0.78658 0.0014 1.5198 0.39854 1.9508 1.0568l3e-3 0.0015 8.3318 11.098 0.031 0.0155c0.87858 1.1598 2.2472 1.8442 3.7021 1.8516l5e-3 2e-3c0.0211 0 0.0415-3e-3 0.0625-3e-3 0.11823-2e-3 0.23544-8e-3 0.3514-0.0181 0.0454-4e-3 0.0904-8e-3 0.13539-0.0134 0.10309-0.0121 0.20499-0.0278 0.30592-0.0465 0.0665-0.0122 0.13197-0.0264 0.19741-0.0413 0.0728-0.0168 0.14503-0.0352 0.21652-0.0553 0.0869-0.0243 0.17256-0.051 0.25735-0.0801 0.0528-0.0182 0.10518-0.0373 0.1571-0.0574 0.0988-0.038 0.1955-0.0797 0.29093-0.12402 0.0337-0.0157 0.067-0.0316 0.10026-0.0481 0.10884-0.0538 0.21505-0.11129 0.31884-0.17312 0.019-0.0114 0.038-0.023 0.0568-0.0346 0.11794-0.0726 0.23199-0.1501 0.34262-0.23254 1e-3 -8.9e-4 2e-3 -2e-3 4e-3 -3e-3 1e-3 -8.9e-4 2e-3 -2e-3 4e-3 -3e-3 0.11872-0.0888 0.23255-0.18317 0.3421-0.28267 0.11088-0.10071 0.21658-0.20641 0.31729-0.31729 0.0988-0.10873 0.19236-0.22174 0.2806-0.33951 2e-3 -2e-3 3e-3 -4e-3 5e-3 -7e-3 2e-3 -2e-3 3e-3 -5e-3 5e-3 -7e-3 0.0813-0.10935 0.15779-0.22202 0.22944-0.33848 0.0117-0.0189 0.0227-0.0377 0.0341-0.0568 0.0596-0.10003 0.11528-0.20223 0.16743-0.30696 0.0212-0.0423 0.0416-0.0851 0.0615-0.12816 0.0393-0.0854 0.0764-0.1718 0.11058-0.25993 0.0247-0.0631 0.0483-0.12675 0.0703-0.1912 0.0246-0.0725 0.0472-0.14552 0.0682-0.21963 0.0241-0.0843 0.0462-0.16958 0.0656-0.25579 0.0118-0.0527 0.0231-0.10531 0.0331-0.15865 0.0215-0.11354 0.0396-0.22839 0.0527-0.34468 4e-3 -0.0315 6e-3 -0.0629 9e-3 -0.0946 0.0119-0.12927 0.019-0.26013 0.0202-0.39223 1.3e-4 -0.0141 2e-3 -0.0276 2e-3 -0.0418v-32.726c0-2.59-2.0852-4.6746-4.6752-4.6746z"/>
                        </g>
                    </svg>
                    
                </button>
                <button class="artwork-comment-btn">
                    <svg class="artwork-svg-icon" version="1.1" viewBox="0 0 4.2333 4.2333" xmlns="http://www.w3.org/2000/svg">
                        <g transform="matrix(.075457 0 0 .075457 -15.223 -4.6379)" stroke-linecap="round" stroke-linejoin="round">
                            <path class="safespace-svg-part" d="m201.75 61.464h56.103v56.103h-56.103z" fill="none" stroke-width=".52917"/>
                            <path class="dark-svg-part" d="m215.77 70.817c-2.5885 0-4.6726 2.0841-4.6726 4.6726v27.881l-4.4928 7.5582 1e-3 2e-3a1.2976 1.2983 0 0 0-0.18345 0.66197 1.2976 1.2983 0 0 0 1.2976 1.2981h40.78c2.5885 0 4.6721-2.0841 4.6721-4.6726v-32.729c0-2.5885-2.0836-4.6726-4.6721-4.6726z" stroke-width=".62748"/>
                            <path class="light-svg-part" d="m218.11 80.165c-1.2951 0-2.3378 1.0428-2.3378 2.3378s1.0428 2.3373 2.3378 2.3373h28.052c1.2951 0 2.3373-1.0423 2.3373-2.3373s-1.0423-2.3378-2.3373-2.3378zm27.863 9.3503c-1.191 0-2.1497 0.95923-2.1497 2.1503v0.37414c0 1.191 0.95871 2.1497 2.1497 2.1497h0.37569c1.191 0 2.1497-0.95871 2.1497-2.1497v-0.37414c0-1.191-0.95871-2.1503-2.1497-2.1503zm-27.862 0.0015c-1.2951 0-2.3373 1.0428-2.3373 2.3378s1.0422 2.3373 2.3373 2.3373h18.7c1.2951 0 2.3378-1.0423 2.3378-2.3373s-1.0428-2.3378-2.3378-2.3378z" fill="#e9afaf" stroke-width=".57157"/>
                        </g>
                    </svg>
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
</style>
