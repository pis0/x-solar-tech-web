import axios from 'axios';

const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1OTE5MTMwMTQsImV4cCI6MTU5MTkyMDIxNCwic3ViIjoiOWUyOThiODAtZWQ2Yi00MjhiLWIzODMtZmZlMTYyZDdhZDhjIn0.gb17O49TnZpruS5dDAXd2QPY5GV1mdmweT_7mvEU9Vk';
const RemoteServices = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    Authorization: `Barear ${TOKEN}`,
  },
});

export default RemoteServices;
