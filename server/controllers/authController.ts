import BaseController from "./baseController";
import { NextApiRequest } from "next";
import { INextApiRequestExtended } from "../interfaces/common";
import POST from "../decorators/post";
import USE from "../decorators/use";
import session from "../middleware/session";
import { passportAuth, passportInitialize, passportSession } from "../middleware/passport";

@USE([session, passportInitialize, passportSession])
export default class AuthController extends BaseController {
    @POST("/api/register")
    public async registerUser(req: NextApiRequest) {
        const { UserService } = this.di;
        return await UserService.registerUser(req.body);
    }

    @POST("/api/login")
    @USE(passportAuth)
    public async loginUser(req: INextApiRequestExtended) {
        const { identity } = req;
        if (!identity) {
            throw new Error("User not Found");
        }
        return { identity };
    }
}