import axios from 'axios';

const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1OTE3NjUxMDksImV4cCI6MTU5MTc3MjMwOSwic3ViIjoiOWUyOThiODAtZWQ2Yi00MjhiLWIzODMtZmZlMTYyZDdhZDhjIn0.rGu5dVC2lzGihrlSs4JjjTZEpE68jVJXhlPsP-OUuIw';
const RemoteServices = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    Authorization: `Barear ${TOKEN}`,
  },
});

export default RemoteServices;
