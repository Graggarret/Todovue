export default {
  state: {
    tasks: [
      {
        id: 0,
        title: 'Купить хлеб',
        description: 'Необходимо купить хлеб и батон',
        dateTime: '2018-10-01 21:19',
        done: false
      },
      {
        id: 1,
        title: 'Выгулять пса',
        description: 'Погулять с собакой не меньше часа',
        dateTime: '2018-10-03 20:19',
        done: true
      },
      {
        id: 2,
        title: 'Повестить полку',
        description: 'Повесить купленную полку в спальне',
        dateTime: '2018-10-03 15:19',
        done: false
      }
    ],
    img: [
      {
        src: 'https://theidealist.ru/wp-content/uploads/2018/10/VyMRir8nUF4-1200x743.jpg'
      },
      {
        src: 'https://samorazvitie.biz/wp-content/uploads/2016/11/1-8.jpg'
      },
      {
        src: 'https://bridgemoore.nl/wp-content/uploads/2015/11/sales-success.jpg'
      },
      {
        src: 'https://img03.rl0.ru/30e456df6ba2a1dcdd1f609250b6e701/c600x315/news.rambler.ru/img/2017/11/11022631.871935.2879.jpeg'
      }
    ],
    headers: [
      {
        text: 'Состояние',
        align: 'left',
        sortable: false,
        value: 'done'
      },
      {
        text: 'Заголовок',
        value: 'title',
        align: 'center'
      },
      {
        text: 'Дата',
        value: 'dateTime',
        align: 'center'
      },
      {
        text: 'Информация',
        value: 'show',
        sortable: false,
        align: 'center'
      },
      {
        text: 'Удаление',
        value: 'delete',
        sortable: false,
        align: 'center'
      }
    ],
    activeTask: 0
  },
  mutations: {
    taskCreate (state, payload) {
      state.tasks.push(payload)
    },
    changeActiveTask (state, payload) {
      state.activeTask = payload
    },
    taskEdit (state, payload) {
      let task = state.tasks.map(item => {
        if (item.id == payload.id) {
          return {
            id: item.id,
            description: payload.description,
            dateTime: payload.dateTime,
            title: payload.title,
            done: item.done
          }
        } else return item
      })
      state.tasks = [...task]
    },
    taskDone (state, payload) {
      let task = state.tasks.map(item => {
        if (item.id == payload.id) {
          return {
            id: item.id,
            description: item.description,
            dateTime: item.dateTime,
            title: item.title,
            done: !item.done
          }
        } else return item
      })
      state.tasks = [...task]
    },
    deleteTask (state, payload) {
      let num = 0
      let task = state.tasks.map((item, index) => {
        if (item.id == payload.id) {
          num = index
        }
        return item
      })
      console.log(num)
      task.splice(num, 1)
      state.tasks = [...task]
    }
  },
  actions: {
    taskCreate ({commit}, payload) {
      commit('taskCreate', payload)
    },
    changeActiveTask ({commit}, payload) {
      commit('changeActiveTask', payload)
    },
    taskEdit ({commit}, payload) {
      commit('taskEdit', payload)
    },
    taskDone ({commit}, payload) {
      commit('taskDone', payload)
    },
    deleteTask ({commit}, payload) {
      commit('deleteTask', payload)
    }
  },
  getters: {
    getTasks (state) {
      return (state.tasks)
    },
    doneTasks (state) {
      return state.tasks.filter(task => {
        return task.done
      })
    },
    undoneTasks (state) {
      return state.tasks.filter(task => {
        return !task.done
      })
    },
    getImg (state) {
      return state.img
    },
    getHeadTable (state) {
      return (state.headers)
    },
    taskId (state) {
      return state.tasks[state.activeTask]
    }
  }
}
