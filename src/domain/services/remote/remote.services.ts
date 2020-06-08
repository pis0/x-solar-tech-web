import axios from 'axios';

const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1OTE1OTE1MjgsImV4cCI6MTU5MTU5ODcyOCwic3ViIjoiOWUyOThiODAtZWQ2Yi00MjhiLWIzODMtZmZlMTYyZDdhZDhjIn0.j0Ox2_MbFdju0IOH9yft6kNb977_CztRHuP2VRtr9Ow';
const RemoteServices = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    Authorization: `Barear ${TOKEN}`,
  },
});

export default RemoteServices;
