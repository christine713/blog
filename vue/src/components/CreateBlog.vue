<template>
  <div class="tx">
    <header class="assets-header">
      <h2 class="title">Create Post</h2>
    </header>
    <!-- feedbacks -->
    <div v-if="isTxOngoing" class="feedback">
    
      <div style="width: 100%; height: 24px" />

      <div class="tx-ongoing-title">Opening Keplr</div>

      <div style="width: 100%; height: 8px" />

      <div class="tx-ongoing-subtitle">Sign transaction...</div>
    </div>

    <div v-else-if="isTxSuccess" class="feedback">
      <div class="check-icon">
        <svg
          width="64"
          height="63"
          viewBox="0 0 64 63"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="32"
            cy="31.5"
            r="29.5"
            stroke="#00CF30"
            stroke-width="4"
            stroke-linecap="round"
          />
          <path
            d="M19 30.1362L28.6557 40L45 23"
            stroke="#00CF30"
            stroke-width="4"
          />
        </svg>
      </div>

      <div style="width: 100%; height: 24px" />

      <div class="tx-feedback-title">Post created</div>

      <div style="width: 100%; height: 8px" />

      <div style="width: 100%">
        <SpButton style="width: 100%" @click="resetTx">Done</SpButton>
      </div>
    </div>

    <div v-else-if="isTxError" class="feedback">
      <div class="warning-icon">
        <svg
          width="58"
          height="54"
          viewBox="0 0 58 54"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M29 44.5625C29.7249 44.5625 30.3125 43.9749 30.3125 43.25C30.3125 42.5251 29.7249 41.9375 29 41.9375C28.2751 41.9375 27.6875 42.5251 27.6875 43.25C27.6875 43.9749 28.2751 44.5625 29 44.5625Z"
            fill="#FE475F"
          />
          <path
            d="M1.4375 52.4375L29 1.25L56.5625 52.4375H1.4375Z"
            stroke="#FE475F"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M29 19.625V34.0625"
            stroke="#FE475F"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M29 44.5625C29.7249 44.5625 30.3125 43.9749 30.3125 43.25C30.3125 42.5251 29.7249 41.9375 29 41.9375C28.2751 41.9375 27.6875 42.5251 27.6875 43.25C27.6875 43.9749 28.2751 44.5625 29 44.5625Z"
            stroke="#FE475F"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>

      <div style="width: 100%; height: 24px" />

      <div class="tx-feedback-title">Something went wrong</div>

      <div style="width: 100%; height: 16px" />

      <div class="tx-feedback-subtitle">
        Your tokens could not be transferred and will remain on your wallet.
      </div>

      <div style="width: 100%; height: 24px" />

      <div style="width: 100%">
        <SpButton style="width: 100%" @click="sendTx">Try again</SpButton>

        <div style="width: 100%; height: 8px" />

        <SpButton style="width: 100%" type="secondary" @click="resetTx"
          >Cancel</SpButton
        >
      </div>
    </div>

    <!-- wallet locked-->
    <div v-else-if="showWalletLocked">
      <div class="wallet-locked-wrapper">unlock your wallet</div>
    </div>

    <div style="width: 100%; height: 32px" />

    <!-- send -->
    <div v-if="showSend">
      <div class="enter-text-wrapper">
        <div class="input-label">Enter your blog title:</div>
        <div style="width: 100%; height: 5px" />
        <div class="input-wrapper">
          <input
            v-model="state.tx.title"
            class="input"
            placeholder="input blog title"
          />
          
        </div>
      </div>

      <div style="width: 100%; height: 15px" />

      <div class="enter-text-wrapper">
        <div class="input-label">Enter your blog body:</div>
        <div style="width: 100%; height: 5px" />
        <div class="input-wrapper">
          <input
            v-model="state.tx.body"
            class="input"
            placeholder="input blog body"
          />
          
        </div>
      </div>

      <div style="width: 100%; height: 54px" />

      <div>
        <SpButton style="width: 100%"  @click="sendTx"
          >Send</SpButton
        >
      </div>
    </div>

  </div>
</template>


<script lang="ts">
import { computed, defineComponent, reactive, watch } from 'vue'
import { useStore } from 'vuex'
import { SpButton,SpClipboard} from '@starport/vue'
import { useAddress, useAssets } from '@starport/vue/src/composables'


// types
export interface TxData {
[x: string]: string
  title: string
  body: string
}

export enum UI_STATE {
  'FRESH' = 1,

  'BOOTSTRAPED' = 2,

  'WALLET_LOCKED' = 3,

  'SEND' = 100,
  'SEND_ADD_TOKEN' = 101,

  'TX_SIGNING' = 300,
  'TX_SUCCESS' = 301,
  'TX_ERROR' = 302,

  'RECEIVE' = 400
}

export interface State {
  tx: TxData
  currentUIState: UI_STATE
  advancedOpen: boolean
}

export let initialState: State = {
  tx: {
    title:'',
    body:''
  },
  currentUIState: UI_STATE.SEND,
  advancedOpen: false
}

