import axios from "axios";

export const baseURL = "https://cat-fact.herokuapp.com";

export default axios.create({
    baseURL,
});