<template>
  <q-layout view="hHh lpR fFf">
    <!-- Header -->
    <q-header elevated>
      <q-toolbar>
        <q-btn flat round icon="menu" />
        <q-toolbar-title>일정 관리</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <!-- Main Content -->
    <q-page-container>
      <q-page>
        <!-- FullCalendar -->
        <FullCalendar
          :plugins="[dayGridPlugin, interactionPlugin]"
          :initialView="'dayGridMonth'"
          :events="events"
          @dateClick="handleDateClick"
          @eventClick="handleEventClick"
        />
      </q-page>
    </q-page-container>

    <!-- Footer / Additional Area -->
    <div class="w-100 h-200 bg-blue">하이하이</div>
  </q-layout>
</template>

<script></script>
