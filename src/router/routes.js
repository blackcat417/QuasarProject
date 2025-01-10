const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Home.vue'), name: 'home' }, // 홈
      { path: 'calendar', component: () => import('pages/Calendar.vue'), name: 'calendar' }, // 캘린더
      { path: 'mypage', component: () => import('pages/MyPage.vue'), name: 'mypage' }, // 마이페이지
    ],
  },
  // {
  //   path: '/:catchAll(.*)*',
  //   component: () => import('pages/ErrorNotFound.vue'),
  // },
]

export default routes
