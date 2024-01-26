<template>
  <v-app>
    <v-main>
      <template>
        <div class="text-end">
          <v-btn-toggle v-model="$i18n.locale" mandatory>
            <v-btn value="en">EN</v-btn>
            <v-btn value="ru">RU</v-btn>
          </v-btn-toggle>
        </div>
      </template>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'App',
  
});
</script>
