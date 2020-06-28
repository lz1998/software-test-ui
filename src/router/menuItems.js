let menuItems=[
    {
        name: '测试管理',
        path: '/testManage',
        icon: 'mood',
        component: () => import('@/views/testManage/testManage.vue'),
    },
    // {
    //     name: '状态查询',
    //     path: '/status',
    //     icon: 'mood',
    //     component: () => import('@/views/status/status.vue'),
    // },
    // {
    //     name: '开关管理',
    //     path: '/switchManage',
    //     icon: 'offline_pin',
    //     component: () => import('@/views/switchManage/switchManage.vue'),
    // },
    // {
    //     name: '学习管理',
    //     path: '/learnManage',
    //     icon: 'chrome_reader_mode',
    //     component: () => import('@/views/learnManage/learnManage.vue'),
    // },
    // {
    //     name: '欢迎管理',
    //     path: '/welcomeManage',
    //     icon: 'pan_tool',
    //     component: () => import('@/views/welcomeManage/welcomeManage.vue'),
    // },
]
export default menuItems
