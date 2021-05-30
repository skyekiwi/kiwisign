<template>
  <div id='container'>
    <el-row :gutter='20'>
      <el-col :span='24'>
        <el-steps id='steps' :active="active" align-center finish-status='success'>
          <el-step title="Step 1" description="Tweak Some Settings"></el-step>
          <el-step title="Step 2" description="Upload the Contract"></el-step>
          <el-step title="Step 3" description="Tell us who you want to share it with"></el-step>
          <el-step title="Step 4" description="Done!"></el-step>
        </el-steps>
      </el-col>
    </el-row>

    <div v-if='active === 0' class='action'>
      <el-row :gutter='20'>
        <el-col :span='20' :offset='2'>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span style='padding-top:20px;'>Tweak Some Settings</span>
              <el-button-group style='float:right;'>
                <el-button type="primary" disabled @click='last_step' size='small'><i class="el-icon-arrow-left"></i>&nbsp;&nbsp;Last Step</el-button>
                <el-button type="primary" @click='next_step' size='small'>Next Step&nbsp;&nbsp;<i class="el-icon-arrow-right"></i></el-button>
              </el-button-group>
            </div>
            <div class="text item action-content lefted">
              <p><b>If you don't know what these mean, feel free to click "Next Step" on top, and use the default settings.</b></p>
              <div class="action-section">
                <p>Select which storage network do you want to use:</p>
                <el-radio-group v-model='storage_network' size="large">
                  <el-tooltip content="Cheap but valid for 2 years." placement="bottom">
                    <el-radio class='radio' label='crust' border>Crust Network</el-radio>
                  </el-tooltip>
                  <el-tooltip content="About 5 times the fee of the Crust Network. Permenat" placement="bottom">
                    <el-radio class='radio' label='arweave' border>Arweave</el-radio>
                  </el-tooltip>
                </el-radio-group>
              </div>
              <div class="action-section">
                <p>Would you pay for all fees for your contract recipients: </p>
                <el-radio-group v-model='meta_tx' size="large">
                  <el-radio class='radio' label='yes' border>Yes</el-radio>
                  <el-radio class='radio' label='no' border>No</el-radio>
                </el-radio-group>
              </div>
              <div class="action-section">
                <p>Do you want to remain anonymous? (Coming soon)</p>
                <el-radio-group v-model='anonymousity' size="large">
                  <el-radio class='radio' label='yes' disabled border>Yes</el-radio>
                  <el-radio class='radio' label='no' disabled border>No</el-radio>
                </el-radio-group>
              </div>
              <!-- <div class="action-section">
                <p>We would have to record your public key, and store in a database. Are you OK with that?</p>
                <el-radio-group v-model='public_key_consent' size="large">
                  <el-radio class='radio' label='yes' border>Yes</el-radio>
                  <el-radio class='radio' label='no' border>No</el-radio>
                </el-radio-group>
              </div> -->
              <div class="action-section">
                <p>Would you like to see the progress of creating the contract?&nbsp;&nbsp;:&nbsp;)</p>
                <el-radio-group v-model='show_progress' size="large">
                  <el-radio class='radio' label='yes' border>Yes</el-radio>
                  <el-radio class='radio' label='no' border>No</el-radio>
                </el-radio-group>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <div v-if='active === 1' class='action'>
      <el-row :gutter='20'>
        <el-col :span='20' :offset='2'>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span style='padding-top:20px;'>Upload the Contract</span>
              <el-button-group style='float:right;'>
                <el-button type="primary" @click='last_step' size='small'><i class="el-icon-arrow-left"></i>&nbsp;&nbsp;Last Step</el-button>
                <el-button type="primary" @click='next_step' size='small'>Next Step&nbsp;&nbsp;<i class="el-icon-arrow-right"></i></el-button>
              </el-button-group>
            </div>
            <div class="text item action-content centered">
              <el-upload
                class="upload-demo"
                drag
                :auto-upload='false'
                :file-list="fileList" multiple>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
                <div class="el-upload__tip" slot="tip">jpg/png files with a size less than 500kb</div>
              </el-upload>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <div v-if='active === 2' class='action'>
      <el-row :gutter='20'>
        <el-col :span='20' :offset='2'>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span style='padding-top:20px;'>Add Recipients</span>
              <el-button-group style='float:right;'>
                <el-button type="primary" @click='last_step' size='small'><i class="el-icon-arrow-left"></i>&nbsp;&nbsp;Last Step</el-button>
                <el-button type="primary" @click='next_step' size='small'>Next Step&nbsp;&nbsp;<i class="el-icon-arrow-right"></i></el-button>
              </el-button-group>
            </div>
            <div class="text item action-content recipients">
              <el-input
                style="width: 40%; margin-bottom: 50px; margin-right: 20px;"
                placeholder="New Recipient"
                v-model='new_recipient'
                clearable>
              </el-input>
              <el-button icon="el-icon-plus" style="margin-right: 30px;" circle @click="addRecipient"></el-button>
              <el-table
                :data="recipients"
                v-loading="loading"
                highlight-current-row
                style="width: 100%">

                  <el-table-column
                    type="index"
                    width="50">
                  </el-table-column>
                  <el-table-column
                    property="public_address"
                    label="Public Address">
                  </el-table-column>
                  <el-table-column
                    property="public_key"
                    label="Do we have their public key?"
                    width='250'>
                  </el-table-column>
                  <el-table-column
                    property="role"
                    label="Role in this Agreement"
                    width='200'>
                  </el-table-column>
                  <el-table-column
                    fixed="right"
                    label="Delete"
                    width="120">
                    <template slot-scope="scope">
                      <el-button
                        @click.native.prevent="deleteRow(scope.$index, recipients)"
                        type="primary"
                        size="small">
                        Remove
                      </el-button>
                    </template>
                  </el-table-column>
              </el-table>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <div v-if='active === 3' class='action'>
      <el-row :gutter='20'>
        <el-col :span='20' :offset='2'>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span style='padding-top:20px;'>Review Your Request</span>
              <el-button-group style='float:right;'>
                <el-button type="primary" @click='last_step' size='small'><i class="el-icon-arrow-left"></i>&nbsp;&nbsp;Last Step</el-button>
                <el-button type="primary" disabled @click='next_step' size='small'>Next Step&nbsp;&nbsp;<i class="el-icon-arrow-right"></i></el-button>
              </el-button-group>
            </div>
            <div class="text item action-content" >
              <h3>Your Settings</h3><br/>
              <el-table
                id="review"
                :data="review"
                v-loading="loading"
                highlight-current-row
                style="width: 100%">
                  <el-table-column
                    type="index"
                    width="50">
                  </el-table-column>
                  <el-table-column
                    property="field"
                    label="Field"
                    width='350'>
                  </el-table-column>
                  <el-table-column
                    property="selection"
                    label="Selection"
                    width='350'>
                  </el-table-column>
              </el-table>
              <br/><br/>
              <h3>Your Recipients</h3><br/>
              <el-table
                :data="recipients"
                v-loading="loading"
                highlight-current-row
                style="width: 100%">

                  <el-table-column
                    type="index"
                    width="50">
                  </el-table-column>
                  <el-table-column
                    property="public_address"
                    label="Public Address">
                  </el-table-column>
                  <el-table-column
                    property="public_key"
                    label="Do we have their public key?"
                    width='250'>
                  </el-table-column>
                  <el-table-column
                    property="role"
                    label="Role in this Agreement"
                    width='200'>
                  </el-table-column>
              </el-table><br/><br/>
              <h3>Your Cost Estimation</h3><br/>
              <p>
                <span class='fee-title'>Crust Network Unit Price:</span> $0.0000003 X 1MB<br/>
                <span class='fee-title'>Crust Network Fee Estimation:</span> $0.0000072<br/>
                <span class='fee-title'>Transaction Fee per Transaction:</span> $0.00001 per Transaction<br/>
                <span class='fee-title'>Transaction Fee Estimate:</span> $0.00001 X ( 3 Recipients) X 1 Call per Signature<br/>
                <el-divider/>
                <span class='fee-title'>Total Cost:</span> $0.00004<br/>
                <span class='fee-title'>Platform Fee:</span> $0.00002<br/>
                <el-divider/>
                <span class='fee-title'>Total Due:</span> $0.00006<br/>
              </p><br/><br/><br/><br/>
              <el-button type="info" style="text-align:center" @click="submitContract">Looking Good! Proceed.</el-button>
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
  name: 'Create',
  mounted () {
    console.log(this.$store.state.storage_network)
  },
  data () {
    return {
      storage_network: 'crust',
      meta_tx: 'yes',
      anonymousity: 'no',
      public_key_consent: 'yes',
      show_progress: 'no',
      new_recipient: '',
      recipients: [{
        public_address: '5DFhSMLmnw3Fgc6trbp8AuErcZoJS64gDFHUemqh2FRYdtoC (Yourself)',
        public_key: 'Yes',
        role: 'Creator'
      }],
      review: [{
        field: 'Network Selection',
        selection: 'Crust Network'
      }, {
        field: 'Pre-paid Fees',
        selection: 'Yes'
      }, {
        field: 'Anonymousity',
        selection: 'No'
      }, {
        field: 'See the Process : )',
        selection: 'Yes'
      }, {
        field: 'Contract',
        selection: 'xxxx.pdf'
      }],
      loading: false
    }
  },
  computed: {
    active () {
      return this.$store.state.active_process
    }
  },
  methods: {
    next_step () {
      this.$store.commit('next_step')
    },
    last_step () {
      this.$store.commit('last_step')
    },
    async addRecipient () {
      this.loading = true
      setTimeout(() => {
        const recipient = {
          public_address: this.new_recipient,
          public_key: 'Yes',
          role: 'Recipient'
        }
        this.recipients.push(recipient)

        this.loading = false
      }, 3000)
    },
    deleteRow (index, rows) {
      if (index === 0) {
        alert('Cannot delete youself, duh... ')
        return
      }
      rows.splice(index, 1)
    },
    submitContract () {
      router.push('/loading/sign_0x86354')
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
