const dataService = require('../services/dataService');
const UTILS = require('../services/utils');

const sealController = {};

sealController.newSeal = (req, res) => {
    req.query.is_new = true
    res.render('new_seal', req.query);
};

sealController.updateSeal = async (req, res) => {

    try {
        let seal = await dataService.getSealById(req.params.sealId, req.parsedCookies.user_token)

        if (!seal)
            return res.status(404).send();

        return res.render('new_seal', { is_new: false, seal: seal });

    } catch (error) {
        console.error(error);
        res.status(400).send();
    }

};

sealController.putSeal = async (req, res) => {
    try {
        const hashtags = req.query.sealHashtag.split('#').filter(item => item.length > 1);

        const seal = {
            _id: req.params.sealId,
            seal_name: req.query.name,
            seal_rate: req.query.rate,
            seal_description: req.query.sealDescription || '',
            seal_hashtags: hashtags
        };

        const response = await dataService.updateSeal(req.parsedCookies.user_token, seal);

        if (response)
            res.status(200).send();

    } catch (error) {
        console.error(error);
        res.status(400).send();
    }

}

sealController.getSealById = async (req, res) => {

    try {
        const seal = await dataService.getSealById(req.params.sealId, req.parsedCookies.user_token);

        if (!seal)
            return res.status(404).send();

        const sealVisible = {
            seal_name: seal.seal_name,
            seal_rate: seal.seal_rate,
            seal_hashtags: seal.seal_hashtags.map(hashtag => '#' + hashtag).join(','),
            seal_description: seal.seal_description
        }

        return res.status(200).json(sealVisible);

    } catch (error) {
        console.error(error);
        res.status(400).send();

    }



}

sealController.openOcean = async (req, res) => {
    try {
        const seals = await dataService.getOcean(req.parsedCookies.user_token);

        seals.forEach(seal => {
            seal.shareableText = UTILS.getShareableText(seal);
            seal.date = UTILS.dateTimeStringToDate(seal.seal_updatedAt);
            seal.is_the_author = req.parsedCookies.user_id === seal.user;
        });
        seals.sort((a, b) => a.seal_updatedAt > b.seal_updatedAt ? -1 : 1);
        res.render('ocean', { seals });
    } catch (error) {
        console.error(error);
        res.status(400).send();
    }
};

sealController.createSeal = async (req, res) => {
    const hashtags = req.query.sealHashtag.split('#').filter(item => item.length > 1);
    const newSeal = {
        seal_name: req.query.name,
        seal_rate: req.query.rate,
        seal_description: req.query.sealDescription || '',
        seal_hashtags: hashtags
    };
    try {
        const response = dataService.createSeal(req.parsedCookies.user_token, newSeal);
        res.status(201).redirect('/ocean');
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
};

sealController.deleteSeal = async (req, res) => {
    try {
        const sealId = req.query.sealId;
        if (!sealId)
            return res.status(400).json({ message: 'bad request missing sealId' });

        const response = dataService.deleteSeal(req.parsedCookies.user_token, sealId);
        if (!response) {
            console.error('Fail in delete seal route');
            return res.status(400).send();
        }
        res.status(200).send();
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
};

module.exports = sealController