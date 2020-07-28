<template>
  <div>
    <DeviceBadge v-if="isDevelopment" />
    <Nuxt />
  </div>
</template>
<script lang="ts">
import { defineComponent, onUnmounted, computed } from '@vue/composition-api'
import ResizeObserver from 'resize-observer-polyfill'
import { Store } from '~/store'
import DeviceBadge from '~/components/DeviceBadge.vue'
import 'normalize.css'

export default defineComponent({
  components: {
    DeviceBadge,
  },
  setup(_, ctx) {
    if (process.client) {
      // 监听文档宽度
      const observer = new ResizeObserver((entires) => {
        const { width } = entires[0].contentRect
        document.documentElement.classList.remove(Store.device)
        if (width <= 768) {
          Store.device = 'mobile'
        } else if (width > 768 && width <= 1024) {
          Store.device = 'tablet'
        } else if (width > 1024) {
          Store.device = 'desktop'
        }
        document.documentElement.classList.add(Store.device)
      })
      observer.observe(document.body)

      onUnmounted(() => {
        observer.disconnect()
      })
    }

    // 是否为开发环境
    Store.development = process.env.NODE_ENV === 'development'

    return {
      isDevelopment: Store.development,
      device: Store.device,
    }
  },
})
</script>

<style></style>
