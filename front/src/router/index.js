import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginPage from '@/views/LoginPage.vue'
import CreateUser from '@/views/CreateUser.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: "/home",
    },
    {
      path: '/login',
      children: [
        {
          path: '',
          name: 'login',
          component: LoginPage,
        }, 
        {
          path: 'create',
          name: 'create-user',
          component: CreateUser,
        },
      ]
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/movie',
      children: []
    },
    {
      path: '/user',
      children: []
    },
    {
      path: '/movie',
      children: []
    },
  ],
})

router.beforeEach((to, from) => {
  // Méthode d'auth
})

export default router
