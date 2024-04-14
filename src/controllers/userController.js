const dataService = require('../services/dataService');

const userController = {}

function setUserCookie(res,response){

    res.cookie('user_token', response.token);
    res.cookie('user_id', response.user._id);
}

userController.login = async (req, res) => {
    try {
        const { user_name, user_psw } = req.body;
        const response = await dataService.login({ user_name, user_psw });

        if (!response)
            return res.status(401).send();

        setUserCookie(res,response);

        res.status(201).send();
    } catch (err) {
        console.error(err);
        res.status(400).send();
    }
};

userController.newUser = async (req, res) => {
    try {
        const { user_name, user_psw } = req.body;
        const response = await dataService.newUser({ user_name, user_psw });

        if (!response)
            return res.status(401).send();

        setUserCookie(res,response);

        res.status(201).send();
    } catch (err) {
        console.error(err);
        res.status(400).send();
    }
};

module.exports = userController
