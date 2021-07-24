<template>
  <div id='container'>
    <div class='action'>
      <el-row :gutter='20'>
        <el-col :span='20' :offset='2'>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span style='padding-top:20px;'>Your Contract</span>
            </div>
            <div class="text item action-content">
              <h3>Contract ID: {{ $route.params.id }}</h3>
              <h4>You are connected as: &nbsp;<small>5DFhSMLmnw3Fgc6trbp8AuErcZoJS64gDFHUemqh2FRYdtoC</small></h4>
              <h4 v-if='$route.params.id === "0x86354"' style="color: #67C23A">You have access to this contract : ) </h4>
              <h4 v-if='$route.params.id !== "0x86354"' style="color: #F56C6C">You do not have access to this contract : ( </h4>
              <br/><br/><el-divider v-if='$route.params.id === "0x86354"'/><br/><br/>
              <h4 v-if='$route.params.id === "0x86354"'><a href="https://google.com">Download The Contract</a></h4><br/><br/>
              <span v-if='$route.params.id === "0x86354"'>Please share this link to your recipients:</span>
              <el-input v-if='$route.params.id === "0x86354"' v-model="link" style="width: 50%;"/><br/><br/>
              <p v-if='$route.params.id === "0x86354"'><el-checkbox v-model='checked'>I have read the KiwiSign ToS and by click the button below, I will create a permenant record that will be accessible by only selected users.</el-checkbox></p>
              <el-button v-if='$route.params.id === "0x86354"' :disabled='!checked' type="success" @click='signContract'>Sign The Contract</el-button>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import router from '@/router.js'

export default {
  name: 'Sign',
  mounted () {
    console.log(this.$store.state.storage_network)
  },
  data () {
    return {
      link: 'https://sign.skye.kiwi/contract/0x86354',
      loading: false,
      checked: false
    }
  },
  computed: {
    active () {
      return this.$store.state.active_process
    }
  },
  methods: {
    signContract () {
      router.push('/loading/main')
    }
  }
}
</script>

<style>
.fee-title {
  color: #909399;
}
#review {
  width: 700px;
}
.add-recipient {
  margin-bottom: 50px;
}
.lefted {
  text-align: left;
}
.centered {
  text-align: center;
}
button span {
  vertical-align: middle;
}
.action-section {
  margin: 3%;
}
.action {
  margin-top: 5%;
}
.action-content {
  padding: 3%;
}
#container {
  padding: 6%;
  font-family: 'Nunito', sans-serif;
}
div.el-step__title {
  font-size: 20px;
}
div.el-step__description {
  font-size: 14px;
}
</style>
