const express = require('express');
const cors = require('cors')
const postsRouter = require('./data/posts/posts-router');
// const apiRouter = require('./api/api-router.js')

const server = express();
server.use(cors());
server.use(express.json());

// server.use('/api', apiRouter);
server.use('/api/posts', postsRouter); // <<<<<<<<<<<<<<

server.get('/', (req, res) => {
  res.send(`
    <h2>Lambda Posts API</h>
    <p>Welcome to the Lambda Posts API</p>
  `);
});


// add an endpoint for adding new message to posts

server.listen(4000, () => {
  console.log('\n*** Server Running on http://localhost:4000 ***\n');
});
