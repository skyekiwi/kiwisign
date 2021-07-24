<template>
  <div class="wrapper">
    <el-card class="header-bar">
      <el-row>
        <el-col :span="6">
          <h2 class="centered">
            <el-avatar :src="logo" class="logo"></el-avatar>
            <span id="title">&nbsp;Kiwi·Sign</span>
          </h2>
        </el-col>

        <!-- <el-col :span="1" :offset="13">
          <el-tooltip content="Helps" placement="bottom" effect="light">
            <el-button type="info" plain icon="el-icon-document" class="setting centered"></el-button>&nbsp;&nbsp;&nbsp;
          </el-tooltip>
        </el-col> -->
        <el-col :span="1" :offset="17">
          <el-tooltip content="Logout" placement="bottom" effect="light">
            <el-button type="primary" plain icon="el-icon-cold-drink" class="setting centered" @click="logout"></el-button>
          </el-tooltip>
        </el-col>
      </el-row>
      <hr/>
      <h4 class="address">
        <u>Connected As</u>: &nbsp;
        <a target="_blank" href="https://crust.subscan.io/account/5DFhSMLmnw3Fgc6trbp8AuErcZoJS64gDFHUemqh2FRYdtoC">
          <small>5DFhSMLmnw3Fgc6trbp8AuErcZoJS64gDFHUemqh2FRYdtoC</small>
        </a>
      </h4>
    </el-card>
    <br/>
    <el-row>
      <el-button variant="outline-secondary" icon="el-icon-plus" class="setting centered"
        @click="new_contract"
      >
        Generate New Contract
      </el-button>
    </el-row>
    <br/>
    <el-row>
      <el-tabs tab-position="left">
        <el-tab-pane label="All Contract">
          <el-col :span="20" :offset="2">
            <h3>All Contract</h3><br/>
            <el-collapse v-model="activeNames" @change="handleChange" >
              <el-collapse-item v-for="contract in contracts" v-bind:key="contract.id">
                <template slot="title">
                  <span class="list_header"><b>{{contract.id}}</b> - {{contract.memo}}</span>
                  <el-tag class="tag" type="success" size="mini">Created By Me</el-tag>
                  <el-tag class="tag" type="info" size="mini">Signer</el-tag>
                </template>
                <div>{{contract.memo}}</div>
                <div>Consistent with real life: in line with the process and logic of real life, and comply with languages and habits that the users are used to;</div>
                <div>Consistent within interface: all elements should be consistent, such as: design style, icons and texts, position of elements, etc.</div>
              </el-collapse-item>
            </el-collapse>
          </el-col>
        </el-tab-pane>
        <el-tab-pane label="To be Signed">
          <el-col :span="20" :offset="2">
            <h3>To Be Signed</h3><br/>
            <el-collapse v-model="activeNames" @change="handleChange" >
              <el-collapse-item v-for="contract in contracts" v-bind:key="contract.id">
                <template slot="title">
                  <span class="list_header"><b>{{contract.id}}</b> - {{contract.memo}}</span>
                  <el-tag type="danger" size="mini">To Be Signed</el-tag>
                </template>
                <div>{{contract.memo}}</div>
                <div>Consistent with real life: in line with the process and logic of real life, and comply with languages and habits that the users are used to;</div>
                <div>Consistent within interface: all elements should be consistent, such as: design style, icons and texts, position of elements, etc.</div>
              </el-collapse-item>
            </el-collapse>
          </el-col>
        </el-tab-pane>
      </el-tabs>
    </el-row>
  </div>
</template>

<script>
import router from '@/router.js'
export default {
  name: 'Landing',
  data () {
    return {
      logo: require('@/assets/logo.png'),
      contracts: [{
        id: '0x873646',
        memo: 'some contract'
      }, {
        id: '0x273646',
        memo: 'some contract'
      }, {
        id: '0x916253',
        memo: 'some contract'
      }]
    }
  },
  methods: {
    connect_wallet: async () => {
      // router.push('/create')
    },
    new_contract: () => {
      router.push('/create')
    },
    logout () {
      router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper{
  padding: 20px 50px;
  .centered {
    display: flex;
    align-items: center;
  }
  .header-bar {
    margin-bottom: 20px;
  }
  .setting {
    font-size: 16px;
  }
  .logo{
    background: #FFF;
  }
  #title {
    margin-left: 10px;
  }
  .list_header {
    font-size: 14px;
    margin-right: 20px;
  }
  .tag {
    margin-left: 10px;
  }
}
</style>
