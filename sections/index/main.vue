<template>
  <div class="container">
    开放生态
    <Button>test</Button>
    <Dropdown>
      <a href="javascript:void(0)">
        hover 触发
        <Icon type="ios-arrow-down"></Icon>
      </a>
      <DropdownMenu slot="list">
        <DropdownItem>驴打滚</DropdownItem>
        <DropdownItem>炸酱面</DropdownItem>
        <DropdownItem>豆汁儿</DropdownItem>
        <DropdownItem>冰糖葫芦</DropdownItem>
        <DropdownItem>北京烤鸭</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  setup() {},
})
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  width: 100vw;
}
</style>
