import Vue from 'vue'

export interface IStore {
  development: boolean
  device: 'mobile' | 'tablet' | 'desktop' // 手机 | 平板电脑 | pc
  isSuperAuditor: boolean
  userInfo: User
}

export const Store = Vue.observable<IStore>({
  development: false,
  device: 'mobile',
  isSuperAuditor: false,
  userInfo: {},
})
