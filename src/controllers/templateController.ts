import dataService from '../services/dataService';

const templateController:any = {}

import { Response } from "express";
import {RequestTrated} from "../types";

templateController.createTemplate = (req:RequestTrated, res:Response)=> {
    const baseTemplates:[] = [];
    dataService.createSealTemplate(baseTemplates);
    res.end();
};

templateController.showCreateTemplate = (req:RequestTrated, res:Response)=> {
    res.render('create_template');
};

export default templateController;