import { createWebHistory, createRouter } from 'vue-router'

import Login from '../pages/Login.vue';
import About from '../pages/About.vue';

import Management from '../pages/management/Management.vue';
import UsersList from '../pages/management/UsersList.vue';
import UserDetails from '../pages/user/UserDetails.vue';
import ArtistsDetails from '../pages/management/AuthorDetails.vue';
import ArtistsList from '../pages/management/AuthorsList.vue';
import ArtworksList from '../pages/management/ArtworksList.vue';
import ArtworkDetails from '../pages/management/ArtworkDetails.vue';

import ArtworksGrid from '../pages/artwork/ArtworksGrid.vue';
import ArtworkPage from '../pages/artwork/ArtworkPage.vue';

const routes =[
    // main routes
    {path: '/', name: 'index', component: ArtworksGrid, meta: {title: 'Casulo | Trabalhos'}},

    {path: '/portfolio', name: 'home', component: ArtworksGrid, meta: {title: 'Casulo | Trabalhos'}},

    {path: '/about', name: 'about', component: About, meta: {title: 'Casulo | Os artistas'}},

    {path: '/portfolio/:id', component: ArtworkPage, meta: {title: 'Trabalho'} },

    // user routes
    {path: '/login', component: Login, meta: {title: 'Entrar'}},

    {path: '/register', component: UserDetails, meta: {title: 'Criar conta'}},

    // management routes
    {path: '/manage', component: Management,meta: {title: 'Gerenciar'}},

    {path: '/authors', component: ArtistsList,meta: {title: 'Gerenciar autores'}},

    {path: '/authors/new', component: ArtistsDetails, meta: {title: 'Adicionar autores'}},

    {path: '/authors/:id', component: ArtistsDetails, meta: {title: 'Dados do autor'}},

    {path: '/artworks', component: ArtworksList, meta: {title: 'Gerenciar trabalhos'}},

    {path: '/artworks/new', component: ArtworkDetails, meta: {title: 'Gerenciar trabalhos'}},

    {path: '/artworks/:id', component: ArtworkDetails, meta: {title: 'Dados do trabalho'}},

    {path: '/users', component: UsersList, meta: {title: 'Usuários'}},

    {path: '/users/:id', component: UserDetails, meta: {title: 'Dados do usuário'}},
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