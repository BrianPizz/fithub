const router = require('express').Router();
const { User, Outfit } = require('../models');
// Add authCheck to routes later
const authCheck = require('../utils/auth');

router.get('/', async (req, res) => {
    // Display landing page. Slide 4 of presentation.
    // res.render('landing');
    console.log('Landing Page');
});

router.get('/homepage', async (req, res) => {
    // Display home page. Slide 6.
    // Need to find top 3 most liked outfits
    try {
        sql = `
        SELECT * FROM Outfit
        ORDER BY likes DESC
        LIMIT 3
        `
        const topFits = await sequelize.query(sql, {
            type: QueryTypes.SELECT,
            model: Outfit,
        });

        if(!topFits) {
            res.status(404).json({ message: 'Error finding top outfits data.' })
        }

        const outfits = topFits.map((outfit) => outfit.get({ plain: true }));

        res.render('homepage', { outfits });
        
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/homepage');
        return;
    }
    // Match login handlebars filename
    res.render('login');
});