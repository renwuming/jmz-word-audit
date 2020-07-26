<template>
  <div class="device-badge">
    {{ device }}
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'
import { Store } from '~/store'
import { useDevice } from '../hooks/use-device'

export default defineComponent({
  setup() {
    const device = useDevice()
    return {
      device,
    }
  },
})
</script>
<style scoped>
.device-badge {
  position: fixed;
  z-index: 999;
  display: inline-block;
  top: 0;
  right: 0;
  background: #43a1f9;
  color: #fff;
  padding: 0.5em;
  opacity: 0.8;
  font-size: 0.5em;
}
</style>
