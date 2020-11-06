<template>
  <div class="text-center">
    <v-dialog v-model="dialog" max-width="600">
      <template v-slot:activator="{ on, attrs }">
        <v-btn depressed color="success" dark v-bind="attrs" v-on="on">
          Add new project
        </v-btn>
      </template>

      <validation-observer ref="observer" v-slot="{ invalid, reset }">
        <v-card>
          <v-card-title class="headline grey lighten-2">
            <h2>Add a New Project</h2>
          </v-card-title>

          <v-card-text>
            <form @submit.prevent="submit" class="px-3 mt-4">
              <validation-provider
                v-slot="{ errors }"
                name="Title"
                rules="required|min:3"
              >
                <v-text-field
                  name="title"
                  label="Title"
                  id="title"
                  hint="Project name"
                  prepend-icon="mdi-folder"
                  v-model="project.title"
                  :error-messages="errors"
                  required
                ></v-text-field>
              </validation-provider>

              <validation-provider
                v-slot="{ errors }"
                name="Information"
                rules="required|min:10"
              >
                <v-textarea
                  name="content"
                  label="Information"
                  id="content"
                  hint="Project details"
                  prepend-icon="mdi-folder-text"
                  v-model="project.content"
                  :error-messages="errors"
                  required
                  auto-grow
                  no-resize
                ></v-textarea>
              </validation-provider>

              <v-menu
                v-model="date_menu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    :value="formatedDate"
                    label="Due date"
                    hint="Project due date"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="project.due"
                  @input="date_menu = false"
                  :min="new Date().toISOString().substr(0, 10)"
                ></v-date-picker>
              </v-menu>
            </form>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              depressed
              color="success"
              class="mx-0 mt3"
              @click="submit(reset)"
              :disabled="invalid"
              :loading="submitting"
            >
              Add project
            </v-btn>
          </v-card-actions>
        </v-card>
      </validation-observer>
    </v-dialog>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { required, min } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";
import db from "@/plugins/firebase";

setInteractionMode("eager");

extend("required", {
  ...required,
  message: "{_field_} is required",
});

extend("min", {
  ...min,
  message: "{_field_} must have at least {length} characters",
});

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      dialog: false,
      submitting: false,
      date_menu: false,
      project: {
        title: "",
        person: "The Net Ninja",
        content: "",
        due: new Date().toISOString().substr(0, 10),
        status: "ongoing",
      },
    };
  },
  computed: {
    formatedDate() {
      return dayjs(this.project.due).format("MMMM DD YYYY");
    },
  },
  methods: {
    submit(reset) {
      this.submitting = true;
      db.collection("projects")
        .add(this.project)
        .then(() => {
          reset();
          this.project.title = "";
          this.project.person = "";
          this.project.content = "";
          this.submitting = false;
          this.dialog = false;
          this.$emit("projectAdded");
        });
    },
  },
};
</script>
