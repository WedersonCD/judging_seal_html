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
        const currentSeals = await dataService.getAllSeals(req.parsedCookies.user_token);
        
        if (!currentSeals)
            res.render('index', { 'currentSeals': [] });
        
        currentSeals.reverse();
        const sealsTemplate = await dataService.getAllSealTemplates();

        return res.render('index', { 'currentSeals': currentSeals,'sealsTemplate': sealsTemplate});

    } catch (err) {
        console.error(err)
        res.status(400).json({ message: err })
    }
});

router.delete('/seals',(req,res)=>{

    try {
        const sealId = req.query.sealId;

        if(!sealId)
            return res.status(400).json({message: 'bad request missing sealId'});
        
        const response= dataService.deleteSeal(req.parsedCookies.user_token,sealId)

        if(!response){
            console.error('Fail in delete seal route');
            res.status(400).send();
        }

        res.status(200).send();

    }catch(err){
        console.error(err)
        res.status(500).send()
    }


});
router.get('/new_seal', function (req, res) {
    res.render('new_seal', req.query);
});

router.post('/new_seal', async (req, res) =>{

    const hashtags = req.query.sealHashtag.split('#').filter(item => item.length > 1)

    const newSeal = {
        seal_name: req.query.name,
        seal_rate: req.query.rate,
        seal_description: req.query.sealDescription || '',
        seal_hashtags: hashtags
    };

    try{
        const response= dataService.createSeal(req.parsedCookies.user_token,newSeal)
        
        res.status(201).redirect('/index')

    }catch(err){
        console.error(err)
        res.status(500).send()
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