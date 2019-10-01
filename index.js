const express = require('express');

const postsRouter = require('./data/posts/posts-router');
// const apiRouter = require('./api/api-router.js')

const server = express();

server.use(express.json());

// server.use('/api', apiRouter);
server.use('/api/posts', postsRouter); // <<<<<<<<<<<<<<

server.get('/', (req, res) => {
  res.send(`
    <h2>Lambda Hubs API</h>
    <p>Welcome to the Lambda Posts API</p>
  `);
});

// add an endpoint for adding new message to a hub

server.listen(4000, () => {
  console.log('\n*** Server Running on http://localhost:4000 ***\n');
});
