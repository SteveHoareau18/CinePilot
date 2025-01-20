import axios from "axios";

class AuthService {

    async verifyCredentials(creds) {
        return await axios.post(`${import.meta.env.VITE_AUTH_URL}/login`, creds)
    }

    async relogUser(tk) {
        return await axios.post(`${import.meta.env.VITE_AUTH_URL}`, tk) // à changer bien sûr
    }
}

export default new AuthService()