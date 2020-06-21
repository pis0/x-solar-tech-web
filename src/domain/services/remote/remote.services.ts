import axios from 'axios';

const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1OTI3NTc1MzIsImV4cCI6MTU5Mjc2NDczMiwic3ViIjoiYTVlMTAxZWEtYTFmYS00ZTE3LTk2ZmItOGRiMDVmNmM2ZDNhIn0.HcI3Vy0rFe2uPZAIHKis637f1S9IQZbmZh-34EO7AQs';
const RemoteServices = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    Authorization: `Barear ${TOKEN}`,
  },
});

export default RemoteServices;
