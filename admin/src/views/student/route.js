const Layout = () => import('@/layout/index.vue')

export default {
  name: 'Student',
  path: '/student',
  component: Layout,
  redirect: '/student/list',
  meta: {
    title: '学生管理',
    icon: 'ph:user-list-bold',
    order: 1,
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
    {
      name: 'StudentInfo',
      path: 'user:sid',
      isHidden: true,
      component: () => import('./info/index.vue'),
      meta: {
        title: '学生信息',
        icon: 'mdi:account',
        keepAlive: true,
      },
    },
  ],
}
