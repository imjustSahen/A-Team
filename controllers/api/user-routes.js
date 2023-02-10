const router = require('express').Router();
const { User, Pairing, Review, Comment } = require('../../models');

//localhost:3001/api/user
router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll({
            include: [Pairing, Review, Comment]
        });

        //serialize the data
        const users = await userData.map((user) => user.get({ plain: true }));

        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const userData = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });

        res.status(200).json(userData);
    } catch(err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {

        const userData = await User.findByPk(req.params.id);

        if (!userData) {
            res.status(404).json({ message: 'No user found with that id' });
            return;
        };

        res.status(200).json(userData)
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:id', async (req, res) => {
    try{
      const userData = await User.update(req.body, {
        where: {id: req.params.id}
      });
  
      if (!userData) {
        res.status(404).json({message: "No user found with that id"});
        return;
      };
  
      res.status(202).json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try{
      const userData = await User.destroy({
        where: {id: req.params.id}
      });
  
      if (!userData) {
        res.status(404).json({message: 'No user found with that id'});
        return;
      };
  
      res.status(200).json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router ;