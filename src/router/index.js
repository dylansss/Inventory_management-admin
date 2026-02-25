import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Layout from '../layout/Layout.vue'
import Sku from '../views/Sku.vue'
import Stock from '../views/Stock.vue'
import Logs from '../views/Logs.vue'
import { useUserStore } from '../store/user'

const routes = [
  { path: '/login', component: Login },
  {
    path: '/',
    component: Layout,
    children: [
      { path: '', redirect: '/sku' },
      { path: 'sku', component: Sku },
      { path: 'stock', component: Stock },
      { path: 'logs', component: Logs }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const store = useUserStore()
  if (to.path !== '/login' && !store.token) {
    next('/login')
  } else {
    next()
  }
})

export default router