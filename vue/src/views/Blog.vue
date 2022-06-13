<template>
  <div class="container">
    <div class="row row-sm-revers">
      <div class="row-md-8">
        <CreateBlog />
      </div>
      <div class="col-md-4">
        <ShowBlogList />
      </div>
      <div class="col-md-8">
        <ShowBlog />
      </div>
      
    </div>
  </div>
</template>

<script>
import CreateBlog from '../components/CreateBlog.vue'
import ShowBlog from '../components/ShowBlog.vue'
import ShowBlogList from '../components/ShowBlogList.vue'

export default {
    name: 'Blog',

    components: {CreateBlog,ShowBlog, ShowBlogList },

    setup() {
        // store
        // let $s = useStore()

        // computed
        // let address = computed(() => $s.getters['common/wallet/address'])

        // return {
        //   address
        // }
    }
}
</script>
