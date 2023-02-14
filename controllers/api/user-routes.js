const router = require('express').Router();
const { User, Pairing, Review, Comment } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll({
            attributes: {exclude: ['password']},
            include: [
              {
              model: Pairing
              },
              {
              model: Review,
              attributes: ['id', 'review_text', 'pairing_id']
              },
              {
              model: Comment,
              attributes: {exclude: ['user_id']}
              }
            ]
        });

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

        const userData = await User.findByPk(req.params.id, {
          attributes: {exclude: ['password']},
          include: [
            {
            model: Pairing
            },
            {
            model: Review,
            attributes: ['id', 'review_text', 'pairing_id']
            },
            {
            model: Comment,
            attributes: {exclude: ['user_id']}
            }
          ]
        });

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

router.post('/login', async (req, res) => {
  try{
    const userData = await User.findOne({ where: {email: req.body.email}});

    if (!userData) {
      res.status(400).json({message: 'Incorrect email or password. Please try again.'});
      return;
    };

    const validatePassword = await userData.checkPassword(req.body.password);

    if (validatePassword) {
      res.status(400).json({message: '**invalid pass. Incorrect email or password. Please try again.'});
      return;
    };

    res.json({user: userData, message: 'You are now logged in!'});
  }catch (err){
    res.status(500).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    })
  } else {
    res.status(404).end();
  }
})
module.exports = router ;