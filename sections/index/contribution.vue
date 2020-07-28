<template>
  <div class="container">贡献者：{{ nickName }}</div>
</template>
<script lang="ts">
import { defineComponent, Ref, ref } from '@vue/composition-api'
import { Store } from '~/store'

export default defineComponent({
  setup() {
    return {
      nickName: Store.nickName,
    }
  },
})
</script>

<style lang="scss" scoped>
.container {
  padding: rem(20px);
}
</style>
