const router = require('express').Router();
const { Outfit, OutfitProducts } = require('../../models');

// Create new outfit
router.post('/', async (req, res) => {
    /* req.body example:
        {
            outfit_name: "Example",
            productIds: [1, 2, 3]
        }
    */
    try {
        const newFit = await Outfit.create({
            ...req.body,
            user_id: req.session.user_ud
        });

        if (newFit) {
            const productArr = req.body.productIds;
            const newFitProducts = productArr.map((productId) => ({ outfit_id: newFit.id, product_id: productId }));
            await OutfitProducts.bulkCreate(newFitProducts);

            res.status(201).json(newFit);
        } else {
            res.status(400).json({ message: 'Failed to create new outfit, please try again.' });
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete user outfit
router.delete('/:id', async (req, res) => {
    try {
        const deleteFit = await Outfit.delete({
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            }
        });

        if (!deleteFit) {
            res.status(404).json({ message: 'Requested ID not found.' })
        };

        res.status(200).json(deleteFit);

    } catch (err) {
        res.status(500).json(err);
    }
});

// Post route for liking an outfit
router.post('/like/:id', async (req, res) => {
    try {
        const fitData = await Outfit.findByPk(req.params.id);
        if (fitData) {
            fitData.likes += 1;
            await fitData.save();
            await res.status(200).json({ message: 'Outfit liked!' });
        } else {
            res.status(404).json({ message: 'Outfit with specified ID not found.' })
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// Post comment about an outfit
// May add later
// router.post('/comment', async (req, res) => {});