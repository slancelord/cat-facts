<template>
    <div class="table" v-if="getCatFacts && getCatFacts.length > 0">
        {{getCatFacts[0].text}}
    </div>
    <div v-else>
      loading
    </div>
</template>
  
<script lang="ts">
    import Vue from 'vue';
    import { mapActions, mapGetters } from 'vuex';
    import catFact from '@/interfaces/catFact';
    
    interface CatFactsComponent extends Vue {
        getCatFactsFromAPI: (amount: number) => catFact[];
    }
    
    export default Vue.extend({
        computed: {
            ...mapGetters([
                'getCatFacts'
            ]),
        },
        methods: {
        ...mapActions([
            'getCatFactsFromAPI',
        ]),
        },
        mounted(this: CatFactsComponent) {
            this.getCatFactsFromAPI(2);  
        }
    });
</script>
  