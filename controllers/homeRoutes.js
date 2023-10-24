const router = require('express').Router();
const { Product, Outfit, OutfitProducts, Category } = require('../models');
// Add authCheck to routes later
const authCheck = require('../utils/auth');

// Displaying landing page. Slide 4 of proposal.
router.get('/', async (req, res) => {
    res.render('landing', {layout: false});
});

// Displaying user's saved outfits
router.get('/yours', async (req, res) => {
    try {
        const userData = await Outfit.findAll({
            where: { user_id: req.session.user_id },
            include: [{ model: Product, through: OutfitProducts }]
        });

        if (!userData) {
            res.status(404).json({ message: 'Error finding user data.' })
        };

        const outfits = userData.map((outfit) => outfit.get({ plain: true }));

        res.render('yours', { outfits });

    } catch (err) {
        res.status(500).json(err);
    }
});

// Route to page where user can create a new outfit.
router.get('/create', async (req, res) => {
    try {

        // Finding all products for each category of clothing to display.
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

        // One piece
        const onepieceData = await Product.findAll({
            where: { category_id: 4 },
            include: { model: Category }
        });

        if (!onepieceData) {
            res.status(404).json({ message: 'Could not find products matching this category.' })
        };

        const onesies = onepieceData.map((product) => product.get({ plain: true }));

        // Accessories
        const accessoryData = await Product.findAll({
            where: { category_id: 5 },
            include: { model: Category }
        });

        if(!accessoryData) {
            res.status(404).json({ message: 'Could not find products matching this category.' })
        };

        const accessories = accessoryData.map((product) => product.get({ plain: true }));

        res.render('create', { tops, bottoms, shoes, accessories, onesies });

    } catch (err) {
        res.status(500).json(err);
    }
});

// Route for top outfits page
router.get('/top', async (req, res) => {
    try {
        // Top outfit data
        const topFits = await Outfit.findAll({
            order: [['likes', 'DESC']],
            // limit: 3,
            include: [{ model: Product, through: OutfitProducts }]
        });

        if (!topFits) {
            res.status(404).json({ message: 'Error finding top outfits data.' })
        }

        const outfits = topFits.map((outfit) => outfit.get({ plain: true }));

        res.render('top', { outfits });

    } catch (err) {
        res.status(500).json(err);
    }
})

// Displaying login page
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/top');
        return;
    }

    res.render('login', { layout: false });
});

module.exports = router;
