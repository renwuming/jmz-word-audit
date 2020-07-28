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
      <MenuItem name="contribution">
        <Icon type="ios-ribbon" />
        贡献榜
      </MenuItem>
    </Menu>
    <div v-show="menuName === 'audit'">
      <AuditBox />
    </div>
    <div v-show="menuName === 'database'">
      <Tag>待入库</Tag>
    </div>
    <div v-show="menuName === 'contribution'">
      <Tag>贡献榜</Tag>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, Ref, ref } from '@vue/composition-api'
import AuditBox from './audit.vue'

export default defineComponent({
  components: {
    AuditBox,
  },
  setup() {
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
  min-height: 100vh;
  .menu {
    display: flex;
    justify-content: space-between;
  }
}
</style>
