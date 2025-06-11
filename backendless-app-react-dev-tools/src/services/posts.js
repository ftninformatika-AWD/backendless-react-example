import Axios from "../apis/Axios";

export const fetchPosts = async (apiURL) => {
    try {
        const response = await Axios.get(apiURL);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch posts');
    }
};

export const fetchCommentsForPost = async (postId) => {
    try {
        const response = await Axios.get(`posts/${postId}/comments`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch post\'s comments');
    }
};

