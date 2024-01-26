<template>
    <div>
        <v-card>
            <v-card-title>
                {{ $t('table.title') }}
                <v-spacer></v-spacer>
                <v-select 
                    v-model="amount"
                    @change="loadCatFacts()"
                    :label="$t('table.select.label')"
                    :items="[5, 10, 15, 20, 30, 50, 100]"
                    hide-details
                ></v-select>
            </v-card-title>        
            <v-data-table 
            @click:row="onRowClick" 
            :headers="headers" 
            :loading="loadTable" 
            :items="catFacts"
            item-key="_id"
            class="elevation-1"
            :footer-props="{
                'itemsPerPageText': $t('table.footer.itemsPerPageText'),
                'pageText': $t('table.footer.pageText')
            }"
            >
                <template v-slot:items="props">
                    <td>{{ props.item._id }}</td>
                    <td>{{ props.item.text}}</td>
                </template>
            </v-data-table>
        </v-card>    
    </div>
</template>
  

<style>
    tbody tr:hover {
        cursor: pointer;
    }
</style>


<script lang="ts">
    import Vue from 'vue';
    import { mapActions, mapGetters } from 'vuex';
    import catFact from '@/interfaces/catFact';
    
    interface CatFactsComponent extends Vue {
        getCatFactsFromAPI: (amount: number) => {error:{massage: string, status: number}};
        getCatFacts: () => catFact[];
        loadCatFacts: () => void;
        headers: { text: string, value: string, width?: string }[];
        loadTable: boolean;
        amount: number;
    }
    
    export default Vue.extend({
        data() {
            return {
                loadTable: true,
                amount: 20,
            };
        },


        computed: {
            ...mapGetters([
                'getCatFacts'
            ]),
            
            catFacts(this: CatFactsComponent) {
                return this.getCatFacts;
            },

            headers(): { text: string, value: string, width?: string }[] {
                return [
                    { text: this.$t('table.headers.ID').toString(), value: '_id', width:'20%'},
                    { text: this.$t('table.headers.fact').toString(), value: 'text'},
                ]
            }
        },


        methods: {
            ...mapActions([
                'getCatFactsFromAPI',
            ]),
            
            async loadCatFacts(this: CatFactsComponent) {
                this.loadTable = true; 
                const error = await this.getCatFactsFromAPI(this.amount);
                this.loadTable = false;
            },
            
            onRowClick(item: catFact) {
                this.$router.push('fact/' + item._id);
            }
        },


        mounted(this: CatFactsComponent) {
            this.loadCatFacts();
        }
    });
</script>
