<template>
  <div class="projects">
    <h1 class="subheading grey--text">Projects</h1>
    <v-container class="my-5">
      <v-expansion-panels accordion>
        <v-expansion-panel v-for="(project, i) in myProjects" :key="i">
          <v-expansion-panel-header class="grey--text text-h5">
            {{ project.title }}
          </v-expansion-panel-header>
          <v-expansion-panel-content class="px-4 grey--text">
            <div class="font-weight-bold">due by {{ project.due }}</div>
            <div>
              {{ project.content }}
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>
  </div>
</template>

<script>
import db from "@/plugins/firebase";

export default {
  name: "Projects",
  data() {
    return {
      projects: [],
    };
  },
  computed: {
    myProjects() {
      return this.projects.filter((p) => p.person === "The Net Ninja");
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
