<template>
  <div>
    <h1>{{ title }}</h1>

    <TaskStats :total="totalCount" :active="activeCount" :completed="completedCount" />

    <TaskForm @add-task="addTask" />

    <h3>Search & Filters</h3>
    <input v-model="search" placeholder="Search by title..." />
    <select v-model="filterPriority">
      <option value="all">All priorities</option>
      <option value="high">High</option>
      <option value="medium">Medium</option>
      <option value="low">Low</option>
    </select>
    <select v-model="filterStatus">
      <option value="all">All</option>
      <option value="active">Active</option>
      <option value="completed">Completed</option>
    </select>
    <p>Showing {{ filteredTasks.length }} of {{ tasks.length }} tasks</p>
    <hr />

    <TaskItem
      v-for="task in filteredTasks"
      :key="task.id"
      :task="task"
      @complete-task="toggleComplete"
      @delete-task="deleteTask"
      @change-priority="changePriority"
    />
    <p v-if="filteredTasks.length === 0">No tasks found.</p>
  </div>
</template>

<script>
import TaskItem from './components/TaskItem.vue'
import TaskForm from './components/TaskForm.vue'
import TaskStats from './components/TaskStats.vue'

export default {
  components: { TaskItem, TaskForm, TaskStats },
  data() {
    return {
      title: 'Task Manager',
      search: '',
      filterPriority: 'all',
      filterStatus: 'all',
      tasks: [
        { id: 1, title: 'Learn Vue', description: 'Read the lecture', priority: 'high', completed: false, createdAt: '01.10.2026' },
        { id: 2, title: 'Do SIS 2', description: 'Build the project', priority: 'medium', completed: false, createdAt: '03.10.2026' },
        { id: 3, title: 'Buy milk', description: 'From the shop', priority: 'low', completed: true, createdAt: '05.10.2026' }
      ]
    }
  },
  computed: {
    filteredTasks() {
      return this.tasks.filter(task => {
        const matchSearch = task.title.toLowerCase().includes(this.search.toLowerCase())
        const matchPriority = this.filterPriority === 'all' || task.priority === this.filterPriority
        const matchStatus =
          this.filterStatus === 'all' ||
          (this.filterStatus === 'completed' ? task.completed : !task.completed)
        return matchSearch && matchPriority && matchStatus
      })
    },
    totalCount() {
      return this.tasks.length
    },
    completedCount() {
      return this.tasks.filter(t => t.completed).length
    },
    activeCount() {
      return this.totalCount - this.completedCount
    }
  },
  methods: {
    addTask(data) {
      this.tasks.push({
        id: Date.now(),
        title: data.title,
        description: data.description,
        priority: data.priority,
        completed: false,
        createdAt: new Date().toLocaleDateString()
      })
    },
    toggleComplete(id) {
      const task = this.tasks.find(t => t.id === id)
      task.completed = !task.completed
    },
    deleteTask(id) {
      this.tasks = this.tasks.filter(t => t.id !== id)
    },
    changePriority(id, priority) {
      const task = this.tasks.find(t => t.id === id)
      task.priority = priority
    }
  },
  watch: {
    // сохраняем задачи в браузер при каждом изменении
    tasks: {
      handler(newTasks) {
        localStorage.setItem('tasks', JSON.stringify(newTasks))
      },
      deep: true
    },
    // следим за полем поиска
    search(newValue) {
      console.log('Search changed:', newValue)
    }
  },
  created() {
    console.log('App created')
  },
  mounted() {
    const saved = localStorage.getItem('tasks')
    if (saved) {
      this.tasks = JSON.parse(saved)
    }
    console.log('App mounted, tasks loaded')
  },
  beforeDestroy() {
    console.log('App will be destroyed')
  }
}
</script>