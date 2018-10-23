<template>
  <v-container>
    <v-layout row>
      <v-flex xs12>
        <v-carousel hide-controls>
          <v-carousel-item
            v-for="(item,i) in getImg"
            :key="i"
            :src="item.src"
          ></v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
  export default {
    computed: {
      getImg () {
        return (
          this.$store.getters.getImg
        )
      }
    }
  }
</script>
