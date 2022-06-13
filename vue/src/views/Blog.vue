<template>
  <div class="container">
    <div class="row row-sm-revers">
      <div class="col-md-4">
        <ShowBlogList @sendmsg='getMsg'/>
      </div>
      <div class="col-md-8">
        <ShowBlog :selectBlog='selectBlog'/>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { computed } from 'vue'
import { useStore } from 'vuex'

import ShowBlog from '../components/ShowBlog.vue'
import ShowBlogList from '../components/ShowBlogList.vue'
import { BlogData } from '../components/type/blog'

export default {
  name: 'Blog',

  components: { ShowBlog, ShowBlogList },
  
  data() {
    return {
      data: 'hello',
      info: '',
      selectBlog: [],
    }
  },

  setup() {
    // store
    let $s = useStore()

    // computed
    let address = computed(() => $s.getters['common/wallet/address'])

    return {
      address
    }
  },

  methods: {
    getMsg(data){
      this.info = data
      this.selectBlog = data
    },
  }

}
</script>
