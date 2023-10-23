const router = require('express').Router();
const { Product, Outfit, OutfitProducts, Category, User } = require('../models');
const authCheck = require('../utils/auth');

// Displaying user data
router.get('/', async (req, res) => {
    try {
        // Finding user's saved outfits
        const userData = await Outfit.findAll({
            where: { user_id: req.session.user_id },
            include: [{ model: Product, through: OutfitProducts }]
        });

        if (!userData) {
            res.status(404).json({ message: 'Error finding user data.' })
        };

        const outfits = userData.map((outfit) => outfit.get({ plain: true }));

        // For outfit editing
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

        // Accessories
        const accessoryData = await Product.findAll({
            where: { category_id: 4 },
            include: { model: Category }
        });

        if(!accessoryData) {
            res.status(404).json({ message: 'Could not find products matching this category.' })
        };

        const accessories = accessoryData.map((product) => product.get({ plain: true }));

        // One piece
        const onepieceData = await Product.findAll({
            where: { category_id: 5 },
            include: { model: Category }
        });

        if(!onepieceData) {
            res.status(404).json({ message: 'Could not find products matching this category.' })
        };

        const onesies = onepieceData.map((product) => product.get({ plain: true }));

        // Render all of the above to dashboard
        res.render('dashboard', { outfits, tops, bottoms, shoes, accessories, onesies });

    } catch (err) {
        res.status(500).json(err);
    }
});