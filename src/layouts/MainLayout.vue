<template>
  <q-layout view="hHh lpR fFf">
    <!-- Header -->
    <q-header elevated>
      <q-toolbar>
        <q-btn flat round icon="menu" @click="toggleLeftDrawer" aria-label="Menu" />
        <q-toolbar-title>일정 관리 시스템</q-toolbar-title>

        <!-- Tab Navigation -->
        <q-tabs align="right">
          <q-route-tab to="/" label="Home" icon="home" />
          <q-route-tab to="/calendar" label="Calendar" icon="event" />
          <q-route-tab to="/mypage" label="My Page" icon="person" />
        </q-tabs>
      </q-toolbar>
    </q-header>

    <!-- Left Drawer (optional menu) -->
    <q-drawer v-model="leftDrawerOpen" show-if-above>
      <q-list>
        <q-item clickable v-ripple to="/" tag="router-link">
          <q-item-section>Home</q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/calendar" tag="router-link">
          <q-item-section>Calendar</q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/mypage" tag="router-link">
          <q-item-section>My Page</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <!-- Main Page Container -->
    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- Footer -->
    <q-footer class="bg-grey-8 text-white">
      <div class="text-center q-pa-sm">© 2025 My Todo App</div>
    </q-footer>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',
  data() {
    return {
      leftDrawerOpen: false, // 사이드 메뉴 드로어 상태
    }
  },
  methods: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen
    },
  },
}
</script>

<style scoped>
.q-toolbar-title {
  font-size: 22px;
  font-weight: bold;
}
</style>
