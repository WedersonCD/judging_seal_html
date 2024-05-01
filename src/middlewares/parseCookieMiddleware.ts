import { Response, NextFunction} from 'express'
import { ParsedCookies, RequestTrated } from '../types';

async function parseCookieMiddleware(req:RequestTrated, res:Response, next:NextFunction) {
    
    const headerCookies = req.headers.cookie;

    if(!headerCookies)
        return next();

    const parsedCookies:any = {}    

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
