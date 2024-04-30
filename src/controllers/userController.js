const dataService = require('../services/dataService');
const UTILS = require('../services/utils');

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

userController.profile= async (req,res)=>{
    try {

        const seals = await dataService.getAllSeals(req.parsedCookies.user_token);

        seals.forEach(seal => {
            seal.shareableText = UTILS.getShareableText(seal);
            seal.date = UTILS.dateTimeStringToDate(seal.seal_updatedAt);
            seal.is_the_author = req.parsedCookies.user_id === seal.user;
        });

        seals.sort((a, b) => a.seal_updatedAt > b.seal_updatedAt ? -1 : 1);
        
        const qtdSeals = seals.length;
        const qtdStars = seals.reduce((totalStarts,seal) => totalStarts+seal.seal_rate,0);

        const starLineChartOption = JSON.stringify(UTILS.getStarLineChartOption(seals))
        
        const user = await dataService.getUser(req.parsedCookies.user_token,req.parsedCookies.user_id);
        console.log(user)
        res.render('profile', { seals:seals,qtdSeals:qtdSeals,qtdStars:qtdStars,starLineChartOption:starLineChartOption,user:user});
        
    } catch (error) {
        console.error('Error get seals list:', error);
        throw error;
    }
}

module.exports = userController
