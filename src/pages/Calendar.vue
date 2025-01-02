<template>
  <div class="page-container">
    <!-- 달력 영역 -->
    <div class="calendar">
      <!-- 헤더 -->
      <div class="calendar-header">
        <q-btn flat round icon="chevron_left" @click="prevMonth" />
        <div class="calendar-title">{{ currentYear }}년 {{ currentMonth + 1 }}월</div>
        <q-btn flat round icon="chevron_right" @click="nextMonth" />
      </div>

      <!-- 요일 -->
      <div class="calendar-days">
        <div v-for="day in days" :key="day" class="calendar-day">{{ day }}</div>
      </div>

      <!-- 날짜 -->
      <div class="calendar-dates">
        <div
          v-for="date in calendarDates"
          :key="date.key"
          :class="[
            'calendar-date',
            { 'is-today': date.isToday, 'is-other-month': !date.isCurrentMonth },
          ]"
          @click="selectDate(date)"
        >
          {{ date.day }}
          <!-- 일정이 있는 날에 점 표시 -->
          <div class="event-dots">
            <span v-for="n in Math.min(5, getTodoCount(date))" :key="n" class="event-dot"></span>
          </div>
        </div>
      </div>
    </div>

    <!-- To-Do 영역 -->
    <div class="todo-container">
      <h3>{{ selectedDateText }}</h3>
      <div class="add-todo">
        <input v-model="newTodo" placeholder="새 일정 추가" />
        <input v-model="newTodoTime" type="time" placeholder="시간 선택" class="time-input" />
        <button @click="addTodo">추가</button>
      </div>
      <div v-if="todos[selectedDateText] && todos[selectedDateText].length">
        <ul>
          <li v-for="(todo, index) in todos[selectedDateText]" :key="index" class="todo-item">
            <span class="todo-time">{{ todo.time }}</span>
            <span class="todo-task">{{ todo.task }}</span>
            <button class="remove-btn" @click="removeTodo(selectedDateText, index)">삭제</button>
          </li>
        </ul>
      </div>
      <div v-else>
        <p>등록된 일정이 없습니다.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      days: ['일', '월', '화', '수', '목', '금', '토'],
      currentDate: new Date(),
      selectedDate: null,
      todos: {}, // { 날짜: ["일정1", "일정2"] }
      newTodo: '', // 새로운 일정 입력값
      newTodoTime: '', // 새로운 일정 시간
    }
  },
  computed: {
    currentYear() {
      return this.currentDate.getFullYear()
    },
    currentMonth() {
      return this.currentDate.getMonth()
    },
    calendarDates() {
      const year = this.currentYear
      const month = this.currentMonth

      const firstDay = new Date(year, month, 1)
      const lastDay = new Date(year, month + 1, 0)

      const dates = []
      const firstDayOfWeek = firstDay.getDay()
      const totalDays = lastDay.getDate()

      // 이전 달 날짜 채우기
      for (let i = firstDayOfWeek - 1; i >= 0; i--) {
        const prevDate = new Date(year, month, -i)
        dates.push({
          key: `prev-${prevDate.getDate()}`,
          day: prevDate.getDate(),
          isCurrentMonth: false,
          isToday: false,
        })
      }

      // 현재 달 날짜 채우기
      for (let day = 1; day <= totalDays; day++) {
        const isToday =
          year === new Date().getFullYear() &&
          month === new Date().getMonth() &&
          day === new Date().getDate()

        dates.push({
          key: `current-${day}`,
          day,
          isCurrentMonth: true,
          isToday,
        })
      }

      // 다음 달 날짜 채우기
      const remainingDays = 42 - dates.length
      for (let i = 1; i <= remainingDays; i++) {
        const nextDate = new Date(year, month + 1, i)
        dates.push({
          key: `next-${nextDate.getDate()}`,
          day: nextDate.getDate(),
          isCurrentMonth: false,
          isToday: false,
        })
      }

      return dates
    },
    selectedDateText() {
      if (!this.selectedDate) return '선택된 날짜가 없습니다'
      const { year, month, day } = this.selectedDate
      return `${year}년 ${month + 1}월 ${day}일`
    },
  },
  methods: {
    prevMonth() {
      this.currentDate = new Date(this.currentYear, this.currentMonth - 1, 1)
    },
    nextMonth() {
      this.currentDate = new Date(this.currentYear, this.currentMonth + 1, 1)
    },
    selectDate(date) {
      this.selectedDate = {
        year: this.currentYear,
        month: this.currentMonth,
        day: date.day,
      }
    },
    addTodo() {
      if (!this.newTodo.trim() || !this.newTodoTime.trim()) return
      const dateKey = this.selectedDateText

      if (!this.todos[dateKey]) {
        this.todos[dateKey] = []
      }
      this.todos[dateKey].push({ time: this.newTodoTime, task: this.newTodo.trim() })
      // 시간 순서로 정렬
      this.todos[dateKey].sort((a, b) => {
        return a.time.localeCompare(b.time) // 시간 문자열 비교
      })
      this.newTodo = ''
      this.newTodoTime = ''
    },
    removeTodo(dateKey, index) {
      if (this.todos[dateKey]) {
        this.todos[dateKey].splice(index, 1)
        if (this.todos[dateKey].length === 0) {
          delete this.todos[dateKey]
        }
      }
    },
    getTodoCount(date) {
      const dateKey = `${this.currentYear}년 ${this.currentMonth + 1}월 ${date.day}일`
      return this.todos[dateKey]?.length || 0
    },
  },
}
</script>

