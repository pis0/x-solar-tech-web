import axios from 'axios';

const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1OTEwNTYxMzUsImV4cCI6MTU5MTA2MzMzNSwic3ViIjoiOWUyOThiODAtZWQ2Yi00MjhiLWIzODMtZmZlMTYyZDdhZDhjIn0.JIZwIV05-xRf8ENwU5ys3qcXIQD6McByxLSKVnvFTOU';
const RemoteServices = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    Authorization: `Barear ${TOKEN}`,
  },
});

export default RemoteServices;
