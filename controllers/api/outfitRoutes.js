const router = require('express').Router();
const { Outfit } = require('../../models');

// Create new outfit
router.post('/', async (req, res) => {
    try {
        const newOutfit = await Outfit.create(req.body);

        res.status(200).json(newOutfit);

    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete user outfit