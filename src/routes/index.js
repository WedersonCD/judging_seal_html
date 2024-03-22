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
    res.clearCookie('user_token');
    res.render('login');
});

router.get('/teste',async(req,res)=>{
    res.render('teste');
    
})

router.post('/login', async (req, res) => {

    try {
        
        const user_name = req.body.user_name;
        const user_psw = req.body.user_psw;

        const response = await dataService.login({ user_name: user_name, user_psw: user_psw });

        if(!response)
            return res.status(401).send();
        
        res.cookie('user_token', response.token)
        res.status(201).send()

    } catch (err) {
        console.error(err)
        res.status(400).send()
    }

})

router.get('/index', async (req, res) => {

    if(!req.parsedCookies.user_token)
        res.redirect('/login');

    try {
        const currentMoments = await dataService.getAllMoments(req.parsedCookies.user_token);
        currentMoments.reverse()
        if (currentMoments)
            return res.render('index', { 'currentMoments': currentMoments });

        res.render('index', { 'currentMoments': [] });


    } catch (err) {
        console.error(err)
        res.status(400).json({ message: err })
    }
});


router.get('/new_moment', function (req, res) {
    res.render('new_moment', req.query);
});

router.post('/new_moment', async (req, res) =>{

    const hashtags = req.query.momentHashtag.split('#').filter(item => item.length > 1)
    const newMoment = {
        moment_name: req.query.name,
        moment_rate: req.query.rate,
        moment_description: req.query.momentDescription || '',
        moment_hashtags: hashtags

    };

    try{
        const response= dataService.createMoment(req.parsedCookies.user_token,newMoment)
        
        res.status(201).redirect('/index')

    }catch(err){
        console.error(err)
        res.status(500)
    }

});


router.post('/new_user',async (req,res)=>{

    try {
        const user_name = req.body.user_name;
        const user_psw = req.body.user_psw;
        const response = await dataService.newUser({ user_name: user_name, user_psw: user_psw });

        if(!response)
            return res.status(401).send();
        
        res.cookie('user_token', response.token)
        res.status(201).send()

    } catch (err) {
        console.error(err)
        res.status(400).send()
    }

});

module.exports = router;