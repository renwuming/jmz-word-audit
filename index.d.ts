interface User {
  nickName?: string
  avatarUrl?: string
}

interface CodeFormData {
  difficult: boolean
  category: string[]
}

interface Code {
  _id?: string // 词条ID
  content: string // 词条内容
  category?: string[] // 类别ID数组
  difficult?: boolean // 是否困难
  contributor?: string // 贡献者ID
  auditor?: string // 审核者ID
  inDatabase?: boolean // 是否入库
}
