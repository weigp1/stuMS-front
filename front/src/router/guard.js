import { AuthStore } from '../stores/auth'
import { ElMessage } from "element-plus"

export function setupRouterGuard(router) {
  createPermissionGuard(router)
}

// 根据 Token 判断能否访问页面
function createPermissionGuard(router) {
  // 路由前置守卫
  router.beforeEach(async (to) => {
    const { token } = AuthStore()
    if(token)
    {
      if (to.path === '/login') {
        ElMessage.success('已登录！')
        return { path: '/' }
      }
      // 能在路由中找到, 则正常访问
      if (router.getRoutes().find(e => e.path === to.path)) {
        return true
      }
    }
    // 没有 Token
    else{
      // login 不需要 token 即可访问
      if (['/login'].includes(to.path)) {
        return true
      }
      else if (['/plan'].includes(to.path)) {
        return true
      }
      else
      {
        ElMessage.error('请先登录！')
        // 重定向到登录页, 并且携带 redirect 参数, 登录后自动重定向到原本的目标页面
        return { path: '/login', query: { ...to.query, redirect: to.path} }
      }
    }
  })
}