import api from "../api/api";

const authService = {

    async register(user) {

        const response = await api.post("/auth/register", user);

        return response.data;

    },

    async login(credentials) {

        const response = await api.post("/auth/login", credentials);

        if (response.data.token) {

            localStorage.setItem("token", response.data.token);

        }

        return response.data;

    },

    logout() {

        localStorage.removeItem("token");

    },

    isAuthenticated() {

        return localStorage.getItem("token") !== null;

    }

};

export default authService;