<template>
  <b-row no-gutters class="h-100 template-one">
    <el-dialog title="Pick Wallets to Connect" :visible.sync="dialogVisible">
      <el-table :data="accounts" v-loading="init_blockchain">
        <el-table-column property="address" label="Address"></el-table-column>
        <el-table-column property="account_name" label="Name" width="100"></el-table-column>
        <el-table-column
          fixed="right"
          width="120">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="selectAccount(scope.$index, accounts)"
              type="primary"
              size="small">
              Select
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
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
import * as SkyeKiwi from '@skyekiwi/protocol'

export default {
  name: 'Landing',
  data () {
    return {
      logo: require('@/assets/logo.png'),
      backgroundImage: require('@/assets/bg.jpg'),
      disclaimer: ['easy to use', 'inexpansive', 'decentralized', 'strong cryptographic secured'],
      medium: 'https://skyekiwi.medium.com/',
      twitter: 'https://twitter.com/skyekiwi_team',
      telegram: 'https://t.me/skyekiwi',
      accounts: [],
      dialogVisible: false,
      init_blockchain: false
    }
  },
  methods: {
    async connect_wallet () {
      await web3Enable('Kiwi·Sign')
      const allAccounts = await web3Accounts()
      this.accounts = allAccounts.map(item => {
        return {
          address: item.address,
          account_name: item.meta.name,
          selected: true,
          signer: item
        }
      })
      this.dialogVisible = true
    },
    async selectAccount (index, rows) {
      this.init_blockchain = true
      const blockchain = new SkyeKiwi.Blockchain(
        rows[index].signer,
        '3cNizgEgkjB8TKm8FGJD3mtcxNTwBRxWrCwa77rNTq3WaZsM',
        'wss://jupiter-poa.elara.patract.io',
        'wss://rocky-api.crust.network/'
      )
      await blockchain.init()
      this.$store.commit('add_blockchain', blockchain)
      this.init_blockchain = false
      router.push('/loading/main')
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
  .wallet_button {
    margin-left: 20px;
  }
}
</style>
