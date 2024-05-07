import express from 'express'
const router = express.Router();
import sealController from '../controllers/sealController';

// Routes for creating and deleting seals
router.post('/new_seal', sealController.createSeal);
router.delete('/seals', sealController.deleteSeal);

router.put('/seals/:sealId', sealController.putSeal);

router.get('/ocean', sealController.openOcean);
router.get('/new_seal', sealController.newSeal);
router.get('/update_seal/:sealId',sealController.updateSeal)

router.get('/seals/:sealId', sealController.getSealById);

export default router;
