const router = require('express').Router();
const { User, Pairing, Review, Comment } = require('../../models')

//get all posts
//localhost:3001/api/comment
router.get('/', async (req, res) => {
    try {
        const commentData = await Comment.findAll({
            include: [ User, Pairing, Review ]
        });

        //serialize the data
        const comments = await commentData.map((comment) => comment.get({ plain: true }));

        res.status(200).json(comments)
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const commentData = await Comment.create({
          comment_text: req.body.comment_text
        });
        
        res.status(200).json(commentData)
    } catch(err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const commentData = await Comment.findByPk(req.params.id);

        if (!commentData) {
            res.status(404).json({ message: 'No comment found with that id' });
            return;
        };

        res.status(200).json(commentData)
    } catch (err) {
        res.status(500).json(err);
    }
});


router.put('/:id', async (req, res) => {
    try{
      const commentData = await Comment.update(req.body, {
        where: {id: req.params.id}
      });
  
      if (!commentData) {
        res.status(404).json({message: "No comments found with that id"});
        return;
      };
  
      res.status(202).json(commentData);
    } catch (err) {
      res.status(500).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try{
      const commentData = await Comment.destroy({
        where: {id: req.params.id}
      });
  
      if (!commentData) {
        res.status(404).json({message: 'No comments found with that id'});
        return;
      };
  
      res.status(200).json(commentData);
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router ;