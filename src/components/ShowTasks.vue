<template>
  <v-container>
    <v-layout row>

      <v-flex xs12>
        <v-flex xs12 sm6 d-flex>
          <v-select
            :items="['Все задачи','Выполненные','Не выполненные']"
            v-model="choose"
            label="visible"
          ></v-select>
        </v-flex>
        <v-data-table
          :headers="getHead()"
          :items=" choose === 'Все задачи' ? getTasks(): choose === 'Выполненные' ? doneTasks() : undoneTasks()"
          class="elevation-1"
        >
          <template slot-scope="props">
            <v-tooltip bottom>
              <span slot="activator">
                {{ props.header.text }}
              </span>
            </v-tooltip>
          </template>
          <template slot="items" slot-scope="props" >
            <td>{{ props.item.done ? 'Готово' : 'Не готово'}}</td>
            <td class="text-xs-right">{{ props.item.title }}</td>
            <td class="text-xs-right">{{ props.item.dateTime }}</td>
            <td class="text-xs-center"><v-btn @click="changeActiveTask(props.item.id)" :to="'/task/' + props.item.id" class="primary">Показать</v-btn></td>
            <td class="text-xs-center"><v-btn @click="deleteTask(props.item.id)" class="error">Удалить</v-btn></td>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
  export default {
    data () {
      return {
        choose: 'Все задачи',
        activeTask: 0
      }
    },
    methods: {
      getTasks () {
        return this.$store.getters.getTasks
      },
      getHead () {
        return (this.$store.getters.getHeadTable)
      },
      doneTasks () {
        return this.$store.getters.doneTasks
      },
      undoneTasks () {
        return this.$store.getters.undoneTasks
      },
      changeActiveTask (value) {
        this.$store.dispatch('changeActiveTask', value)
      },
      deleteTask (value) {
        this.$store.dispatch('deleteTask', value)
      }
    }
  }
</script>
