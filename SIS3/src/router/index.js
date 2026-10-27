import { createRouter, createWebHistory } from 'vue-router'
import { auth } from '../auth'

const routes = [
  { path: '/', name: 'home', component: () => import('../views/HomeView.vue') },
  { path: '/login', name: 'login', component: () => import('../views/LoginView.vue') },
  { path: '/recipes', name: 'recipes', component: () => import('../views/RecipeListView.vue') },
  // "new" must be before ":id", otherwise "new" is treated as an id
  { path: '/recipes/new', name: 'recipe-new', component: () => import('../views/RecipeFormView.vue'), meta: { requiresAuth: true } },
  { path: '/recipes/:id', name: 'recipe-details', component: () => import('../views/RecipeDetailsView.vue'), props: true },
  { path: '/recipes/:id/edit', name: 'recipe-edit', component: () => import('../views/RecipeFormView.vue'), meta: { requiresAuth: true } },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('../views/NotFoundView.vue') },
]

const router = createRouter({ history: createWebHistory(), routes })

router.beforeEach((to) => {
  if (to.meta.requiresAuth && !auth.token) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }
  if (to.name === 'login' && auth.token) return { name: 'recipes' }
})

export default router
