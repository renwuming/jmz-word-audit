<template>
  <div class="info-box">
    <img :src="userData.avatarUrl" class="avatar" />
    <p v-if="nick" class="nick">{{ userData.nickName }}</p>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'

export default defineComponent({
  props: {
    data: Object,
    nick: {
      type: Boolean,
      default: true,
    },
  },
  setup(prop) {
    const userData = computed(() => prop.data || {})
    return {
      userData,
    }
  },
})
</script>
<style lang="scss" scoped>
.info-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .avatar {
    width: 34px;
    height: 34px;
    border-radius: 40px;
    border: 1px solid #999;
  }
  .nick {
    margin-top: 4px;
    font-size: 12px;
  }
}
</style>
