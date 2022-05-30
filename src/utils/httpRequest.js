import axios from 'axios';

console.log(process.env.REACT_APP_BASE_URL);

const httprRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});

export const getData = async (path, options = {}) => {
    const response = await httprRequest.get(path, options);

    return response.data;
};

export default httprRequest;