<style scoped>
.page-container {
  display: flex;
  justify-content: space-between;
  height: 100vh;
  padding: 20px;
  gap: 20px;
}

.calendar {
  width: 900px;
  height: 80vh;
  border: 1px solid #d8d8d8;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: #9ed3ff;
  border-radius: 8px;
  color: white;
}

.calendar-title {
  font-size: 18px;
  font-weight: bold;
}

.calendar-days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  font-weight: bold;
  margin-bottom: 8px;
  margin-top: 14px;
}

.calendar-dates {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  margin-inline: 3px;
  gap: 4px;
}

.calendar-date {
  padding: 18px;
  height: 100px;
  cursor: pointer;
  border: 1px solid #f0f0f0;
  border-radius: 10px;
  position: relative;
}

.calendar-date:hover {
  background: #b7e1ff;
}

.calendar-date.is-today {
  background: #e3f2fd;
  font-weight: bold;
}

.calendar-date.is-other-month {
  color: #b0bec5;
}
.event-dots {
  display: flex;
  justify-content: center;
  margin-top: 8px;
}

.event-dot {
  width: 8px;
  height: 8px;
  background-color: #677bff;
  border-radius: 50%;
  margin: 0 2px;
}
.todo-container {
  flex: 1;
  height: 80vh;
  padding: 30px;
  border: 1px solid #bcd8ff;
  border-radius: 8px;
  background: #e7f1ff;
  margin-bottom: 5px;
}

.todo-container h3 {
  margin-bottom: 20px;
  margin-top: 0px;
  text-align: center;
}
.todo-container ul {
  list-style: none;
  padding: 0;
}

.todo-container li {
  background-color: white;
  padding: 10px;
  display: flex;
  justify-content: start;
  align-items: center;
  border-radius: 3px;
}
.add-todo input {
  width: 665px;
  margin-right: 10px;
  margin-bottom: 20px;
  border-radius: 3px;
  border-width: 1px;
  padding: 5px;
}

.add-todo .time-input {
  width: 150px;
  margin-right: 8px;
}

.add-todo button {
  width: 50px;
  border-radius: 5px;
  border-color: #9ed3ff;
  border-style: solid;
  background-color: white;
  cursor: pointer;
  padding: 5px;
}

.remove-btn {
  position: absolute; /* 절대 위치 설정 */
  right: 10px; /* 부모의 오른쪽에서 10px 떨어지게 */
  top: 50%; /* 부모의 세로 중앙 */
  transform: translateY(-50%); /* 세로 중앙 정렬 */
  background-color: #ff6b6b;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 12px;
}

.remove-btn:hover {
  background-color: #ff5252;
}
.todo-item {
  position: relative;
  align-items: center; /* 수직 중앙 정렬 */
  margin-bottom: 10px;
}
.todo-time {
  font-weight: bold;
  color: #555;
  margin-right: 10px;
}

.todo-task {
  color: #333;
}
</style>
