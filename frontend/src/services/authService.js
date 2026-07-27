import api from "../api/api";

const authService = {

    async login(credentials) {

        const response = await api.post(

            "/api/auth/login",

            credentials

        );

        localStorage.setItem(

            "token",

            response.data.token

        );

        return response.data;

    },

    async register(user) {

        const response = await api.post(

            "/api/auth/register",

            user

        );

        return response.data;

    },

    logout() {

        localStorage.removeItem("token");

    },

    isLoggedIn() {

        return !!localStorage.getItem("token");

    },

    getToken() {

        return localStorage.getItem("token");

    }

};

export default authService;