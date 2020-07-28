<template>
  <div class="container">
    <div class="row center title-row">
      <Tag class="current-word" size="large" color="volcano">蜜蜂</Tag>
      <Button
        class="handle-btn"
        icon="md-refresh"
        type="primary"
        shape="circle"
      ></Button>
      <Button
        class="handle-btn"
        icon="md-trash"
        type="error"
        shape="circle"
      ></Button>
    </div>
    <Form
      ref="auditFormRef"
      :model="auditForm"
      :rules="formRule"
      :label-width="80"
    >
      <FormItem label="困难单词" prop="difficult">
        <i-switch v-model="auditForm.difficult" true-color="#ff4949">
        </i-switch>
      </FormItem>
      <FormItem label="类别" prop="category">
        <CheckboxGroup v-model="auditForm.category">
          <div class="row inline">
            <Checkbox label="0">美食饮品</Checkbox>
            <Icon
              type="ios-information-circle-outline"
              size="20"
              @click="
                () => {
                  onChangeDrawer(0)
                }
              "
            />
          </div>
          <div class="row inline">
            <Checkbox label="1">影视动漫</Checkbox>
            <Icon
              type="ios-information-circle-outline"
              size="20"
              @click="
                () => {
                  onChangeDrawer(1)
                }
              "
            />
          </div>
          <div class="row inline">
            <Checkbox label="2">动物植物</Checkbox>
            <Icon
              type="ios-information-circle-outline"
              size="20"
              @click="
                () => {
                  onChangeDrawer(2)
                }
              "
            />
          </div>
          <div class="row inline">
            <Checkbox label="3">其他名词</Checkbox>
            <Icon
              type="ios-information-circle-outline"
              size="20"
              @click="
                () => {
                  onChangeDrawer(3)
                }
              "
            />
          </div>
        </CheckboxGroup>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit">
          提交
        </Button>
      </FormItem>
    </Form>
    <Drawer :title="drawerCategory" :closable="false" v-model="drawerVisible">
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
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

interface FormData {
  difficult: boolean
  category: string[]
}

export default defineComponent({
  setup(_, ctx) {
    onBeforeMount(async () => {
      console.log(await axios.get('/words/audit'))
    })

    let auditFormRef = ref()
    let drawerCategory: Ref<string> = ref('')
    let drawerVisible: Ref<boolean> = ref(false)
    let difficult: Ref<boolean> = ref(false)
    let auditForm: FormData = reactive({
      difficult: false,
      category: [],
    })

    function onChangeDifficult(value: boolean): void {
      difficult.value = value
    }

    function onChangeDrawer(category: number): void {
      drawerVisible.value = true
    }
    const handleSubmit = (): void => {
      auditFormRef.value.validate((valid: boolean) => {
        if (valid) {
          ctx.root.$Message.success('提交成功')
        } else {
          ctx.root.$Message.error('提交失败')
        }
      })
    }

    return {
      auditFormRef,
      drawerCategory,
      drawerVisible,
      onChangeDrawer,
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
    &.inline {
      margin-bottom: 0;
    }
    &.center {
      justify-content: center;
    }
    &.title-row {
      margin-bottom: rem(50px);
    }
  }
  .handle-btn {
    margin-left: rem(10px);
  }
  .current-word {
    font-size: rem(26px);
    line-height: rem(40px);
    height: rem(40px);
    padding: 0 rem(14px);
  }
}
</style>
