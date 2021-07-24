<template>
  <div id='app' class='overflow-x-hidden h-100'>
    <router-view></router-view>
    <vue-progress-bar></vue-progress-bar>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted () {
    this.$Progress.finish()
  },
  created () {
    this.$Progress.start()
    this.$router.beforeEach((to, _, next) => {
      if (to.meta.progress !== undefined) {
        const meta = to.meta.progress
        this.$Progress.parseMeta(meta)
      }
      this.$Progress.start()
      next()
    })
    this.$router.afterEach(() => {
      this.$Progress.finish()
    })
  }
}
</script>

<style lang="scss" scoped>
#app {
  font-family: monospace;
}
</style>>
