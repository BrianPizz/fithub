const router = require('express').Router();
const { User, Outfit } = require('../models');
// Will add authCheck to routes later
const authCheck = require('../utils/auth');

router.get('/', async (req, res) => {
    // Load landing page. Slide 4 of presentation.
    console.log('Landing Page')
});

router.get('/homepage', async (req, res) => {
    // Load home page. Slide 6.
    console.log('Home Page')
})

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/homepage');
      return;
    }
    // Match login handlebars filename
    res.render('login');
  });