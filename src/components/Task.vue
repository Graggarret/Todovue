<template>
  <v-container>
    <v-layout row>
      <v-flex xs12>
        <v-card>
          <v-card-media
            height="300px"
            src='https://theidealist.ru/wp-content/uploads/2018/10/VyMRir8nUF4-1200x743.jpg'
          >
          </v-card-media>
          <v-card-text>
            <h1 class="text--primary">{{ taskId.title }}</h1>
            <p>{{ taskId.description }}</p>
          </v-card-text>
          <v-card-actions>
            <v-btn
              class="success"
              @click.native="taskDone"
            >{{ taskId.done ? 'Завершено' : 'Завершить' }}
            </v-btn>
            <v-spacer/>
            <v-dialog v-model="dialog" persistent max-width="500px">
              <v-btn slot="activator" color="primary" dark>Редактировать</v-btn>
                <v-card>
                  <v-card-title>
                    <span class="headline">Задача</span>
                  </v-card-title>
                  <v-card-text>
                    <v-form ref="form" v-model="valid" validation>
                      <v-text-field
                        prepend-icon="assignment"
                        name="title" label="Title"
                        type="text"
                        v-model="title"
                        :rules="this.titleRules"
                      ></v-text-field>
                      <v-textarea
                        name="input-7-1"
                        prepend-icon="description"
                        label="Description"
                        v-model="description"
                        hint="Write a description of the task"
                        :rules="descriptionRules"
                      ></v-textarea>
                      <v-layout row wrap>
                        <v-flex xs12 sm6 md4>
                          <v-menu
                            ref="menu"
                            :close-on-content-click="false"
                            v-model="menu"
                            :nudge-right="40"
                            :return-value.sync="date"
                            lazy
                            transition="scale-transition"
                            offset-y
                            full-width
                            min-width="290px"
                          >
                            <v-text-field
                              slot="activator"
                              v-model="date"
                              label="Choose a date"
                              prepend-icon="event"
                              :rules="dateRules"
                              readonly
                            ></v-text-field>
                            <v-date-picker v-model="date" @input="$refs.menu.save(date)"></v-date-picker>
                          </v-menu>
                        </v-flex>
                        <v-spacer/>
                        <v-flex xs11 sm5>
                          <v-menu
                            ref="menu2"
                            :close-on-content-click="false"
                            v-model="menu2"
                            :nudge-right="40"
                            :return-value.sync="time"
                            lazy
                            transition="scale-transition"
                            offset-y
                            full-width
                            max-width="290px"
                            min-width="290px"
                          >
                            <v-text-field
                              slot="activator"
                              v-model="time"
                              label="Choose a time"
                              prepend-icon="access_time"
                              :rules="timeRules"
                              readonly
                            ></v-text-field>
                            <v-time-picker
                              v-if="menu2"
                              v-model="time"
                              format="24hr"
                              full-width
                              @change="$refs.menu2.save(time)"
                            ></v-time-picker>
                          </v-menu>
                        </v-flex>
                      </v-layout>
                    </v-form>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="secondary" @click.native="dialog = false">Отмена</v-btn>
                    <v-btn
                      color="primary"
                      :disabled="!valid"
                      @click.native="onChangeTask;dialog = false"
                    >Сохранить</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            <v-btn
              class="info"
              :to="'/tasks'"
            >Выход</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
  export default {
    props: ['id'],
    data () {
      return {
        dialog: false,
        title: '',
        description: '',
        time: null,
        date: null,
        menu: false,
        menu2: false,
        valid: false,
        titleRules: [
          v => !!v || 'Title is required',
          v => (v && v.length >= 4) || 'Title must be less than 3 characters'
        ],
        descriptionRules: [
          v => !!v || 'Description is required',
          v => (v && v.length >= 6) || 'Description must be less than 5 characters'
        ],
        dateRules: [
          v => v !== null || 'Date is required'
        ],
        timeRules: [
          v => v !== null || 'Time is required'
        ]
      }
    },
    computed: {
      taskId () {
        return this.$store.getters.taskId
      },
      onChangeTask () {
        const task = {
          id: this.id,
          title: this.title,
          description: this.description,
          dateTime: this.date + ' ' + this.time
        }
        this.$store.dispatch('taskEdit', task)
      },
      taskDone () {
        const task = {
          id: this.id
        }
        this.$store.dispatch('taskDone', task)
      }
    }
  }
</script>
