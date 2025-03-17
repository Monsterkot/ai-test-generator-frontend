import { api } from "../api/api";

export class AuthService {
    static async login(email: string, password: string) {
        const response = await api.post('/auth/login', { email, password });
        return response.data;
    }

    static async register(name: string, email: string, password: string){
        const response = await api.post('/auth/register', { name, email, password });
        return response.data;
    }

    static async refreshToken(){
        const response = await api.post('/auth/refresh');
        return response.data;
    }

    static async logout(){
        const response = await api.post('/auth/logout');
        return response.data;
    }
}