import axios from 'axios';

const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1OTIzNDMyMTgsImV4cCI6MTU5MjM1MDQxOCwic3ViIjoiOWUyOThiODAtZWQ2Yi00MjhiLWIzODMtZmZlMTYyZDdhZDhjIn0.mPQu9OOBuPt7iJ7tyQvZER0Zi5ZR670_us9mODwGXPs';
const RemoteServices = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    Authorization: `Barear ${TOKEN}`,
  },
});

export default RemoteServices;
