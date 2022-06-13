<template>
  <div class="tx-list">
    <div class="title">Blog List</div>
    <div>
      <table width="100%" style="table-layout:fixed">
        <td>
          <SpButton :disabled="!address" @click="sendMsg(0, null)">Create Post</SpButton>
        </td>
        <td>
          <SpButton @click="callApi">Refresh</SpButton>
        </td>
      </table>
    </div>
    <table class="assets-table" v-bind="blogData">
      <tbody v-if="blogData">
        <tr
          v-for="(blog, index) in blogData"
          :key="index"
          class="assets-table__row"
          @click="sendMsg(1, index)"
        >
          <td>
            <tr>{{ blog.title }}</tr>
            <tr>{{ blog.shorCreator }}</tr>
          </td>
          <td >
            <tr>{{ blog.createdAtDate }}</tr>
            <tr>{{ blog.createdAtTime }}</tr>
          </td>
        </tr>
        <tr v-if="!blogData.length" class="assets-table__row">
          <td class="assets-table__row--no-results">
            <p>Try again with another search</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { SpButton } from '@starport/vue'
import axios from 'axios'

import { useAddress } from '@starport/vue/src/composables'
import { BlogData } from './type/blog'

export default defineComponent({
  name: 'ShowBlogList',

  components: { SpButton, },

  props: {
    url: {
      type: String,
      default: 'http://localhost:1317/cosmonaut/blog/blog/posts'
    },
    data:{
      type: String,
      default: 'default'
    },
  },

  data() {
    return {
      activeName: 1,
      blogData: [],
    }
  },
  
  setup(props) {
    let $s = useStore()

    // composables
    let { address } = useAddress({ $s })

    const blogData = ref([])

    const getAxios = function(){
      blogData.value = []
      axios.get(props.url)
      .then((res) => {
        console.log(res.data)
        const blogRow = res.data
        if(blogRow.Post.length != 0){
          for (let  x = 0; x < blogRow.Post.length; x++) {
            let weather = res.data.Post[x].weather.split(" ")
            
            const data: BlogData = {
              creator: res.data.Post[x].creator,
              shorCreator: res.data.Post[x].creator.substring(0, 10) + '...' + res.data.Post[x].creator.slice(-4),
              id: res.data.Post[x].id,
              title: res.data.Post[x].title,
              body: res.data.Post[x].body,
              weather: weather[0],
              createdAtDate: weather[1],
              createdAtTime: weather[2],
            }

            blogData.value.push(data)
          }
        }
      })
      .catch((error) => {
        throw new Error(error)
      })
    }
    getAxios()

    let callApi = (): void => {
      getAxios()
    }

    return { address, blogData, callApi }
  },
  methods:{
    sendMsg(type, index){
      if(type == 0){
        this.$emit('sendmsg', 'createPost')
      }else{
        this.$emit('sendmsg', this.blogData[index])
      }
    },
  },
})
</script>

