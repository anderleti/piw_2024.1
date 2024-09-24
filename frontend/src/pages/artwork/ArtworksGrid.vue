<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { api } from '../../api'
import { useUserStore } from '../../stores/userStore';
import type {Artwork} from "../../types";

const router = useRouter()

const userStore = useUserStore()

const artworks = ref([] as Artwork[])
const error = ref<Error>()
const loading = ref(true)
const success = ref(false)

async function loadArtworks(){
    try {
    const res = await api.get('/artworks');
    artworks.value = res.data.data;
  } catch (e) {
    error.value = e as Error
  } finally {
    loading.value = false
  }
};

onMounted(async() => {
    await loadArtworks()
})

</script>

<template>
  <div id="artworks-container">

    <section id="artwork-search-container">
        <div class="search-bar">
            <form>
                <input type="select" placeholder="Pesquisar...">
            </form>
        </div>
    </section>

    <section id="artworks-grid">
      
        <a v-for="artwork in artworks" v-bind:href="`/portfolio/${artwork.id}`" class="artwork-item-card" onclick="redirectToArtwork(this)">
                
                <div class="card-thumb-container">
                    <img class="card-thumb-1" src="https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg" alt="image"/>
                </div>

                <div class="card-details">
                    <div class="card-tags">
                        <a href="">{{ artwork.tag }}</a>
                    </div>
                    <div class="card-desc">
                        <a class="artwork-link" href="#"><h3>{{ artwork.title }}</h3></a>
                        <p> {{ artwork.desc }} </p>
                    </div>
                    <div class="card-infos">
                        <div class="card-authors">
                            <a href="">{{ artwork.author.name }}</a>
                        </div>
                        <div class="card-status">
                            <div> 
                                <svg class="card-svg-icon" version="1.1" viewBox="0 0 4.2333 4.2333" xmlns="http://www.w3.org/2000/svg">
                                    <g transform="matrix(.075456 0 0 .075456 -15.223 -4.6379)" stroke-linecap="round" stroke-linejoin="round" stroke-width=".52917">
                                        <path class="safespace-svg-part" d="m201.75 61.464h56.103v56.103h-56.103z"/>
                                        <path class="dark-svg-part" d="m218.14 70.815c-6.471 2.7e-5 -11.717 5.2461-11.717 11.717 6e-3 2.3849 0.74062 4.7112 2.1043 6.6678h-0.0222l13.524 19.544 0.0651 5.2e-4c1.7229 2.5733 4.6082 4.1266 7.705 4.1481 3.0528-0.0195 5.9039-1.5281 7.6373-4.0411l0.0589 5.2e-4 13.688-19.614h-0.0269c1.382-1.9636 2.1274-4.3044 2.1353-6.7055-3e-5 -6.4711-5.246-11.717-11.717-11.717-6.4586 0.0017-11.698 5.2296-11.714 11.688-1e-3 0.0096-2e-3 0.01929-3e-3 0.02894-3.3e-4 -0.0096-6.8e-4 -0.01929-1e-3 -0.02894-0.016-6.4593-5.2568-11.688-11.716-11.688z"/>
                                    </g>
                                </svg>
                                <span> {{ artwork.likes }} </span>          
                            </div>

                            <div>
                                    <svg class="card-svg-icon" version="1.1" viewBox="0 0 4.2333 4.2333" xmlns="http://www.w3.org/2000/svg">
                                        <g transform="matrix(.075457 0 0 .075457 -15.223 -4.6379)" stroke-linecap="round" stroke-linejoin="round">
                                            <path class="safespace-svg-part" d="m201.75 61.464h56.103v56.103h-56.103z" stroke-width=".52917"/>
                                            <path class="dark-svg-part" d="m215.77 70.817c-2.5885 0-4.6726 2.0841-4.6726 4.6726v27.881l-4.4928 7.5582 1e-3 2e-3a1.2976 1.2983 0 0 0-0.18345 0.66197 1.2976 1.2983 0 0 0 1.2976 1.2981h40.78c2.5885 0 4.6721-2.0841 4.6721-4.6726v-32.729c0-2.5885-2.0836-4.6726-4.6721-4.6726z" stroke-width=".62748"/>
                                            <path class="light-svg-part" d="m218.11 80.165c-1.2951 0-2.3378 1.0428-2.3378 2.3378s1.0428 2.3373 2.3378 2.3373h28.052c1.2951 0 2.3373-1.0423 2.3373-2.3373s-1.0423-2.3378-2.3373-2.3378zm27.863 9.3503c-1.191 0-2.1497 0.95923-2.1497 2.1503v0.37414c0 1.191 0.95871 2.1497 2.1497 2.1497h0.37569c1.191 0 2.1497-0.95871 2.1497-2.1497v-0.37414c0-1.191-0.95871-2.1503-2.1497-2.1503zm-27.862 0.0015c-1.2951 0-2.3373 1.0428-2.3373 2.3378s1.0422 2.3373 2.3373 2.3373h18.7c1.2951 0 2.3378-1.0423 2.3378-2.3373s-1.0428-2.3378-2.3378-2.3378z" fill="#e9afaf" stroke-width=".57157"/>
                                        </g>
                                    </svg>
                                    <span> {{ artwork.comments }} </span> 
                            </div>           
                        </div>
                    </div>
                </div>
        </a>

    </section>

  </div>

