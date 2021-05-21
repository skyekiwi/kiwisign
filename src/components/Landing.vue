<template>
  <b-row no-gutters class="h-100 template-one">
    <b-col cols="12" sm="6" xl="8" class="p-5 d-none d-sm-flex justify-content-center align-items-center background-container" :style="{backgroundImage:'url('+backgroundImage+')'}"></b-col>
    <b-col cols="12" sm="6" xl="4" class="bg-light p-5 d-flex flex-column justify-content-center align-items-center shadow-lg">
      <div class="text-center my-auto">
        <img :src="logo" alt="logo" class="img-fluid mx-auto mb-4">
        <div class="title mb-3">Kiwi·Sign</div>
        <div class="disclaimer font-weight-light">
          The contract signing app that is <vue-typed-js
            class="d-block"
            :loop="true"
            :strings="disclaimer"
            :typeSpeed='130'

          >
            <span class="typing"></span>
          </vue-typed-js>
        </div><br/><br/>
        <b-button variant="outline-secondary" @click="connect_wallet">Connect Your Wallet</b-button>
      </div>
      <div class="mt-auto text-center social-media-container">
        <a v-if="medium" :href="medium" target="_blank" class="text-body mx-2 my-3">Medium</a>&nbsp;|&nbsp;
        <a v-if="twitter" :href="twitter" target="_blank" class="text-body mx-2 my-3">Twitter</a>&nbsp;|&nbsp;
        <a v-if="telegram" :href="telegram" target="_blank" class="text-body mx-2 my-3">Telegram</a>
        <br/><br/><span class='copyright'>Copyright © 2021 SkyeKiwi. All Rights Reserved.</span>
      </div>
    </b-col>
  </b-row>
</template>

<script>
import router from '@/router.js'
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp'

export default {
  name: 'Landing',
  data () {
    return {
      logo: require('@/assets/logo.png'),
      backgroundImage: require('@/assets/bg.jpg'),
      disclaimer: ['easy to use', 'inexpansive', 'decentralized', 'strong cryptographic secured'],
      medium: 'https://skyekiwi.medium.com/',
      twitter: 'https://twitter.com/skyekiwi_team',
      telegram: 'https://t.me/skyekiwi'
    }
  },
  methods: {
    connect_wallet: async () => {
      await web3Enable('Kiwi·Sign')
      const allAccounts = await web3Accounts()
      console.log(allAccounts)
      router.push('/create')
    }
  }
}
</script>

<style lang="scss" scoped>
.template-one{
  .title{
    font-size: 3rem;
  }
  .disclaimer{
    font-size: 1.5rem;
  }
  .background-container{
    background-position: center center;
    background-size: cover;
    box-shadow: inset 0rem 0rem 5rem rgba(0, 0, 0, 0.2) !important;
  }
  .social-media-container{
    a{
      transition: all 1s;
      text-decoration: underline;
      &:hover{
        color: gray!important;
        text-decoration: none;
      }
    }
  }
  .copyright {
    font-family: 'Nunito', sans-serif;
    font-size: 15px;
  }
  img {
    max-height: 200px;
  }
}
</style>
