import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const USERS_API = `${BASE_URL}/api/users`;
axios.defaults.adapter = require('axios/lib/adapters/http');

const api = axios.create({
    withCredentials: true
});

export const userTogglesTuitLikes = (uid, tid) =>
    api.put(`${USERS_API}/${uid}/likes/${tid}`).then(response => response.data);

export const userTogglesTuitDislikes = (uid, tid) =>
    api.put(`${USERS_API}/${uid}/dislikes/${tid}`).then(response => response.data);


// For testing purposes
export const findAllTuitsLikedByUser = (uid) =>
    api.get(`${USERS_API}/${uid}/likes`).then(response => response.data);

export const findAllTuitsDislikedByUser = (uid) =>
    api.get(`${USERS_API}/${uid}/dislikes`).then(response => response.data);

export const userUnlikesTuit = (uid, tid) =>
    api.delete(`${USERS_API}/${uid}/unlikes/${tid}`).then(response => response.data);