import { fetchBaseQuery } from "@reduxjs/toolkit/query";

export const getTokenAuth = () => {
    const tokenString = localStorage.getItem('token');
    if (tokenString) {
        const storedToken = JSON.parse(tokenString);
        if (storedToken.token) {
            return storedToken.token;
        }
    }
    return undefined;
};

export const apiClientBaseQuery = async (args: any, api: any, extraOptions: any) => {
    return fetchBaseQuery({
        baseUrl: `https://jsonplaceholder.typicode.com`,
        prepareHeaders: (headers) => {
            headers.set('Authorization', `Bearer ${getTokenAuth() || ''}`);
            return headers;
        },
    })(args, api, extraOptions);
};

