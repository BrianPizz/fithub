const router = require('express').Router();
const { Product, Outfit, OutfitProducts, Category, User } = require('../models');
// Add authCheck to routes later
const authCheck = require('../utils/auth');

// Displaying landing page. Slide 4 of proposal.
router.get('/', async (req, res) => {
    res.render('landing');
});

// Displaying homepage. Slide 6.
router.get('/homepage', async (req, res) => {
    
    // Finding top 3 most liked outfits to display on homepage.
    // Need likes column in outfits model.

    try {
        const topFits = await Outfit.findAll({
            order: [['likes', 'DESC']],
            limit: 3,
            include: [{ model: Product, through: OutfitProducts }]
        });

        if (!topFits) {
            res.status(404).json({ message: 'Error finding top outfits data.' })
        }

        const outfits = topFits.map((outfit) => outfit.get({ plain: true }));

        res.render('homepage', { outfits });

    } catch (err) {
        res.status(500).json(err);
    }
});

// Route to page where user can create a new outfit.
router.get('/create', async (req, res) => {
    try {

        // Finding all products for each category of clothing to display.
        // Need to rewrite after seeds and handlebars finished (category_id and url/view).

        // Tops
        const topData = await Product.findAll({
            where: { category_id: 1 },
            include: { model: Category }
        });

        if(!topData) {
            res.status(404).json({ message: 'Could not find products matching this category.' })
        };

        const tops = topData.map((product) => product.get({ plain: true }));
        
        // Bottoms
        const bottomData = await Product.findAll({
            where: { category_id: 2 },
            include: { model: Category }
        });

        if(!bottomData) {
            res.status(404).json({ message: 'Could not find products matching this category.' })
        };

        const bottoms = bottomData.map((product) => product.get({ plain: true })); 

        // Shoes
        const shoeData = await Product.findAll({
            where: { category_id: 3 },
            include: { model: Category }
        });

        if(!shoeData) {
            res.status(404).json({ message: 'Could not find products matching this category.' })
        };

        const shoes = shoeData.map((product) => product.get({ plain: true })); 


        res.render('create', { tops, bottoms, shoes });

    } catch (err) {
        res.status(500).json(err);
    }
});

// Route for top outfits page, displaying comments
router.get('/topfits', async (req, res) => {
    try {
        // Top outfit data
        const topFits = await Outfit.findAll({
            order: [['likes', 'DESC']],
            limit: 3,
            include: [{ model: Product, through: OutfitProducts }]
        });

        if (!topFits) {
            res.status(404).json({ message: 'Error finding top outfits data.' })
        }

        const outfits = topFits.map((outfit) => outfit.get({ plain: true }));

        // Get saved comments data if needed from a different table.

        res.render('topfits', { outfits });

    } catch (err) {
        res.status(500).json(err);
    }
})

// Displaying login page
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/homepage');
        return;
    }
    // Match to login handlebars filename
    res.render('login');
});