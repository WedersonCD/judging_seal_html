
import { Response,NextFunction } from "express";
import { RequestTrated } from "../types";

async function validadteAuthTokenMiddleware(req: RequestTrated, res:Response, next:NextFunction) {

    //don't run this middleware on login endpoint
    if (req.path === '/login')
        return next();

    if (req.parsedCookies?.user_id && req.parsedCookies?.user_token)
        return next();
    
    return res.redirect('/login');
    
}

module.exports = validadteAuthTokenMiddleware;
