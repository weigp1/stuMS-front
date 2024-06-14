import { defineStore } from 'pinia'
import { convertImgUrl } from '@/utils'
import api from '@/api'

// 用户全局变量
export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: {
      SID: null, // 学生学号或教师工号
      name: '', // 姓名
      role: '', // 身份（班长/班主任/管理员）
      grade: '', // 年级（管理员为空）
      class: '', // 班级（管理员为空）
    },
  }),
  // state: () => ({
  //   userInfo: {
  //     id: null,
  //     nickname: '',
  //     avatar: '',
  //     intro: '',
  //     website: '',
  //     // roles: [], // TODO: 后端返回 roles
  //   },
  // }),
  // 包含了几个方法，这些方法返回 state 中 userInfo 对象的各个属性
  // 可以在多个组件中重用这些 getter，如this.$store.getters.userId
  getters: {
    SID: state => state.userInfo.SID, // 学生学号或教师工号
    name: state => state.userInfo.name, // 姓名
    role: state => state.userInfo.role, // 身份（班长/班主任/管理员）
    grade: state => state.userInfo.grade, // 年级（管理员为空）
    class: state => state.userInfo.class, // 班级（管理员为空）
},
  // getters: {
  //   userId: state => state.userInfo.id,
  //   nickname: state => state.userInfo.nickname,
  //   intro: state => state.userInfo.intro,
  //   website: state => state.userInfo.website,
  //   avatar: state => convertImgUrl(state.userInfo.avatar),
  //   // roles: state => state.userInfo.roles,
  // },
  actions: {
    async getUserInfo() {
      try {
        const resp = await api.getUserInfo()
        this.userInfo = resp.data
        return Promise.resolve(resp.data)
      }
      catch (err) {
        return Promise.reject(err)
      }
    },
  },
})