<style lang="scss" scoped>
$base-color: rgba(0, 0, 0, 0.03);
$animation-duration: 1.6s;
$shine-color: rgba(0, 0, 0, 0.06);
$avatar-offset: 32 + 16;
.assets-header {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  > * {
    position: relative;
    width: 100%;
    &:first-child {
      flex: 0 0 66.6666666667%;
      max-width: 66.6666666667%;
    }
    &:last-child {
      flex: 0 0 33.3333333333%;
      max-width: 33.3333333333%;
    }
  }
  &__search-content {
    display: flex;
    align-items: center;
    justify-content: end;
    height: 100%;
    position: relative;
    .search-container {
      position: relative;
      margin: 0px -10px -1px 0;
      > input[type='search'] {
        padding: 0 0 0 36px;
        width: 166px;
        height: 50px;
        background: #ffffff;
        border-radius: 10px;
        box-shadow: inset 0 0 0 1px rgba(9, 78, 253, 0);
        transition: all 0.2s ease;
        &:focus {
          box-shadow: inset 0 0 0 1px rgba(9, 78, 253, 1);
          color: #000;
          padding: 0 20px 0 36px;
        }
        &::placeholder {
          color: rgba(0, 0, 0, 0.33);
        }
        &::-webkit-search-decoration,
        &::-webkit-search-cancel-button,
        &::-webkit-search-results-button,
        &::-webkit-search-results-decoration {
          display: none;
          -webkit-appearance: none;
        }
      }
      .search-icon {
        position: absolute;
        left: 14px;
        top: 18px;
      }
      .clear-icon {
        position: absolute;
        height: 48px;
        right: 13px;
        width: 24px;
        top: 1px;
        display: flex;
        cursor: pointer;
        align-items: center;
        z-index: 456;
        justify-content: center;
        background: #fff;
      }
    }
  }
}
.assets-table {
  width: 100%;
  &__denom {
    border-top-left-radius: 0.75rem;
    border-bottom-left-radius: 0.75rem;
    vertical-align: middle;
    padding-top: 2.5rem;
    width: 35.4%;
  }
  &__amount {
    box-sizing: border-box;
    display: table-cell;
    padding-bottom: 20px;
    padding-top: 20px;
    font-family: Inter, serif;
    font-size: 16px;
    letter-spacing: -0.112px;
    line-height: 21px;
    tab-size: 4;
    text-align: right;
    text-indent: 0;
    vertical-align: middle;
    font-weight: 700;
  }
  &__channels {
    > ul {
      list-style: none;
      display: inline-flex;
      font-size: 16px;
      color: rgba(0, 0, 0, 0.667);
    }
    &--object {
      > ul {
        li {
          display: inline-block;
          div {
            display: inline-block;
          }
          &:first-child {
            margin-right: 4px;
          }
          &:nth-child(n + 3) {
            &:before {
              font-family: sys, serif;
              content: '→';
              display: inline-block;
              margin: 0 5px 0 4px;
            }
          }
        }
      }
    }
  }
  &__thead {
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    line-height: 153.8%;
    color: rgba(0, 0, 0, 0.667);
    td {
      padding-top: 22px;
      padding-bottom: 7px;
    }
  }
  &__align-right {
    text-align: right;
  }
  &__row {
    cursor: pointer;
    &--no-results {
      text-align: center;
      padding-top: 32px;
      h4 {
        padding: 0;
        margin: 0;
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        letter-spacing: -0.007em;
      }
      p {
        padding: 0;
        margin: 4px 0 0 0;
        font-style: normal;
        font-weight: normal;
        font-size: 13px;
        color: rgba(0, 0, 0, 0.667);
      }
    }
  }
}
.sp-denom-name {
  display: inline-block;
  font-family: Inter, serif;
  font-size: 16px;
  letter-spacing: -0.112px;
  line-height: 21px;
  tab-size: 4;
  text-align: right;
  text-indent: 0;
  vertical-align: middle;
  font-weight: 600;
}
.sp-denom-marker {
  display: inline-flex;
  vertical-align: middle;
  margin-right: 16px;
  border-radius: 24px;
  text-align: center;
  font-family: Inter, serif;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 125%;
  /* or 20px */
  align-items: center;
  justify-content: center;
  letter-spacing: -0.007em;
}
.title {
  font-family: Inter, serif;
  font-style: normal;
  font-weight: 600;
  font-size: 28px;
  line-height: 127%;
  /* identical to box height, or 36px */
  letter-spacing: -0.02em;
  font-feature-settings: 'zero';
  color: #000000;
  margin-top: 0;
}
.input {
  &--search {
    background-image: none;
    border-radius: 4px;
    border: rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    color: rgba(0, 0, 0, 0.33);
    display: inline-block;
    font-size: 16px;
    height: 40px;
    line-height: 40px;
    outline: none;
    padding: 0 15px;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    width: 100%;
  }
}
.show-more {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 16px;
  width: 124px;
  height: 36px;
  left: 0;
  right: 0;
  bottom: 0;
  background: #ffffff;
  box-shadow: 3px 9px 32px -4px rgba(0, 0, 0, 0.07);
  border-radius: 56px;
  color: #000000;
  font-weight: 500;
  font-size: 13px;
  position: absolute;
  cursor: pointer;
  margin: 0 auto;
}
.no-result-label {
  font-size: 16px;
  color: rgba(0, 0, 0, 0.667);
  margin-top: 22px;
}
section {
  position: relative;
  padding-bottom: 132px;
}
.loading {
  &__row {
    box-sizing: border-box;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    flex: 0 1 auto;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    margin-top: 29px;
  }
  &__col {
    -webkit-box-flex: 1;
    flex-grow: 1;
    flex-basis: 0;
    max-width: 100%;
    display: flex;
    align-items: center;
    &--justify-center {
      justify-content: center;
    }
    &--justify-end {
      justify-content: end;
    }
  }
  &__avatar {
    width: 32px;
    height: 32px;
    border-radius: 24px;
    display: inline-flex;
    background: linear-gradient(
      90deg,
      $base-color 0px,
      $shine-color 40px,
      $base-color 80px
    );
    background-size: 600px;
    animation: shine-avatar $animation-duration infinite linear;
  }
  &__denom {
    width: 96px;
    height: 22px;
    background: rgba(0, 0, 0, 0.03);
    border-radius: 4px;
    margin-left: 16px;
    display: inline-flex;
    background: linear-gradient(
      90deg,
      $base-color 0px,
      $shine-color 40px,
      $base-color 80px
    );
    background-size: 600px;
    animation: shine-lines $animation-duration infinite linear;
  }
  &__amount {
    width: 96px;
    height: 22px;
    background: rgba(0, 0, 0, 0.03);
    border-radius: 4px;
    margin-left: 16px;
    display: inline-flex;
    background: linear-gradient(
      90deg,
      $base-color 0px,
      $shine-color 40px,
      $base-color 80px
    );
    background-size: 600px;
    animation: shine-lines $animation-duration infinite linear;
  }
  &__ibc {
    width: 64px;
    height: 22px;
    background: rgba(0, 0, 0, 0.03);
    border-radius: 4px;
    margin-left: 16px;
    display: inline-flex;
    background: linear-gradient(
      90deg,
      $base-color 0px,
      $shine-color 40px,
      $base-color 80px
    );
    background-size: 600px;
    animation: shine-lines $animation-duration infinite linear;
  }
}
@keyframes shine-avatar {
  0% {
    background-position: -100px + $avatar-offset;
  }
  40%,
  100% {
    background-position: 140px + $avatar-offset;
  }
}
@keyframes shine-lines {
  0% {
    background-position: -100px;
  }
  40%,
  100% {
    background-position: 140px;
  }
}
.arrow-icon {
  margin-left: 9px;
}
</style>