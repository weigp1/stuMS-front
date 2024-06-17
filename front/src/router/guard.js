import { AuthStore } from '../stores/auth'

export function setupRouterGuard(router) {
  createPermissionGuard(router)
}

// 根据 Token 判断能否访问页面
function createPermissionGuard(router) {
  // 路由前置守卫
  router.beforeEach(async (to) => {
    const { token } = AuthStore()
    // 没有 Token
    if (!token) {
      // login 不需要 token 即可访问
      if (['/login'].includes(to.path)) {
        return true
      }
      Elmessage.error('请先登录！')
      // 重定向到登录页, 并且携带 redirect 参数, 登录后自动重定向到原本的目标页面
      return { name: 'Login', query: { ...to.query, redirect: to.path } }
    }

    // 有 Token 的时候无需访问登录页面
    if (to.name === 'Login') {
      Elmessage.success('已登录！')
      return { path: '/' }
    }

    // 能在路由中找到, 则正常访问
    if (router.getRoutes().find(e => e.name === to.name)) {
      return true
    }
  })
}