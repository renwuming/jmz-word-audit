<template>
  <div class="page-container">
    <Main />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'
import Main from '~/sections/index/main.vue'

export default defineComponent({
  components: {
    Main,
  },
})
</script>

<style lang="scss" scoped>
.page-container {
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
