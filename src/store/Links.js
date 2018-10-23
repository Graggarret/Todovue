export default {
  state: {
    drawer: false,
    links: [
      {
        title: 'Задачи',
        icon: 'work',
        url: '/tasks'
      },
      {
        title: 'Создать задачу',
        icon: 'add',
        url: '/new'
      }
    ]
  },
  mutations: {},
  actions: {},
  getters: {
    getLink (state) {
      return state.links
    }
  }
}
