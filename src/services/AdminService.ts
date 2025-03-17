import { api } from "../api/api";

export class AdminService {
    static async getUsers() {
        const response = await api.get('/users/all');
        console.log("AdminService getUsers: ", response.data);
        return response.data;
    }

    static async deleteUser(userId: number) {
        const response = await api.delete(`users/delete/${userId}`);
        return response.data;
    }

    static async toggleAdmin(userId: number, role: "USER" | "ADMIN") {
        const response = await api.patch(`users/update/${userId}`, { role });
        return response.data;
    }
}