import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import CharacterPage from '../views/CharacterPage.vue'
import ComicsPage from '../views/ComicsPage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/characterpage/:id',
    name: 'characterpage',
    component: CharacterPage
  },
  {
    path: '/comicspage/:id',
    name: 'comicspage',
    component: ComicsPage
  }
]

const router = createRouter({
  mode: 'history',
  history: createWebHashHistory(),
  routes
})

export default router
