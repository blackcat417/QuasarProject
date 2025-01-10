<template>
  <q-page class="q-pa-md">
    <h1 class="welcome-title">환영합니다, Soo님!</h1>
    <p class="date-text">{{ currentDate }}</p>

    <!-- 오늘의 일정 요약 -->
    <div class="summary-card">
      <h2>오늘의 할 일</h2>
      <ul>
        <li>남은 할 일: {{ todoCount.left }}개</li>
        <li>완료한 할 일: {{ todoCount.completed }}개</li>
        <li>전체 일정: {{ todoCount.total }}개</li>
      </ul>
      <q-btn label="할 일 추가하기" color="primary" @click="goToTodo" />
    </div>

    <!-- 주요 메뉴 바로가기 -->
    <!-- <div class="menu-links">
      <q-btn label="캘린더 보기" icon="event" flat to="/calendar" />
      <q-btn label="마이페이지" icon="account_circle" flat to="/mypage" />
    </div> -->

    <!-- 공지사항 및 업데이트 -->
    <div class="notice-card">
      <h3>공지사항</h3>
      <p>할 일 관리 앱이 업데이트되었습니다! 새로운 기능을 확인해 보세요.</p>
      <q-btn label="자세히 보기" flat />
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      currentDate: new Date().toLocaleDateString(),
      todoCount: {
        left: 3,
        completed: 2,
        total: 5,
      },
    }
  },
  methods: {
    goToTodo() {
      this.$router.push('/todo')
    },
  },
}
</script>

<style scoped>
.welcome-title {
  font-size: 24px;
  font-weight: bold;
}

.date-text {
  margin-bottom: 20px;
  color: gray;
}

.summary-card,
.notice-card {
  background-color: white;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.menu-links {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-bottom: 20px;
}
</style>
