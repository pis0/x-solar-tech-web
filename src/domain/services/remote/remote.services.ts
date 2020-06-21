import axios from 'axios';

const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1OTI3NzM2MDcsImV4cCI6MTU5Mjc4MDgwNywic3ViIjoiYTVlMTAxZWEtYTFmYS00ZTE3LTk2ZmItOGRiMDVmNmM2ZDNhIn0.DWJhquhRw9N9wmx3P7aOxvdV11PzLTsriB9SWLmBb1w';
const RemoteServices = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    Authorization: `Barear ${TOKEN}`,
  },
});

export default RemoteServices;
