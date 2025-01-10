<template>
  <q-page class="q-pa-md">
    <h1 class="mypage-title">마이페이지</h1>

    <!-- 사용자 프로필 -->
    <div class="profile-card">
      <q-avatar size="100px" class="profile-avatar">
        <img src="https://via.placeholder.com/100" alt="프로필 이미지" />
      </q-avatar>
      <div class="profile-info">
        <h2>{{ userName }}</h2>
        <p>Email: {{ userEmail }}</p>
        <p>가입일: {{ signupDate }}</p>
        <q-btn
          class="profile-edit-button"
          label="프로필 수정"
          flat
          color="primary"
          @click="editProfile"
        />
      </div>
    </div>

    <!-- 설정 메뉴 -->
    <div class="settings-card">
      <h3>설정 메뉴</h3>
      <q-list bordered>
        <q-item clickable @click="changePassword">
          <q-item-section>비밀번호 변경</q-item-section>
        </q-item>
        <q-item clickable @click="toggleTheme">
          <q-item-section>테마 변경 (다크/라이트 모드)</q-item-section>
        </q-item>
        <q-item clickable @click="logout">
          <q-item-section>로그아웃</q-item-section>
        </q-item>
        <q-item clickable @click="deleteAccount">
          <q-item-section class="text-negative">계정 삭제</q-item-section>
        </q-item>
      </q-list>
    </div>

    <!-- 활동 내역 -->
    <div class="activity-card">
      <h3>최근 활동</h3>
      <ul>
        <li v-for="(item, index) in recentActivities" :key="index">
          {{ item }}
        </li>
      </ul>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      userName: 'Soo Yeon',
      userEmail: 'itssoo174@gmail.com',
      signupDate: '2024-01-01',
      recentActivities: ['2025-01-01: 캘린더 일정 추가', '2025-01-03: 할 일 2개 완료'],
    }
  },
  methods: {
    editProfile() {
      this.$q.notify('프로필 수정 기능이 준비 중입니다.')
    },
    changePassword() {
      this.$q.notify('비밀번호 변경 기능이 준비 중입니다.')
    },
    toggleTheme() {
      this.$q.notify('테마 변경 기능이 준비 중입니다.')
    },
    logout() {
      this.$q.notify('로그아웃되었습니다.')
      this.$router.push('/')
    },
    deleteAccount() {
      if (confirm('정말로 계정을 삭제하시겠습니까?')) {
        this.$q.notify('계정이 삭제되었습니다.')
      }
    },
  },
}
</script>

<style scoped>
.mypage-title {
  text-align: center;
  font-size: 30px;
  margin-bottom: 20px;
  font-weight: bold;
}

.profile-card {
  height: 300px;
  display: flex;
  align-items: center;
  justify-items: center;
  gap: 10px;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.profile-info {
  display: flex;
  flex-direction: column;
  font-size: 15px;
}

.profile-edit-button {
  background-color: rgba(170, 170, 170, 0.418);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.settings-card,
.activity-card {
  background-color: white;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 0px;
}
h3 {
  font-size: 20px;
}
</style>
