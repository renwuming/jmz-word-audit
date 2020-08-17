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
      <Button
        v-show="code.content"
        class="handle-btn"
        icon="md-trash"
        type="error"
        shape="circle"
        @click="onDiscard"
      ></Button>
      <Tag class="handle-btn" type="dot" color="warning"
        >剩余 {{ code.amount || '-' }}</Tag
      >
    </div>
    <div class="row info" v-show="code.content">
      <p class="label">贡献者</p>
      <UserInfo :data="code.contributor" />
    </div>
    <Form
      v-show="code.content"
      ref="auditFormRef"
      :model="auditForm"
      :rules="formRule"
      :label-width="80"
    >
      <FormItem label="困难单词" prop="difficult">
        <i-switch v-model="auditForm.difficult" true-color="#ff4949">
        </i-switch>
      </FormItem>
      <FormItem label="类别" prop="category"> </FormItem>
      <CheckboxGroup v-model="auditForm.category" class="check-group">
        <div
          class="row check-item"
          v-for="item of categoryList"
          :key="item._id"
        >
          <Checkbox class="check-box" :label="item.categoryID">{{
            item.category
          }}</Checkbox>
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
      </CheckboxGroup>
      <FormItem>
        <Button type="primary" @click="handleSubmit">
          提交
        </Button>
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
} from '@vue/composition-api'
import axios from '~/plugins/axios'
import UserInfo from '~/components/UserInfo.vue'

export default defineComponent({
  components: {
    UserInfo,
  },
  setup(_, ctx) {
    let code: Ref<Code> = ref({
      content: '',
    })
    let categoryList: Ref<Code[]> = ref([])
    onBeforeMount(async () => {
      onRefresh()
    })

    // 获取一个待审核词汇
    async function onRefresh() {
      categoryList.value = await axios.get('/words/category/list')
      code.value = await axios.get(
        `/words/audit?lastcode=${code.value.content}`
      )
      auditForm.difficult = false
      auditForm.category = []
    }
    // 标记待审核词汇为【丢弃】
    async function onDiscard() {
      ctx.root.$Modal.confirm({
        title: '确定要将该词标记为【丢弃】？',
        onOk: async () => {
          const { _id } = code.value
          await axios.post('/words/audit', {
            _id,
            discarded: true,
          })
          onRefresh()
        },
      })
    }

    let auditFormRef = ref()
    let drawerCategory: Ref<string> = ref('')
    let drawerVisible: Ref<boolean> = ref(false)
    let difficult: Ref<boolean> = ref(false)
    let auditForm: CodeFormData = reactive({
      difficult: false,
      category: [],
    })
    let categoryCodeList: Ref<Code[]> = ref([])

    function onChangeDifficult(value: boolean): void {
      difficult.value = value
    }

    async function onChangeDrawer(categoryID: number): Promise<void> {
      const list = (await axios.get(
        `/words/category/list/${categoryID}`
      )) as Code[]
      categoryCodeList.value = list
      drawerVisible.value = true
    }
    const handleSubmit = (): void => {
      auditFormRef.value.validate(async (valid: boolean) => {
        if (valid) {
          const { _id } = code.value
          if (!_id) {
            ctx.root.$Message.warning('无法提交空数据')
            return
          }
          await axios.post('/words/audit', {
            _id,
            ...auditForm,
          })
          ctx.root.$Message.success('提交成功')
          onRefresh()
        }
      })
    }

    return {
      onRefresh,
      onDiscard,
      onChangeDrawer,
      categoryCodeList,

      categoryList,
      code,
      auditFormRef,
      drawerCategory,
      drawerVisible,
      difficult,
      onChangeDifficult,
      auditForm,
      handleSubmit,
      formRule: {
        category: [
          {
            required: true,
            message: '请选择至少一个类别',
          },
        ],
      },
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
    &.info {
      background-color: #eee;
      padding: rem(10px) 0;
      border-radius: rem(10px);
    }
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
  }
  .check-group {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: rem(-20px);
    margin-bottom: rem(20px);
    .check-item {
      margin-bottom: rem(10px);
      flex-basis: 40%;
    }
    .check-box {
      width: rem(100px);
    }
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
