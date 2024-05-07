import dataService from '../services/dataService';
import UTILS from '../services/utils';

const userController:any = {}

import { Request,Response } from "express";
import { RequestTrated,Seal,User,UserLogin,UserNew } from "../types";

function setUserCookie(res:any, response:any){

    res.cookie('user_token', response.token);
    res.cookie('user_id', response.user._id);
}

userController.login = async (req:Request, res:Response) => {
    try {
        
        const userLogin:UserLogin ={
            user_email:req.body.user_email,
            user_psw:req.body.user_psw
        }

        const response = await dataService.login(userLogin);

        if (!response)
            return res.status(401).send();

        setUserCookie(res,response);

        res.status(201).send();
    } catch (err) {
        console.error(err);
        res.status(400).send();
    }
};

userController.newUser = async (req:RequestTrated, res:Response) => {
    try {

        const newUser:UserNew = {
            user_email: req.body.user_email,
            user_psw: req.body.user_psw,
            user_name:req.body.user_name,
            user_nickName:req.body.user_nickName
        }

        const response = await dataService.newUser(newUser);

        if (!response)
            return res.status(401).send();

        setUserCookie(res,response);

        res.status(201).send();
    } catch (err) {
        console.error(err);
        res.status(400).send();
    }
};

userController.profile= async (req:RequestTrated, res:Response)=>{
    try {

        const seals:Seal[] = await dataService.getAllSeals(req.parsedCookies.user_token);

        seals.forEach((seal:Seal) => {
            seal.shareableText = UTILS.getShareableText(seal);
            seal.date = UTILS.dateTimeStringToDate(seal.seal_updatedAt);
            seal.is_the_author = req.parsedCookies.user_id === seal.user;
        });

        seals.sort((a:Seal, b:Seal) => a.seal_updatedAt > b.seal_updatedAt ? -1 : 1);
        
        const qtdSeals = seals.length;
        const qtdStars = seals.reduce((totalStarts:number,seal:Seal) => totalStarts+seal.seal_rate,0);

        const starLineChartOption = JSON.stringify(UTILS.getStarLineChartOption(seals))
        
        const user = await dataService.getUser(req.parsedCookies.user_token,req.parsedCookies.user_id);
        res.render('profile', { seals:seals,qtdSeals:qtdSeals,qtdStars:qtdStars,starLineChartOption:starLineChartOption,user:user});
        
    } catch (error) {
        console.error('Error get seals list:', error);
        throw error;
    }
}

export default userController
