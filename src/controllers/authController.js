const dataService = require('../services/dataService');

const authController ={}

authController.login = async (req, res) => {
    
    try {
        const user_name = req.body.user_name;
        const user_psw = req.body.user_psw;
        const response = await dataService.login({ user_name, user_psw });

        if (!response)
            return res.status(401).send();

        res.cookie('user_token', response.token);
        res.cookie('user_id', response.user._id);
        res.status(201).send();
    } catch (err) {
        console.error(err);
        res.status(400).send();
    }
};

authController.newUser = async (req, res) => {
    try {
        const user_name = req.body.user_name;
        const user_psw = req.body.user_psw;
        const response = await dataService.newUser({ user_name, user_psw });

        if (!response)
            return res.status(401).send();

        res.cookie('user_token', response.token);
        res.status(201).send();
    } catch (err) {
        console.error(err);
        res.status(400).send();
    }
};

authController.logout = (req, res) => {
    res.clearCookie('user_token');
    res.render('login');
};

module.exports = authController