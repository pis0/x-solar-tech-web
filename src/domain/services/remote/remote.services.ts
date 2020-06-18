import axios from 'axios';

const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1OTI0NDYzNDksImV4cCI6MTU5MjQ1MzU0OSwic3ViIjoiNTRmZDdlMDUtMDhmZC00NzY4LWI1ZDktYTc1YzIyZjA0NTcxIn0.zQB2D0bB2UPIhLGErWSTFUCmWZdaPDeHZh2HhwgzoRQ';
const RemoteServices = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    Authorization: `Barear ${TOKEN}`,
  },
});

export default RemoteServices;
