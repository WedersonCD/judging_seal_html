import dataService from '../services/dataService';

const authController:any ={}

import { Request, Response } from "express";

import { RequestTrated } from "../types";

authController.login = async (req:Request, res:Response) => {
    
    try {
        const user_email = req.body.user_email;
        const user_psw = req.body.user_psw;
        const response = await dataService.login({ user_email, user_psw });

        if (!response)
            return res.status(401).send();

        res.cookie('user_token', response.token);
        res.cookie('user_id', response.user._id);
        res.status(201).send();
    } catch (err) {
        console.error(err);
        res.status(400).send();
    }
};

authController.newUser = async (req:Request, res:Response) => {
    try {
        const user_email:string    = req.body.user_email;
        const user_name:string     = req.body.user_name;
        const user_nickName:string = req.body.user_nickName || req.body.user_name;
        const user_psw:string      = req.body.user_psw;
        
        

        const response = await dataService.newUser({ user_email, user_psw });

        if (!response)
            return res.status(401).send();

        res.cookie('user_token', response.token);
        res.status(201).send();
    } catch (err) {
        console.error(err);
        res.status(400).send();
    }
};

authController.logout = (req:Request, res:Response) => {
    res.clearCookie('user_token');
    res.render('login');
};

export default authController