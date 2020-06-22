import axios from 'axios';

const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1OTI4MDE3NDQsImV4cCI6MTU5MjgwODk0NCwic3ViIjoiYTVlMTAxZWEtYTFmYS00ZTE3LTk2ZmItOGRiMDVmNmM2ZDNhIn0.7YdP9J9lssGuqtRYTpcv284XZHSeVLxzk4egNtuU1zY';
const RemoteServices = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    Authorization: `Barear ${TOKEN}`,
  },
});

export default RemoteServices;
