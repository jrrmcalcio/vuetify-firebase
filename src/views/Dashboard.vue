<template>
  <div class="dashboard">
    <h1 class="subheading grey--text">Dashboard</h1>

    <v-container class="my-5">
      <v-layout row class="ma-0 mb-3">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              text
              small
              color="grey"
              @click="sortBy('title')"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon small left>mdi-folder-multiple</v-icon>
              <span class="caption text-lowercase">By project name</span>
            </v-btn>
          </template>
          <span>Sort by project title</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              text
              small
              color="grey"
              @click="sortBy('person')"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon small left>mdi-folder-multiple</v-icon>
              <span class="caption text-lowercase">By person</span>
            </v-btn>
          </template>
          <span>Sort by person name</span>
        </v-tooltip>
      </v-layout>
      <v-card flat v-for="project in projects" :key="project.title">
        <v-layout row wrap :class="`ma-0 pa-3 project ${project.status}`">
          <v-flex xs12 md6>
            <div class="caption grey--text">Project title</div>
            <div>{{ project.title }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Person</div>
            <div>{{ project.person }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Due by</div>
            <div>{{ project.due }}</div>
          </v-flex>
          <v-flex xs2 sm4 md2>
            <div class="right">
              <v-chip
                small
                text-color="white"
                :class="`${project.status} my-2 caption v-chip--active`"
                >{{ project.status }}</v-chip
              >
            </div>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import db from "@/plugins/firebase";

export default {
  data() {
    return {
      projects: [],
    };
  },
  methods: {
    sortBy(prop) {
      this.projects.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
    },
  },
  created() {
    db.collection("projects").onSnapshot((response) => {
      response.docChanges().forEach((change) => {
        if (change.type == "added") {
          this.projects.push({
            ...change.doc.data(),
            id: change.doc.id,
          });
        }
      });
    });
  },
};
</script>

<style>
.project.complete {
  border-left: 4px solid #3cd1c2;
}
.project.ongoing {
  border-left: 4px solid #ffaa2c;
}
.project.overdue {
  border-left: 4px solid #f83e70;
}
.v-chip.complete {
  background: #3cd1c2;
}
.v-chip.ongoing {
  background: #ffaa2c;
}
.v-chip.overdue {
  background: #f83e70;
}
</style>
