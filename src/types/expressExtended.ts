import { ParsedCookies } from "./parsedCookies"
import { Request } from "express"

export interface RequestTrated extends Request {
    parsedCookies?:ParsedCookies
} 