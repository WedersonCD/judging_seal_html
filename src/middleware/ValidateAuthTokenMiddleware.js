async function validadteAuthTokenMiddleware(req, res, next) {

    //don't run this middleware on login endpoint
    console.log(req.path)
    if (req.path === '/login')
        return next();

    if (req.parsedCookies?.user_id && req.parsedCookies?.user_token)
        return next();
    
    return res.redirect('/login');
    
}

module.exports = validadteAuthTokenMiddleware;
