const Layout = () => import('@/layout/index.vue')

export default {
  name: 'Student',
  path: '/student',
  component: Layout,
  redirect: '/student/list',
  meta: {
    title: '学生管理',
    icon: 'ph:user-list-bold',
    order: 5,
    // role: ['admin'],
    // requireAuth: true,
  },
  children: [
    {
      name: 'StudentList',
      path: 'list',
      component: () => import('./list/index.vue'),
      meta: {
        title: '学生列表',
        icon: 'mdi:account',
        keepAlive: true,
      },
    },
    // {
    //   name: 'OnlineUserList',
    //   path: 'online',
    //   component: () => import('./online/index.vue'),
    //   meta: {
    //     title: '在线用户',
    //     icon: 'ic:outline-online-prediction',
    //     keepAlive: true,
    //   },
    // },
  ],
}
