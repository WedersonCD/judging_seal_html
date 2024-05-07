import express from 'express'
const router = express.Router();
import TemplateController from '../controllers/templateController';

// Route for creating base templates
router.post('/create_template', TemplateController.createTemplate);
router.get('/create_template', TemplateController.showCreateTemplate);

export default router;
