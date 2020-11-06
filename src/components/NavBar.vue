<template>
  <div>
    <nav>
      <v-snackbar
        v-model="snackbar"
        :timeout="2500"
        rounded="pill"
        color="success"
        top
      >
        <div class="text-center">
          Project added correctly
          <v-btn color="white" text small right @click="snackbar = false">
            <v-icon right>mdi-close-circle</v-icon>
          </v-btn>
        </div>
      </v-snackbar>

      <v-app-bar flat app>
        <v-toolbar-title class="text-uppercase grey--text">
          <v-app-bar-nav-icon
            class="grey--text"
            @click="drawer = !drawer"
          ></v-app-bar-nav-icon>
          <span class="font-weight-light">Todo</span>
          <span>tify</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>

        <div class="text-center">
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" text dark v-bind="attrs" v-on="on">
                <v-icon>mdi-menu</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(link, index) in links"
                :key="index"
                router
                :to="link.route"
              >
                <v-list-item-title>{{ link.text }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>

        <v-btn text color="grey">
          <span>Sign Out</span>
          <v-icon right>mdi-exit-to-app</v-icon>
        </v-btn>
      </v-app-bar>

      <v-navigation-drawer app class="primary" v-model="drawer">
        <v-layout column align-center class="ma-0">
          <v-flex class="mt-5">
            <v-avatar size="100">
              <img src="/avatar-1.png" alt="alt" />
            </v-avatar>
            <p class="text-center white--text subheading mt-1">The Net Ninja</p>
          </v-flex>

          <v-flex class="mt-4 mb-3">
            <popup @projectAdded="snackbar = true" />
          </v-flex>
        </v-layout>

        <v-list>
          <v-list-item
            v-for="link in links"
            :key="link.text"
            router
            :to="link.route"
          >
            <v-list-item-action>
              <v-icon class="white--text">{{ link.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="white--text">{{
                link.text
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </nav>
  </div>
</template>

<script>
import Popup from "./Popup";
export default {
  components: {
    Popup,
  },
  data() {
    return {
      drawer: false,
      snackbar: false,
      links: [
        {
          icon: "mdi-desktop-mac-dashboard",
          text: "Dashboard",
          route: "/",
        },
        {
          icon: "mdi-folder-multiple",
          text: "My Projects",
          route: "/projects",
        },
        {
          icon: "mdi-account-group",
          text: "Team",
          route: "/team",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped></style>
