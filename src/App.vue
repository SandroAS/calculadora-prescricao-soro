<template>
  <v-app dark>
    <v-main class="bg-black">
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>
main {
  background-color: rgb(210, 243, 243);
}
</style>
