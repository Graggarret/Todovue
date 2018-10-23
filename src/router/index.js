import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Task from '@/components/Task'
import NewTask from '@/components/NewTask'
import Tasks from '@/components/ShowTasks'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      name: 'home',
      component: Home
    },
    {
      path: '/task/:id',
      props: true,
      name: 'task',
      component: Task
    },
    {
      path: '/new',
      name: 'newTask',
      component: NewTask
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: Tasks
    }
  ],
  mode: 'history'
})
