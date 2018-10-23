<template>
  <v-app>
    <v-navigation-drawer
      app
      temporary
      v-model="drawer"
    >

      <v-list>
        <v-list-tile
          v-for="link of getLink"
          :key="link.title"
          :to="link.url"
        >
          <v-list-tile-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title v-text="link.title"></v-list-tile-title>
          </v-list-tile-content>

        </v-list-tile>
      </v-list>

    </v-navigation-drawer>


    <v-toolbar app dark color="primary" >
      <v-toolbar-side-icon
        @click="drawer = !drawer"
        class="hidden-md-and-up"
      ></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span">Todolist</router-link>
      </v-toolbar-title>
      <v-spacer/>
      <v-toolbar-items class="hidden-sm-and-down" v-for="link of links" :key="link.title">
        <v-btn flat :to="link.url">
          <v-icon left>{{ link.icon }}</v-icon>
          {{ link.title }}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>


    <v-content>
        <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
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
    }
  },
  computed: {
    getLink () {
      return this.$store.getters.getLink
    }
  }
}
</script>
