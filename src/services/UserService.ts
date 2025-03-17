import { api } from "../api/api";

export class UserService {
    static async getProfile() {
        const response = await api.get('/users/profile');
        return response.data;
    }
}