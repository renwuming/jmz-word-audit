<template>
  <div class="container">
    <div class="row center title-row">
      <Tag class="current-word" size="large" color="volcano">{{
        code.content || '-'
      }}</Tag>
      <Button
        class="handle-btn"
        icon="md-refresh"
        type="primary"
        shape="circle"
        @click="onRefresh"
      ></Button>
      <Tag class="handle-btn" type="dot" color="warning"
        >剩余 {{ code.amount || '-' }}</Tag
      >
    </div>
    <div class="info" v-show="code.content">
      <div class="row">
        <p class="label">贡献者</p>
        <UserInfo :data="code.contributor" />
        <p class="label">审核者</p>
        <UserInfo :data="code.auditor" />
      </div>
      <div v-if="code.similar && code.similar.length > 0" class="row">
        <p class="label">词库相似</p>
        <Tag
          v-for="item of code.similar"
          :key="item._id"
          size="large"
          :color="item.confirm ? 'success' : 'volcano'"
          >{{ item.content }}</Tag
        >
      </div>
    </div>
    <Form v-show="code.content" :label-width="80">
      <FormItem label="困难单词" prop="difficult">
        <div v-if="code.difficult">
          <Icon type="md-checkmark" color="red" size="20" />
          <Icon type="md-checkmark" color="red" size="20" />
          <Icon type="md-checkmark" color="red" size="20" />
          <Icon type="md-checkmark" color="red" size="20" />
        </div>
        <Icon v-else type="md-close" size="20" />
      </FormItem>
      <FormItem label="类别" prop="category">
        <div
          v-for="item of code.category"
          :key="item.category"
          class="row inline"
        >
          <label class="ivu-form-item-content category-item">{{
            item.category
          }}</label>
          <Icon
            type="ios-information-circle-outline"
            size="20"
            @click="
              () => {
                onChangeDrawer(item.categoryID)
              }
            "
          />
        </div>
      </FormItem>
      <FormItem>
        <div class="row inline">
          <Button type="info" @click="handleAgree" class="submit-btn">
            赞同
          </Button>
          <UserInfo
            class="user-list-item"
            v-for="item of code.agreeList"
            :key="item.avatarUrl"
            :data="item"
            :nick="false"
          />
        </div>
      </FormItem>
      <FormItem>
        <div class="row inline">
          <Button type="warning" @click="handleOppose" class="submit-btn">
            反对
          </Button>
          <UserInfo
            v-for="item of code.opposeList"
            :key="item.avatarUrl"
            :data="item"
            :nick="false"
          />
        </div>
      </FormItem>
      <FormItem v-if="isSuperAuditor">
        <div class="row inline">
          <Button type="success" @click="handleConfirm" class="submit-btn">
            加入词库
          </Button>
        </div>
      </FormItem>
      <FormItem v-if="isSuperAuditor">
        <div class="row inline">
          <Button type="error" @click="handleReaudit" class="submit-btn">
            重新审核
          </Button>
        </div>
      </FormItem>
    </Form>

    <Drawer :title="drawerCategory" :closable="false" v-model="drawerVisible">
      <Tag
        v-for="item of categoryCodeList"
        :key="item._id"
        size="large"
        color="volcano"
        >{{ item.content }}</Tag
      >
    </Drawer>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  Ref,
  ref,
  reactive,
  onBeforeMount,
  computed,
} from '@vue/composition-api'
import axios from '~/plugins/axios'
import UserInfo from '~/components/UserInfo.vue'
import { Store } from '~/store'

export default defineComponent({
  components: { UserInfo },
  setup() {
    let categoryCodeList: Ref<Code[]> = ref([])
    let code: Ref<Code> = ref({
      content: '',
    })
    onBeforeMount(async () => {
      onRefresh()
    })
    let drawerCategory: Ref<string> = ref('')
    let drawerVisible: Ref<boolean> = ref(false)
    const isSuperAuditor: Ref<boolean> = computed(() => Store.isSuperAuditor)

    // 获取一个词汇
    async function onRefresh() {
      code.value = await axios.get(
        `/words/confirm?lastcode=${code.value.content}`
      )
    }

    async function onChangeDrawer(categoryID: number): Promise<void> {
      const list = (await axios.get(
        `/words/category/list/${categoryID}`
      )) as Code[]
      categoryCodeList.value = list
      drawerVisible.value = true
    }

    // 赞同
    async function handleAgree() {
      const { _id } = code.value
      await axios.post('/words/confirm/agree', { _id })
      onRefresh()
    }
    // 反对
    async function handleOppose() {
      const { _id } = code.value
      await axios.post('/words/confirm/oppose', { _id })
      onRefresh()
    }

    // 加入词库
    async function handleConfirm() {
      const { _id } = code.value
      await axios.post('/words/confirm', { _id })
      onRefresh()
    }

    // 重新审核
    async function handleReaudit() {
      const { _id } = code.value
      await axios.post('/words/confirm/reaudit', { _id })
      onRefresh()
    }

    return {
      categoryCodeList,
      isSuperAuditor,
      code,
      onRefresh,
      onChangeDrawer,
      drawerVisible,
      drawerCategory,
      handleAgree,
      handleOppose,
      handleConfirm,
      handleReaudit,
    }
  },
})
</script>
<style lang="scss" scoped>
.container {
  padding: rem(20px);
  .row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-bottom: rem(20px);
    &.inline {
      margin-bottom: 0;
    }
    &.center {
      justify-content: center;
    }
    &.title-row {
      margin-bottom: rem(30px);
    }
    .label {
      width: 80px;
      text-align: right;
      vertical-align: middle;
      float: left;
      font-size: 14px;
      color: #515a6e;
      line-height: 1;
      padding: 10px 12px 10px 0;
      box-sizing: border-box;
    }
    .submit-btn {
      margin-right: rem(30px);
    }
    .user-list-item {
      margin-right: rem(-6px);
    }
  }
  .info {
    background-color: #eee;
    padding: rem(10px) 0;
    border-radius: rem(10px);
    .row {
      margin-bottom: rem(10px);
      padding: 0 rem(10px);
    }
    .row:last-child {
      margin-bottom: 0;
    }
  }
  .category-item {
    margin-right: rem(10px);
    width: rem(80px);
  }
  .handle-btn {
    margin-left: rem(10px);
  }
  .current-word {
    font-size: 26px;
    line-height: rem(40px);
    height: rem(40px);
    padding: 0 rem(14px);
  }
}
</style>
