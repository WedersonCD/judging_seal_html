var express = require('express');
var router = express.Router();
const dataService = require('../services/dataService');


router.get('/', (req, res) => {

    if (!req.parsedCookies)
        res.redirect('login');
    else
        res.redirect('/index')

});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', async (req, res) => {

    try {
        const user_name = req.body.user_name;
        const user_psw = req.body.user_psw;

        const response = await dataService.login({ user_name: user_name, user_psw: user_psw });

        if(!response)
            return res.status(401)

        res.cookie('user_token', response.token)

        res.redirect('/index')

    } catch (err) {
        console.error(err)
        res.status(400).json({ message: err })
    }

})


router.get('/index', async (req, res) => {

    if(!req.parsedCookies.user_token)
        res.redirect('/login');

    try {
        const currentMoments = await dataService.getAllMoments(req.parsedCookies.user_token);

        if (currentMoments)
            return res.render('index', { 'currentMoments': currentMoments });

        res.status(400).send('deu ruim')


    } catch (err) {
        console.error(err)
        res.status(400).json({ message: err })
    }
});


router.get('/new_moment', function (req, res) {
    res.render('new_moment', req.query);
});

router.post('/new_moment', function async (req, res) {

    const hashtags = req.query.momentHashtag.split('#').filter(item => item.length > 1)

    const newMoment = {
        moment_name: req.query.name,
        moment_rate: req.query.rate,
        moment_hashtags: hashtags,
    };

    try{
        const response= dataService.createMoment(req.parsedCookies.user_token,newMoment)
        
        res.send(201).json(response)
        res.redirect('/index');

    }catch(err){
        console.error(err)
        res.status(500)
    }

});



module.exports = router;