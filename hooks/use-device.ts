import { computed } from '@vue/composition-api'
import { Store } from '@/store'

export function useDevice() {
  const device = computed(() => Store.device)
  return device
}
