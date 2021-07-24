import VueRouter from 'vue-router'
import Landing from '@/views/Landing.vue'
import Create from '@/views/Create.vue'
import Loading from '@/views/Loading.vue'
import Sign from '@/views/Sign.vue'
import Main from '@/views/Main.vue'

const router = new VueRouter({
  routes: [
    { path: '/', component: Landing },
    { path: '/main', component: Main },
    { path: '/create', component: Create },
    { path: '/loading/:redirect', component: Loading },
    { path: '/sign/:id', component: Sign }
  ]
})

export default router
