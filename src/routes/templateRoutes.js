const express = require('express');
const router = express.Router();
const TemplateController = require('../controllers/templateController');

// Route for creating base templates
router.post('/create_template', TemplateController.createTemplate);
router.get('/create_template', TemplateController.showCreateTemplate);

module.exports = router;
