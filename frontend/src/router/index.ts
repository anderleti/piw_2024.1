import { createWebHistory, createRouter } from 'vue-router'

import ArtworksGrid from '../pages/artwork/ArtworksGrid.vue';
import ArtworkPage from '../pages/artwork/ArtworkPage.vue';
import Login from '../pages/Login.vue';
import Register from '../pages/Register.vue';

const routes =[
    // artwork routes
    {path: '/', name: 'index', component: ArtworksGrid, meta: {title: 'Casulo | Trabalhos'}},
    {path: '/artworks', name: 'home', component: ArtworksGrid, meta: {title: 'Casulo | Trabalhos'}},
    {path: '/about', name: 'about', component: ArtworksGrid, meta: {title: 'Casulo | Os artistas'}},
    {path: '/artworks/:id', component: ArtworkPage, meta: {title: 'Artwork'} },
    // user routes
    {path: '/login', component: Login, meta: {title: 'Entrar'}},
    {path: '/register', component: Register, meta: {title: 'Criar conta'}},
    {path: '/users', component: ArtworksGrid, meta: {title: 'Artworks'}},
    {path: '/users/:id', component: ArtworksGrid}
    // 
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
  const title = to.meta.title
  const titleFromParams = to.params.pageTitle;
  if (title) {
    document.title = title.toString()
  }
  // if (titleFromParams) {
  //   document.title = `${titleFromParams} - ${document.title}`;
  // }
  next()
})