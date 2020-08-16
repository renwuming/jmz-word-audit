<template>
  <div class="container">贡献者：{{ nickName }}</div>
</template>
<script lang="ts">
import { defineComponent, Ref, ref, computed } from '@vue/composition-api'
import { Store } from '~/store'

export default defineComponent({
  setup() {
    const nickName = computed(() => Store.userInfo.nickName)
    return {
      nickName,
    }
  },
})
</script>

<style lang="scss" scoped>
.container {
  padding: rem(20px);
}
</style>
