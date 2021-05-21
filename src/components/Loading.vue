<template>
  <div class='overflow-x-hidden h-100' style='background: #fff'>
    <vue-splash
      id="loading"
      :show="true"
      :logo="logo"
      title="Kiwi·Sign"
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
    }
  },
  mounted () {
    const mainRoute = this.$route.params.redirect.split('_')[0]
    const secondaryRoute = this.$route.params.redirect.split('_')[1]

    if (mainRoute === 'sign') {
      setTimeout(() => {
        router.push(`/sign/${secondaryRoute}`)
      }, 3000)
    } else {
      setTimeout(() => {
        router.push('/')
      }, 3000)
    }
  }
}
</script>
<style>
.vue-splash__text span{
  font-size: 50px;
}
</style>
