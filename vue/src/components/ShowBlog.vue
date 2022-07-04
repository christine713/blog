<template>
  <table class="assets-table">
    <div v-if="selectBlog.body">
      <tbody>
        <div class="title">{{ selectBlog.title }}</div>
        <tr>posted by: {{ selectBlog.creator }}</tr>
        <tr>created at: {{ selectBlog.createdAtDate }} {{ selectBlog.createdAtTime }}</tr>
        <tr>weather: {{ selectBlog.weather }}</tr>
        <tr class="assets-table__context">{{ selectBlog.body }}</tr>
      </tbody>
    </div>
    <div v-else>
      <tr class="assets-table__row">
        <td class="assets-table__row--no-results">
          <p>Try again with another search</p>
        </td>
      </tr>
    </div>
  </table>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { BlogData } from './type/blog'

export default defineComponent({
  name: 'ShowBlog',

  props: {
    selectBlog:{
      type: Object as PropType<BlogData>,
      default: []
    }
  },

  setup() {
  }
})

</script>

<style lang="scss" scoped>
$base-color: rgba(0, 0, 0, 0.03);
$animation-duration: 1.6s;
$shine-color: rgba(0, 0, 0, 0.06);
$avatar-offset: 32 + 16;
.assets-table {
  width: 100%;
  &__context {
    font-size: 19px;
    color: #000;
  }
  &__row {
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