<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Новая задача</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" v-model="valid" validation>
              <v-text-field
                prepend-icon="assignment"
                name="title" label="Заголовок"
                type="text"
                v-model="title"
                :rules="titleRules"
              ></v-text-field>
              <v-textarea
                name="input-7-1"
                prepend-icon="description"
                label="Описание"
                v-model="description"
                hint="Напишите описание задачи"
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
                      label="Выберите дату"
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
                      label="Выберите время"
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
            <v-btn
              color="secondary"
              :to="'/tasks'"
            >Отмена</v-btn>
            <v-btn
              color="primary"
              @click="onSubmit"
              :disabled="!valid"
              :to="'/tasks'"
            >Создать</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
  export default {
    data () {
      return {
        numberTasks: 3,
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
    methods: {
      onSubmit () {
        if (this.$refs.form.validate()) {
          const task = {
            id: Math.floor(Math.random() * 1000),
            title: this.title,
            description: this.description,
            dateTime: this.date + ' ' + this.time,
            done: false
          }
          this.$store.dispatch('taskCreate', task)
        }
      }
    }
  }
</script>
