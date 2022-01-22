import { Router } from "express";
import { getDetail, login, userList } from "../middlewares/auth.middleware";
import { authenticate, strictlyAdmin } from "../utils/auth-utils";
const router = Router();
router.post(`/login`, login);
router.get(`/list`, authenticate, strictlyAdmin, userList);
router.get(`/profile`, authenticate, getDetail);

export = router;
