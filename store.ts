import Vue from 'vue'

export interface IStore {
  development: boolean
  device: 'mobile' | 'tablet' | 'desktop' // 手机 | 平板电脑 | pc
}

export const Store = Vue.observable<IStore>({
  development: false,
  device: 'mobile',
})
