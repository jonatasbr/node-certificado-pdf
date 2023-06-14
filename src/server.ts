import express from 'express';

const app = express();
app.get('/', (request, response) => {
  return response.json({ message: 'olá, template node' });
});
app.listen(3333);

console.log('Application running on port 3333');
