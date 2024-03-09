var express = require('express');
var router = express.Router();
const dataService = require('../services/dataService');


router.get('/',  async (req, res) =>{
    const currentMoments = await dataService.getAllMoments();
    res.render('index',{'currentMoments':currentMoments});
});

router.get('/new_moment', function (req, res) {
    res.render('new_moment', req.query);
});

router.post('/new_moment', function (req, res) {
    
    const hashtags=req.query.momentHashtag.split('#').filter(item => item.length>1)

    const newMoment = {
        moment_name: req.query.name,
        moment_rate: req.query.rate,
        moment_hashtags: hashtags,
    };

    dataService.createMoment(newMoment)
        .then((createdMoment) => {
            console.log('New moment created!');
            res.json(createdMoment)
        })
        .catch((err) => {
            res.statusCode(500)
        });
});

module.exports = router;