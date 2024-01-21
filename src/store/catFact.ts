import { Commit } from "vuex" 
import catFactsClient from "@/api/catFacts";
import catFact from "@/interfaces/catFact";

interface CatModuleState {
    catFacts: catFact[];
}


export default {
    state: {
        catFacts: [] as catFact[],
    },
    getters: {
        getCatFacts(state:CatModuleState) {
            return state.catFacts;
        }
    },
    mutations: {
        setCatFacts(state:CatModuleState, catFacts:catFact[]) {
            state.catFacts = catFacts;
        }
    },
    actions: {
        async getCatFactsFromAPI({commit} : {commit:Commit}, amount:number) {
            const response = await catFactsClient.get("/facts/random?amount=" + amount);
            const data = Array.isArray(response.data) ? response.data : [response.data];
            const catFacts: catFact[] = [];
            for (let i = 0; i < amount; i++) {
                catFacts[i] = {
                    _id: data[i]._id,
                    user: data[i].user,
                    text: data[i].text,
                    type: data[i].type,
                    createdAt: data[i].createdAt,
                    updatedAt: data[i].updatedAt,
                }
            }
            commit('setCatFacts', catFacts);
            return catFacts;
        }
    },
}