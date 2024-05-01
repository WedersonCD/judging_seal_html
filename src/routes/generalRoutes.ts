import express from 'express'
const router = express.Router();

// General page routes
router.get('/', (req, res) => {
    return res.redirect('/ocean');
});


router.get('/login', (req, res) => {
    res.clearCookie('user_token');
    res.clearCookie('user_id');
    
    res.render('login');
});

router.get('/teste', (req, res) => {
    res.render('teste');
});


module.exports = router;
