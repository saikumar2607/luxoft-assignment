import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { executeQuery } from "../database/db";
import { APIError } from "../utils/error-handler";
import { comparePassword, createJWT, hashPassword } from "../utils/hash-utils";
import { Auth } from "../utils/messages";
const { OK } = StatusCodes;

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    let fetchedUser: any = await executeQuery(`select * from users where email=?`, email);
    if (!fetchedUser.length) {
      throw new APIError(Auth.USER_NOT_FOUND);
    }
    fetchedUser = fetchedUser[0];
    const { password: userPassword, ...others } = fetchedUser;
    const passwordMatching = comparePassword(password, userPassword);
    if (!passwordMatching) {
      throw new APIError(Auth.PASSWORD_MISMATCH);
    }
    res.status(OK).send({ token: createJWT({ email: fetchedUser.email }), ...others });
  } catch (error) {
    next(error);
  }
}

export async function userList(req: Request, res: Response, next: NextFunction) {
  try {
    const results = await executeQuery("select * from users");
    res.status(OK).send(sortResults(results));
  } catch (error) {
    next(error);
  }
}

export async function getDetail(req: Request, res: Response, next: NextFunction) {
  try {
    const userDetail = await executeQuery("select id,name,email from users where id=?", res.locals.user.id);
    if (!userDetail.length) {
      throw new APIError(Auth.USER_NOT_FOUND);
    }
    res.status(OK).send(userDetail[0]);
  } catch (error) {
    next(error);
  }
}

function sortResults(data: any) {
  return data.sort((obj1: any, obj2: any) => obj1.name.localeCompare(obj2.name));
}
