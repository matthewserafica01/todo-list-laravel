import { defineStore } from "pinia";
import axiosClient from "../axios";

const useUserStore = defineStore('user', {
    state: () => ({
        user: null
    }),
    actions: {
        fetchUser: (state, payload) => {
            return axiosClient.get('/api/user')
                .then((data) => {
                    console.log(data);
                    this.user = data;
                });
        }
    }
});

export default useUserStore;