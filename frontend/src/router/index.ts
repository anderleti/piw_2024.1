import { createWebHistory, createRouter } from 'vue-router'
import { useUserStore } from '../stores/userStore';

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
import Unauthorized from '../pages/Unauthorized.vue';

const routes =[
    // main routes
    {path: '/', name: 'index', component: ArtworksGrid, meta: {title: 'Casulo | Trabalhos'}},

    {path: '/portfolio', name: 'home', component: ArtworksGrid, meta: {title: 'Casulo | Trabalhos'}},

    {path: '/about', name: 'about', component: About, meta: {title: 'Casulo | Os artistas'}},

    {path: '/portfolio/:id', component: ArtworkPage, meta: {title: 'Trabalho'} },
    {path: '/unauthorized', component: Unauthorized, meta: {title: 'Não vai não...'} },

    // user routes
    {path: '/login', component: Login, meta: {navBar: false, title: 'Entrar'}},

    {path: '/register', component: UserDetails, meta: {navBar: false, title: 'Criar conta'}},

    // management routes
    {path: '/manage', component: Management,meta: {requiresAuth: true, restricted: true,title: 'Gerenciar'}},

    {path: '/authors', component: ArtistsList, requiresAuth: true,meta: {title: 'Gerenciar autores'}},

    {path: '/authors/new', component: ArtistsDetails, meta:{requiresAuth: true, restricted: true,title: 'Adicionar autores'}},

    {path: '/authors/:id', component: ArtistsDetails, meta:{requiresAuth: true, restricted: true,title: 'Dados do autor'}},

    {path: '/artworks', component: ArtworksList, meta:{requiresAuth: true, restricted: true,title: 'Gerenciar trabalhos'}},

    {path: '/artworks/new', component: ArtworkDetails, meta:{requiresAuth: true, restricted: true,title: 'Gerenciar trabalhos'}},

    {path: '/artworks/:id', component: ArtworkDetails, meta:{requiresAuth: true, restricted: true,title: 'Dados do trabalho'}},

    {path: '/users', component: UsersList, meta:{requiresAuth: true, restricted: true,title: 'Usuários'}},

    {path: '/users/:id', component: UserDetails, meta:{requiresAuth: true, restricted: true,title: 'Dados do usuário'}},
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  const title = to.meta.title
  const titleFromParams = to.params.pageTitle;

 if( to.meta.requiresAuth && !userStore.isAuthenticated ) {
    next('/login') 
  } else {
    if ( to.meta.restricted && userStore.role !== 'Admin' ) {
      next('/unauthorized')
    } else {
      if (title) {
        document.title = title.toString()
      }
      next()
    }

  }
})