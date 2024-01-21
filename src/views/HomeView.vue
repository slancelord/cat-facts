<template>
  <div class="home">
    <TableCatFactsVue />
  </div>
</template>

<script lang="ts">
import TableCatFactsVue from '@/components/TableCatFacts.vue';

export default{
  name: 'HomePage',
  components: {
    TableCatFactsVue
  }
}
</script>
