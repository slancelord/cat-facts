import { Commit } from "vuex" 
import  { AxiosError } from 'axios';
import catFactsClient from "@/api/catFacts";
import catFact from "@/interfaces/catFact";
import user from "@/interfaces/user";

interface CatModuleState {
    catFacts: catFact[];
}


export default {
    state: {
        catFacts: [] as catFact[],
    },

    getters: {
        getCatFacts(state: CatModuleState) {
            return state.catFacts;
        },

        getCatFactByID: (state: CatModuleState) => (id: string) => {
            return state.catFacts.find((fact: catFact) => fact._id == id)
        }
    },

    mutations: {    
        setCatFacts(state: CatModuleState, payload: catFact[]) {
            state.catFacts = payload;
        },

        updateUserFact(state: CatModuleState, payload: {id: string, user: user}) {
            const fact = state.catFacts.find((fact: catFact) => fact._id == payload.id);
            if(fact != null){
                fact.user = payload.user; 
            } else {
                console.error('Fact not found');
            } 
        }
    },
    
    actions: {
        async getCatFactsFromAPI({commit} : {commit: Commit}, amount: number) {
            try {
                const response = await catFactsClient.get("/facts/random?amount=" + amount);
                const data = Array.isArray(response.data) ? response.data : [response.data];
                const catFacts: catFact[] = [];
                for (let i = 0; i < amount; i++) {
                    catFacts[i] = {
                        _id: data[i]._id,
                        user: {
                            _id: data[i].user
                        },
                        text: data[i].text,
                        createdAt: data[i].createdAt,
                        updatedAt: data[i].updatedAt,
                    }
                }
                commit('setCatFacts', catFacts);
                return {error: null}
            } catch (error) {
                const err = error as AxiosError
                return {error: {massage: err.response?.data as string, status: err.response?.status}}
            }
        },

        async detailCatFactFromAPI({commit} : {commit: Commit}, id: string) {
            try {
                const { data } = await catFactsClient.get("/facts/" + id);
                commit('updateUserFact', {id, user: data.user});
                return {error: null}
            } catch (error) {
                const err = error as AxiosError
                return {error: {massage: err.response?.data as string, status: err.response?.status}}
            }
        }
    },
}