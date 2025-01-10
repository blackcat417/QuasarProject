<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>일정 관리</q-toolbar-title>
        <!-- 탭 메뉴 -->
        <q-tabs v-model="currentTab" class="text-white" align="right" indicator-color="accent">
          <q-tab name="home" label="Home" icon="home" />
          <q-tab name="calendar" label="Calendar" icon="event" />
          <q-tab name="mypage" label="My Page" icon="person" />
        </q-tabs>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <!-- 조건부 렌더링을 통해 페이지 전환 -->
      <Home v-if="currentTab === 'home'" />
      <Calendar v-if="currentTab === 'calendar'" />
      <MyPage v-if="currentTab === 'mypage'" />
    </q-page-container>
  </q-layout>
</template>

<script>
import Home from './pages/Home.vue'
import Calendar from './pages/Calendar.vue'
import MyPage from './pages/MyPage.vue'

export default {
  data() {
    return {
      currentTab: 'calendar', // 기본으로 calendar 탭 활성화
    }
  },
  components: {
    Home,
    Calendar,
    MyPage,
  },
}
</script>

<style>
body,
html {
  overflow: hidden; /* 스크롤 막기 */
  height: 100%;
}
.q-tabs {
  width: 50%;
}
.q-tab {
  font-size: 16px;
  font-weight: bold;
}
</style>
