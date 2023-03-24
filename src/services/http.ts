import axios from 'axios';

export const http = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}`,
});

export const httpPublick = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_PUBLICK_URL}`,
});