</template>

<style scoped>
  #artworks-grid {
    margin-left: 25px;
    margin-top: 20px;
    padding: var(--main-padding);
    display: grid;
    box-sizing: border-box;
    grid-template-columns: repeat(6, 1fr);
    column-gap: var(--artwork-grid-gaps);
    row-gap: var(--artwork-grid-gaps);
    align-items: space-between;
}

.search-bar {
    width: 490px;
    display: block;
    margin: 0 auto;
    
}

.search-bar input{
    border-radius: 10px;
    width: 90%;
    height: 35px;
    padding: 0 20px;
    font-size: 1rem;
    border: 1px solid #D0CFCE;
    outline: none;
}

.search-bar button {
    margin-top: 10px;
    background-color: var(--main-color);
    color: white;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
    
}

#filtrar{
    background-color: var(--main-color);
    color: white;
    border-radius: 5px;
    padding: 5px 10px;

}
/* cards */
.artwork-item-card {
        box-sizing: border-box;
        position: relative;
        float: left;
        aspect-ratio: 1/1;
        border-radius: var(--card-border-radius);
        overflow: hidden;
        background-color: grey;
    }

    .card-thumb-container{
        height: 100%;
        width: 100%;
        position: relative;
    }

    .card-thumb-container img{
        height: 100%;
        position: relative;
    }

    .card-thumb-2 {
        display: none;
    }

    .artwork-item-card:hover .card-thumb-1{
        display: none;
    }

    .artwork-item-card:hover .card-thumb-2{
        display: block;
    }


    .card-details{
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        box-sizing: border-box;
        padding: var(--main-padding);
        padding: var(--main-padding);
        display: flex;
        flex-direction: column;
        opacity: 0 ;
        transition: 0.2s ease-in;
    }

    .card-tags {
        margin-bottom: calc(var(--main-padding)*2);
    }

    .card-tags a {
        color: var(--secondary-text-color);
        font-size: 0.7rem;
        background-color: lightgray;
        padding: 0.7em 0.5em 0.5em 0.5em;
        border-radius: var(--card-border-radius);
    }

    .card-desc a h3, .card-desc p {
        color: var(--main-text-color);
        border-bottom: transparent 3px solid;
    }

    .card-desc a h3{
        font-size: 1.5rem;
    }
    .card-desc p{
        font-size: 0.9rem;
    }

    .card-infos{
        margin-top: auto;
        display: flex;
        justify-content: space-between;
    }

    .card-infos a{
        font-size: 1rem;
        color: var(--main-text-color)
    }

    .card-authors {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .card-authors a {
        margin-top: 8px;
    }

    .card-status {
        display: flex;
        flex-direction: row;
    }

    .card-status div:first-of-type{
        margin-right: 20px;
    }

    .card-status div{
        display: flex;
        flex-direction: row;
        align-items: center;
    }


    .card-status div span {
        font-size: 0.9rem;
        color: var(--main-text-color);
    }

    .artwork-item-card:hover .card-details{
        opacity: 1;
    }

    /* Icons */
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
</style>
