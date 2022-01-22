import { Request, Response, NextFunction } from "express";
import { executeQuery } from "../database/db";
import { UserRole } from "./enums";
import { APIError } from "./error-handler";
import { verifyJWT } from "./hash-utils";
import { Auth } from "./messages";

export async function authenticate(
    req: Request, res: Response, next: NextFunction
) {
    try {
        let bearerToken: string = (req.query.token ?
            req.query.token :
            (req.headers.authorization)) as string;
        if (!bearerToken) {
            return next(new APIError(Auth.MISSING_AUTHENTICATION, 401));
        }
        bearerToken = bearerToken.substring(7, (req.headers.authorization as string).length);
        const tokenObj: any = verifyJWT(bearerToken);
        const { email } = tokenObj;
        const fetchedUser = await executeQuery(`select name,email,id,role from users where email=?`, email);
        if (!fetchedUser.length) {
            throw new APIError(Auth.USER_NOT_FOUND, 401);
        }
        res.locals.user = fetchedUser[0];
        next();
    } catch (error) {
        return next(new APIError(`Unauthorized`, 401));
    }
}

export async function strictlyAdmin(req: Request, res: Response, next: NextFunction) {
    if (!res.locals.user) {
        return next(new APIError(Auth.MISSING_AUTHENTICATION));
    }
    if (res.locals.user.role !== UserRole[UserRole.ADMIN]) {
        return next(new APIError(Auth.UNAUTHORIZED, 403));
    }
    next();
}
