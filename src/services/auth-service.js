import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const AUTH_API = `${BASE_URL}/api/auth`;
axios.defaults.adapter = require('axios/lib/adapters/http');

// Not using axios object directly
// axios.create creates an axios instance configured to include cookie headers to establish user identity
const api = axios.create({
    withCredentials: true
});

// New user data in HTTP body - should include req. fields (username, password, email)
export const signup = (user) =>
    api.post(`${AUTH_API}/signup`, user).then(response => response.data);

// Returns currently logged in user
export const profile = () =>
    api.post(`${AUTH_API}/profile`).then(response => response.data);

// Destroys the session
export const logout = (user) =>
    api.post(`${AUTH_API}/logout`, user).then(response => response.data);

// Login username and password passed in HTTP body
export const login = (credentials) =>
    api.post(`${AUTH_API}/login`, credentials).then(response => response.data);