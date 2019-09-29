import axios from "axios";

const BACKEND_URL = 'https://demo132.delta.vkhackathon.com/api/';
export const backend = axios.create({
    baseURL: BACKEND_URL,
    headers: {
        "Content-Type": 'application/json',
        "X-Content-Type-Options": "nosniff",
    },
    withCredentials: true
});