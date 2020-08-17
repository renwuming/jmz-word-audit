<template>
  <div class="container">
    <div class="row">
      <Tag class="handle-btn" type="dot" color="warning"
        >总计 {{ list.length }}</Tag
      >
    </div>
    <Button
      v-for="item of list"
      :key="item._id"
      @click="
        () => {
          reaudit(item)
        }
      "
      type="dashed"
      class="discard-word"
      >{{ item.content }}
    </Button>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  Ref,
  ref,
  computed,
  onBeforeMount,
} from '@vue/composition-api'
import { Store } from '~/store'
import axios from '~/plugins/axios'

export default defineComponent({
  setup(_, ctx) {
    let list: Ref<Code[]> = ref([])

    onBeforeMount(async () => {
      onRefresh()
    })

    async function onRefresh() {
      list.value = await axios.get('/words/discard/list')
    }

    async function reaudit(code: Code) {
      const { isSuperAuditor } = Store
      if (!isSuperAuditor) return
      ctx.root.$Modal.confirm({
        title: '重新审核该词汇？',
        onOk: async () => {
          const { _id } = code
          await axios.post('/words/confirm/reaudit', { _id })
          onRefresh()
        },
      })
    }

    return {
      list,
      reaudit,
    }
  },
})
</script>

<style lang="scss" scoped>
.container {
  padding: rem(20px);
  .row {
    display: flex;
    align-items: center;
    margin-bottom: rem(20px);
  }
  .discard-word {
    margin-right: rem(10px);
    margin-bottom: rem(10px);
  }
}
</style>
