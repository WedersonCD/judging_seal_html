const dataService = require('../services/dataService');

const templateController = {}

templateController.createTemplate = (req, res) => {
    const baseTemplates = [/* Your template objects here */];
    dataService.createSealTemplate(baseTemplates);
    res.end();
};

templateController.showCreateTemplate = (req, res) => {
    res.render('create_template');
};

module.exports = templateController;