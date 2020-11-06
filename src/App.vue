<template>
  <v-app style="background: #f5f5f5;">
    <nav-bar></nav-bar>
    <v-main class="mx-4 mb-4">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import NavBar from "@/components/NavBar";
export default {
  name: "App",

  components: { NavBar },

  data: () => ({
    //
  }),
};
</script>
