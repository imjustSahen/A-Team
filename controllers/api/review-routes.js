const router = require('express').Router();
const { User, Pairing, Review, Comment } = require('../../models');

//localhost:3001/api/review
router.get('/', async (req, res) => {
    try {
        const reviewData = await Review.findAll({
            attributes: {exclude: ['pairing_id', 'user_id']},
            include: [
             {
              model: Pairing,
              attributes: {exclude: ['id']}
              },
              {
              model: User,
              attributes: {exclude: ['id', 'password']}
              },
              {
              model: Comment,
              attributes: {exclude: ['user_id']}
              }
            ]
        });

        const reviews = await reviewData.map((review) => review.get({ plain: true}));

        res.status(200).json(reviews);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const reviewData = await Review.create({
          rating: req.body.rating,
          review_text: req.body.review_text,
          user_id: req.body.user_id
        });
        
        res.status(200).json(reviewData);
    } catch(err) {
        res.status(500).json(err);
    }
});

//get post by id
router.get('/:id', async (req, res) => {
    try {
        const reviewData = await Review.findByPk(req.params.id);

        if (!reviewData) {
            res.status(404).json({ message: 'No review found with that id' });
            return;
        };

        res.status(200).json(reviewData);
    } catch (err) {
        res.status(500).json(err);
    }
});


router.put('/:id', async (req, res) => {
    try{
      const reviewData = await Review.update(req.body, {
        where: {id: req.params.id}
      });
  
      if (!reviewData) {
        res.status(404).json({message: "No review found with that id"});
        return;
      };
  
      res.status(202).json(reviewData);
    } catch (err) {
      res.status(500).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try{
      const reviewData = await Review.destroy({
        where: {id: req.params.id}
      });
  
      if (!reviewData) {
        res.status(404).json({message: 'No review found with that id'});
        return;
      };
  
      res.status(200).json(reviewData);
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router ;