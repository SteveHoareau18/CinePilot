import axios from "axios";

class AuthService {

    async verifyCredentials(creds) {
        return await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, creds)
    }

    async createUser(creds) {
        return await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/signup`, creds)
    }

    async relogUser(tk) {
        return await axios.post(`${import.meta.env.VITE_BACKEND_URL}`, tk) // à changer bien sûr
    }
}

export default new AuthService()