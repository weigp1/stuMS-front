const Layout = () => import('@/layout/index.vue')

export default {
  name: 'User',
  path: '/user',
  component: Layout,
  // isHidden: userStore.role === 1 ? true : false,
  redirect: '/user/list',
  meta: {
    title: '后台用户管理',
    icon: 'ph:user-list-bold',
    order: 3,
    // role: ['admin'],
    // requireAuth: true,
  },
  children: [
    {
      name: 'userList',
      path: 'list',
      component: () => import('./list/index.vue'),
      meta: {
        title: '用户列表',
        icon: 'mdi:account',
        keepAlive: true,
      },
    },
  ],
}
