import Axios from "../apis/Axios";

export const fetchUsers = async () => {
    try {
        const response = await Axios.get('/users');
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch users');
    }
};

export const fetchUser = async (userId) => {
    try {
        const response = await Axios.get(`/users/${userId}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch user');
    }
};
