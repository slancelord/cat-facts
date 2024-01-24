<template>
    <v-card> 
        <v-card-title class="text-h3 py-2">Cat fact</v-card-title>
        <v-card-subtitle class="pl-5">Fact id: {{ catFact._id}}</v-card-subtitle>
        <v-card-text class="text-h5 py-3 text--primary">
            {{ catFact.text }}
        </v-card-text>
      
        <v-card-actions>
            <v-list-item>
                <template>
                    <v-avatar>
                        <v-img :src=catFact.user.photo></v-img>
                    </v-avatar>
                </template>
                <v-list-item-title class="pl-1">
                        {{ catFact.user.name?.first }} {{ catFact.user.name?.last }}
                    <v-list-item-subtitle>
                        user id: {{ catFact.user._id}}
                    </v-list-item-subtitle>
                </v-list-item-title>
                <template>
                    <v-list-item-title class="text-end">
                        Created: {{ catFact.createdAt }}
                        <v-list-item-title>
                        Updated: {{ catFact.updatedAt }}
                        </v-list-item-title>
                    </v-list-item-title>
                </template>
            </v-list-item>
        </v-card-actions>
    </v-card>
</template>
  


<script lang="ts">
    import Vue from 'vue';
    import { mapActions, mapGetters } from 'vuex';
    import catFact from '@/interfaces/catFact';
    
    interface detailFactComponent extends Vue {
        detailCatFactFromAPI: (id: string) => {error:{massage: string, status: number}};
        getCatFactByID: (id: string) => catFact;
    }
    
    export default Vue.extend({
        data() {
            return {
                
            };
        },


        computed: {
            ...mapGetters([
                'getCatFactByID'
            ]),

            catFact(this: detailFactComponent) {
                return this.getCatFactByID(this.$route.params.id);
            },
        },


        methods: {
            ...mapActions([
                'detailCatFactFromAPI'
            ])
        },


        mounted(this: detailFactComponent) {
            if(this.getCatFactByID(this.$route.params.id) == null) {
                this.$router.push('/');
            }
            else {
                this.detailCatFactFromAPI(this.$route.params.id);
            }
        }
    });
</script>