export default defineComponent({
  name: 'CreateBlog',

  components: {
    SpButton,
    SpClipboard
  },

  setup(_, {emit}) {
    // store
    let $s = useStore()

    // state
    let state: State = reactive(initialState)

    // composables
    let { address } = useAddress({ $s })
    let { balances } = useAssets({ $s })

    // actions
    let sendMsgSend = (opts: any) =>
      $s.dispatch('cosmonaut.blog.blog/sendMsgCreatePost', opts)

    // methods
    let switchToSend = (): void => {
      state.currentUIState = UI_STATE.SEND
    }
    let sendMsg = (): void => {
      emit('sendMsgFromCreateBlog')
    }
    let resetTx = (): void => {
      state.tx.title = ''
      state.tx.body = ''

      sendMsg()
      state.currentUIState = UI_STATE.SEND
    }
    let sendTx = async (): Promise<void> => {
      state.currentUIState = UI_STATE.TX_SIGNING

      let send
      

      let payload: any = {
        creator: address.value,
        title:state.tx.title,
        body:state.tx.body
      }

      try {
        send = () =>
          sendMsgSend({
            value: payload
          })
        
        const txResult = await send()

        if (txResult.code) {
          throw new Error()
        }
        state.currentUIState = UI_STATE.TX_SUCCESS
      } catch (e) {
        console.error(e)
        state.currentUIState = UI_STATE.TX_ERROR
      }
    }
    
    // computed
    let showSend = computed<boolean>(() => {
      return state.currentUIState === UI_STATE.SEND
    })
    let showWalletLocked = computed<boolean>(() => {
      return state.currentUIState === UI_STATE.WALLET_LOCKED
    })
    let isTxOngoing = computed<boolean>(() => {
      return state.currentUIState === UI_STATE.TX_SIGNING
    })
    let isTxSuccess = computed<boolean>(() => {
      return state.currentUIState === UI_STATE.TX_SUCCESS
    })
    let isTxError = computed<boolean>(() => {
      return state.currentUIState === UI_STATE.TX_ERROR
    })

    //watch
    watch(
      () => address.value,
      async () => {
        resetTx()
      }
    )
    return {
      //state,
      state,
      // composable
      address,
      // computed
      showSend,
      showWalletLocked,
      balances,
      isTxOngoing,
      isTxSuccess,
      isTxError,
      // methods
      switchToSend,
      resetTx,
      sendTx,
    }
  }
})

</script>

<style scoped lang="scss">
.advanced-label {
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  line-height: 153.8%;
  /* identical to box height, or 20px */
  display: inline-flex;
  align-items: center;

  /* base/black 0 */
  color: #000000;
}

.feedback {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.tx {
  padding-bottom: 40px;
}

.tx-feedback-title {
  font-family: Inter;
  font-style: normal;
  font-weight: bold;
  font-size: 21px;
  line-height: 152%;
  /* identical to box height, or 32px */
  text-align: center;
  letter-spacing: -0.017em;

  /* light/text */
  color: #000000;
}
.tx-feedback-subtitle {
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 150%;
  /* identical to box height, or 24px */
  text-align: center;

  /* light/muted */
  color: rgba(0, 0, 0, 0.667);
}

.tx-ongoing-title {
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 150%;
  /* identical to box height, or 24px */
  text-align: center;

  /* light/muted */
  color: rgba(0, 0, 0, 0.667);
}

.tx-ongoing-subtitle {
  font-family: Inter;
  font-style: normal;
  font-weight: bold;
  font-size: 21px;
  line-height: 152%;
  /* identical to box height, or 32px */
  text-align: center;
  letter-spacing: -0.017em;

  /* light/text */
  color: #000000;
}


.input-label {
  font-family: Inter;
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 153.8%;
  /* identical to box height, or 20px */

  /* light/muted */

  color: rgba(0, 0, 0, 0.867);
}

.title {
  font-family: Inter;
  font-style: normal;
  font-weight: bold;
  font-size: 28px;
  line-height: 127%;
  /* identical to box height, or 36px */

  letter-spacing: -0.016em;
  font-feature-settings: 'zero';

  color: rgb(2, 2, 2);

  &.disabled {
    &:hover {
      cursor: text;
    }
  }
}

.title.active {
  color: #000000;
}

.title.active:hover {
  cursor: initial;
}

.title:hover {
  cursor: pointer;
}

.enter-text-wrapper {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.input {
  margin-top: 4px;
  padding: 12px 16px;
  height: 48px;
  background-color: rgba(0, 0, 0, 0.03);
  border-radius: 10px;
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 130%;
  color: #000000;
  width: 100%;
  outline: 0;
  transition: background-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  display: block;

  &:not([disabled]) {
    &:hover {
      background: rgba(0, 0, 0, 0.07);
    }
  }

  &:focus {
    background: rgba(0, 0, 0, 0.07);
    color: #000;
  }

  &.error {
    box-shadow: 0 0 0 1px rgba(254, 71, 95, 1);
  }
}

.error-message {
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 153.8%;
  color: #d80228;
  margin-top: 5px;
}

.input::placeholder {
  color: rgba(0, 0, 0, 0.33);
}

.input-wrapper {
  display: block;
}
</style>
