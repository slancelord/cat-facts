<template>
    <div>
        <v-card> 
            <v-card-title class="text-h3 py-2">
                {{ $t('detailFact.card.title') }}
            </v-card-title>
            <v-card-subtitle class="pl-5 pa-1">
                {{ $t('detailFact.card.subtitle') }}: {{ catFact._id}}
            </v-card-subtitle>
            <v-card-text class="text-h5 py-3 text--primary">
                {{ catFact.text }}
            </v-card-text>
            <v-card-actions>
                <v-list-item>
                    <v-avatar>
                        <v-img :src=catFact.user.photo></v-img>
                    </v-avatar>
                    <v-list-item-content class="pl-1">
                        <v-list-item-title>
                            {{ catFact.user.name?.first }} {{ catFact.user.name?.last }}
                        </v-list-item-title>
                        <v-list-item-subtitle>
                                {{ $t('detailFact.listUser.subtitle') }}: {{ catFact.user._id}}
                        </v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-content>
                        <v-list-item-title class="text-end">
                            {{ $t('detailFact.listTime.createdAt') }}: {{ catFact.createdAt }}
                        </v-list-item-title>
                        <v-list-item-title class="text-end">
                            {{ $t('detailFact.listTime.updateAt') }}: {{ catFact.updatedAt }}
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-card-actions>
        </v-card>
        <v-btn class="mt-5 ml-2" to="/">
            {{ $t('detailFact.button.text') }}
        </v-btn>
    </div>
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
