var express = require('express');
var router = express.Router();
const dataService = require('../services/dataService');
const UTILS = require('../services/utils');



router.post('/create_template',(req,res)=>{

    const baseTemplates = [
        {
            "sealTemplate_question": "How was your day?",
            "seal_name": "Daily Routine",
            "seal_hashtags": ["Day"],
            "seal_description": ""
        },
        {
            "sealTemplate_question": "How was your sleep night?",
            "seal_name": "Sleep Night",
            "seal_hashtags": ["Night", "Sleep"],
            "seal_description": ""
        },
        {
            "sealTemplate_question": "How your book reading is going",
            "seal_name": "Books",
            "seal_hashtags": ["Reading","Books"],
            "seal_description": ""
        },
        {
            "sealTemplate_question": "how was your work day?",
            "seal_name": "Day of Work",
            "seal_hashtags": ["Day Routine","work"],
            "seal_description": ""
        }];
        
        dataService.createSealTemplate(baseTemplates);
        res.end()

})


router.get('/ocean',async (req,res)=>{

    try {
        const seals = await dataService.getOcean(req.parsedCookies.user_token);

        seals.forEach(seal => {
            //get shareableText
            seal.shareableText=UTILS.getShareableText(seal);

            //add date property
            seal.date=UTILS.dateTimeStringToDate(seal.seal_updatedAt);
            
            //flag to mark the seal as the author
            seal.is_the_author = req.parsedCookies.user_id === seal.user
        })

        //sorte by date
        seals.sort((a, b) => a.seal_updatedAt > b.seal_updatedAt ? -1 : 1)
        
        res.render('ocean',{seals:seals});

    } catch (error) {
        console.error(error)
        res.status(400).send()
    }


})

router.get('/create_template',(req,res)=>{
    res.render('create_template');

})

router.get('/', (req, res) => {

    return res.redirect('/ocean');

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
        
        res.cookie('user_token', response.token);
        res.cookie('user_id', response.user._id);

        res.status(201).send();

    } catch (err) {
        console.error(err)
        res.status(400).send()
    }

})

router.get('/index', async (req, res) => {

    if(!req.parsedCookies.user_token)
        return res.redirect('/login');

    return res.redirect('/ocean');

    try {
        const currentSeals = await dataService.getAllSeals(req.parsedCookies.user_token);
        
        if (!currentSeals)
            res.render('index', { 'currentSeals': [] });
        
        currentSeals.reverse();

        currentSeals.forEach(seal => seal.shareableText=UTILS.getShareableText(seal))

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
        
        res.status(201).redirect('/ocean')

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
