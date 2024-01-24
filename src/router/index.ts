import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import FactsView from '@/views/FactsView.vue'
import FactDetailView from '@/views/FactDetailView.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/cat-facts',
    name: 'cat-facts',
    component: FactsView
  },
  {
    path: '/',
    redirect: to => {
      return {path: '/cat-facts'}
    }
  },
  {
    path: '/fact/:id',
    name: 'fact-detail',
    component: FactDetailView
  }
]

const router = new VueRouter({
  routes
})

export default router
