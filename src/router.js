import VueRouter from 'vue-router'
import Landing from '@/components/Landing.vue'
import Create from '@/components/Create.vue'
import Loading from '@/components/Loading.vue'
import Sign from '@/components/Sign.vue'

const router = new VueRouter({
  routes: [
    { path: '/', component: Landing },
    { path: '/create', component: Create },
    { path: '/loading/:redirect', component: Loading },
    { path: '/sign/:id', component: Sign }
  ]
})

export default router
