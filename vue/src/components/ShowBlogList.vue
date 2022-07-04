<template>
  <div class="tx-list">
    <div class="title">Blog List</div>
    <div>
      <table width="100%" style="table-layout:fixed">
        <td class="assets-table">
          <SpButton :disabled="!address" @click="sendCreatePost">Create Post</SpButton>
        </td>
      </table>
    </div>
    <table class="assets-table">
      <tbody v-if="blogData">
        <tr
          v-for="(blog, index) in blogData" class="assets-table__row"
          @click="sendShowBlog(index)"
        >
          <tr>
            <td>
              <tr>{{ blog.title }}</tr>
              <tr>{{ blog.shorCreator }}</tr>
            </td>
            <td >
              <tr>{{ blog.createdAtDate }}</tr>
              <tr>{{ blog.createdAtTime }}</tr>
            </td>
          </tr>
          <div class="bottom-divider"></div>
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
import { defineComponent, ref, toRef, watch } from 'vue'
import { useStore } from 'vuex'
import { SpButton } from '@starport/vue'

import axios from 'axios'

import { useAddress } from '@starport/vue/src/composables'
import { BlogData } from './type/blog'

export default defineComponent({
  name: 'ShowBlogList',

  components: { SpButton },

  props: {
    url: {
      type: String,
      default: 'http://localhost:1317/cosmonaut/blog/blog/posts',
    },
    data: {
      type: String,
      default: 'default',
    },
    refreshReq:{
      type: Number,
      default: 0,
    },
  },
  
  setup(props, {emit}) {
    let $s = useStore()

    // composables
    let { address } = useAddress({ $s })

    // data
    const blogData = ref([] as BlogData[])
    const refreshReq = toRef(props, 'refreshReq')

    // method
    let getBlogData = (): void => {
      blogData.value = []
      
      axios.get(props.url)
      .then((res) => {
        const blogRow = res.data.Post
        for(var index in blogRow){
          let weather = blogRow[index].weather.split(" ")

          const data: BlogData = {
            creator: blogRow[index].creator,
            shorCreator: blogRow[index].creator.substring(0, 10) + '...' + blogRow[index].creator.slice(-4),
            id: blogRow[index].id,
            title: blogRow[index].title,
            body: blogRow[index].body,
            weather: weather[0],
            createdAtDate: weather[1],
            createdAtTime: weather[2],
          }

          blogData.value.push(data)
        }

        blogData.value.reverse()
      })
      .catch((error) => {
        throw new Error(error)
      })
    }

    let callApi = (): void => {
      getBlogData()
    }

    let sendCreatePost = (): void => {
      emit('sendMsgFromShowBlogList', 'createPost')
    }

    let sendShowBlog = (index: number): void => {
      emit('sendMsgFromShowBlogList', blogData.value[index])
    }

    let reverse = (data: BlogData[]): Array<BlogData> => {
      return data.reverse()
    }

    // computed
    getBlogData()

    // watch
    watch(
      () => refreshReq.value,
      async () => {
        getBlogData()
      }
    )

    return { address, blogData, callApi, sendCreatePost, sendShowBlog, reverse }
  },
})
</script>

<style lang="scss" scoped>
$base-color: rgba(0, 0, 0, 0.03);
$animation-duration: 1.6s;
$shine-color: rgba(0, 0, 0, 0.06);
$avatar-offset: 32 + 16;
.assets-table {
  width: 100%;
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

.bottom-divider {
  position: relative;
  margin: 0 auto;
  width: 100%;
  height: 1px;
  background-color: #d4d4d4;
  text-align: center;
  font-size: 16px;
  color: rgba(101, 101, 101, 1);
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
</style>