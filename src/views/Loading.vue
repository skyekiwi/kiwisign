<template>
  <div class='overflow-x-hidden h-100' style='background: #fff'>
    <vue-splash
      id="loading"
      :show="true"
      :logo="logo"
      :title="title"
      color="black"
      :size="300"
      :fixed="true"
      :background-color="black"
    />
  </div>
</template>

<script>
import Logo from '@/assets/logo.png'
import router from '@/router.js'

export default {
  name: 'Loading',
  computed: {
    logo () {
      return Logo
    },
    title () {
      const mainRoute = this.$route.params.redirect.split('_')[0]
      switch (mainRoute) {
        case 'main':
          return 'Fetching Contracts ... '

        default:
          return 'Kiwi·Sign'
      }
    }
  },
  mounted () {
    const mainRoute = this.$route.params.redirect.split('_')[0]
    const secondaryRoute = this.$route.params.redirect.split('_')[1]

    this.$Progress.start()
    switch (mainRoute) {
      case 'sign':
        setTimeout(() => {
          router.push(`/sign/${secondaryRoute}`)
        }, 3000)
        break

      case 'main':
        this.title = () => 'Fetching Contracts ... '
        setTimeout(() => {
          router.push('/main')
        }, 3000)
        break

      default:
        setTimeout(() => {
          router.push('/')
        }, 3000)
        break
    }
  }
}
</script>
<style>
.vue-splash__text span{
  font-size: 50px;
}
</style>
