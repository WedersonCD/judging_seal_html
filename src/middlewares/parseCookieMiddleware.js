async function parseCookieMiddleware(req, res, next) {
    
    const headerCookies = req.headers.cookie;

    if(!headerCookies)
        return next();

    const parsedCookies = {}    

    headerCookies.split(';').forEach(pair =>{
        const index = pair.indexOf('=');

            const key = pair.substring(0, index).trim();
            const value = decodeURIComponent(pair.substring(index + 1).trim());
            parsedCookies[key] = value;
    })

    req.parsedCookies = parsedCookies
    next();
}    

module.exports = parseCookieMiddleware;
