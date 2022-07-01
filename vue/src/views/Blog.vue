<template>
  <div class="container">
    <div class="row row-sm-revers">
      <div class="col-md-4">
        <ShowBlogList @sendMsgFromShowBlogList='getMsgFromShowBlogList' :refreshReq='refresh'/>
      </div>
      <div class="col-md-8">
        <div v-if="isOpenCreateBlog==true">
          <CreateBlog  @sendMsgFromCreateBlog='getMsgFromCreateBlog'/>
        </div>
        <div v-else>
          <ShowBlog :selectBlog='selectBlog'/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import CreateBlog from '../components/CreateBlog.vue'
import ShowBlog from '../components/ShowBlog.vue'
import ShowBlogList from '../components/ShowBlogList.vue'

export default {
  name: 'Blog',

  components: { ShowBlog, ShowBlogList, CreateBlog },

  setup() {
    // store
    let $s = useStore()

    // computed
    let address = computed(() => $s.getters['common/wallet/address'])
    
    // data
    const refresh = ref(0)
    const selectBlog = ref([])
    const isOpenCreateBlog = ref(false)

    // method
    let getMsgFromShowBlogList = (data): void => {
      if(data == 'createPost'){
        isOpenCreateBlog.value = true
      }else{
        isOpenCreateBlog.value = false
        selectBlog.value = data
      }
    }

    let getMsgFromCreateBlog = (): void => {
      refresh.value += 1
    }

    return {
      address,
      refresh, 
      selectBlog, 
      isOpenCreateBlog,
      getMsgFromShowBlogList, 
      getMsgFromCreateBlog
    }
  },

}
</script>
