const express = require('express');
const router = express.Router();
const sealController = require('../controllers/sealController');

// Routes for creating and deleting seals
router.post('/new_seal', sealController.createSeal);
router.delete('/seals', sealController.deleteSeal);

router.get('/ocean', sealController.openOcean);

router.get('/new_seal', sealController.newSeal);

module.exports = router;
