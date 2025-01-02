<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>일정 관리 Calendar</q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <Calendar />
    </q-page-container>
  </q-layout>
</template>

<script>
import Calendar from './pages/Calendar.vue'

export default {
  components: {
    Calendar,
  },
}
</script>
