<template>
  <div class="container">
    <Menu
      mode="horizontal"
      theme="light"
      active-name="audit"
      class="menu"
      @on-select="onChangeMenu"
    >
      <MenuItem name="audit">
        <Icon type="md-pizza" />
        待审核
      </MenuItem>
      <MenuItem name="database">
        <Icon type="logo-buffer" />
        待入库
      </MenuItem>
      <MenuItem name="discard">
        <Icon type="md-trash" />
        已丢弃
      </MenuItem>
      <MenuItem name="contribution">
        <Icon type="ios-ribbon" />
        贡献榜
      </MenuItem>
    </Menu>
    <div v-if="menuName === 'audit'">
      <AuditBox />
    </div>
    <div v-if="menuName === 'database'">
      <Confirm />
    </div>
    <div v-if="menuName === 'discard'">
      <Discard />
    </div>
    <div v-if="menuName === 'contribution'">
      <Contribution />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, Ref, ref, onBeforeMount } from '@vue/composition-api'
import { Store } from '~/store'
import AuditBox from './audit.vue'
import Contribution from './contribution.vue'
import Confirm from './confirm.vue'
import Discard from './discard.vue'
import axios from '~/plugins/axios'

export default defineComponent({
  components: {
    AuditBox,
    Confirm,
    Contribution,
    Discard,
  },
  setup() {
    onBeforeMount(async () => {
      // 获取用户基本信息
      const { userInfo, isSuperAuditor } = await axios.post(
        '/users/pc/validate'
      )
      Store.userInfo = userInfo
      Store.isSuperAuditor = isSuperAuditor
    })

    let menuName: Ref<string> = ref('audit')

    function onChangeMenu(name: string): void {
      menuName.value = name
    }

    return {
      menuName,
      onChangeMenu,
    }
  },
})
</script>

<style lang="scss" scoped>
.container {
  width: 100vw;
  .menu {
    display: flex;
    justify-content: space-between;
  }
}
</style>
