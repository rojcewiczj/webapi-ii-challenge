const express = require('express');

const Posts = require('../db');

const router = express.Router();

// any url that begins with /api/posts
router.get('/', (req, res) => {
  Posts.find(req.query)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'The posts information could not be retrieved.',
      });
    });
});

// the same as /api/posts/:id
router.get('/:id', (req, res) => {
 const id = req.params.id;
 Posts.findById(id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: 'The post with the specified ID does not exist.' });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        error: '"The comments information could not be retrieved."',
      });
    });
});

// the same as /api/posts/
router.post('/', (req, res) => {
    const userPosts = req.body
 // NEVER TRUST THE CLIENT!!!!!
 if (!userPosts.title || !userPosts.contents) {
    res.status(400).json({ errorMessage: 'Please provide title and contents for the post.' });
  } else {
      Posts.insert(userPosts)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        error: 'There was an error while saving the post to the database',
      });
    });
}
});
router.post('/:id/comments', (req, res) => {
    const id = req.params.id;
    const userComments = req.body
 // NEVER TRUST THE CLIENT!!!!!
 if (!userComments.text ) {
    res.status(400).json({ errorMessage: 'Please provide text for the comment.' });
  } else {
      Posts.insert(id, userComments)
    .then(post => {
        if(!post) {
            res.status(404).json({ message: 'The post with the specified ID does not exist.' });
          }
      res.status(201).json(post);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        error: 'There was an error while saving the comment to the database',
      });
    });
}
});

router.delete('/:id', (req, res) => {
    const id = req.params.id
  Posts.remove(id)
    .then(post => {
        if(!post) {
            res.status(404).json({ message: 'The post with the specified ID does not exist.' });
          }
              // send the user back to the client
              res.json(post); //.json() will set the right headers and convert to JSON
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'The post could not be removed',
      });
    });
});

router.put('/:id', (req, res) => {
  const changes = req.body;
  const id = req.params.id
  if  (!changes.title || !changes.content) {
    res.status(400).json({ errorMessage: 'Please provide title and content for the user.' });
  }
  else {
  Posts.update(id , changes)
    .then(post => {
        if(!post) {
            res.status(404).json({ message: 'The post with the specified ID does not exist.' });
          }
        
              res.status(200);
              res.json(post); //.json() will set the right headers and convert to JSON
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'The post information could not be modified.',
      });
    });
}
});

// add an endpoint that returns all the messages for a hub
router.get('/:id/comments', (req, res) => {
    const id = req.params.id;
  Posts.findCommentById(id)
    .then(comment => {
        if(!comment) {
            res.status(404).json({ message: 'The comment with the specified ID does not exist.' });
          } 
              res.send(comment);
            
    })
    .catch(error => {
      res.status(500).json({ message: 'error getting comment' });
    });
});

// export default router;
module.exports = router;
