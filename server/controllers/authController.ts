import BaseController from "./baseController";
import { NextApiRequest } from "next";
import { INextApiRequestExtended } from "../interfaces/common";
import POST from "../decorators/post";
import USE from "../decorators/use";
import session from "../middleware/session";
import { passportAuth, passportInitialize, passportSession } from "../middleware/passport";
import validate from "../validations/validate";
import validationRules from "../validations/validationRules";

@USE([session, passportInitialize, passportSession])
export default class AuthController extends BaseController {
    @POST("/api/register")
    @USE(validate({
        type: 'object',
        properties: {
            firstName: validationRules.user.firstName,
            lastName: validationRules.user.lastName,
            email: validationRules.user.email,
            password: validationRules.user.password,
            role: validationRules.user.role
        },
        required: ['firstName', 'lastName', 'email', 'password', 'role'],
        additionalProperties: false,
        errorMessage: {
            properties: {
              firstName: "Name is too short! And must contain only letters!",
              lastName: "Surname is too short! And must contain only letters!",
              email: "Invalid email!",
              password: "Password is too short!",
              role: "Role can't be blank!"
            }
        }
    }))
    public async registerUser(req: NextApiRequest) {
        const { UserService } = this.di;
        return await UserService.registerUser(req.body);
    }

    @POST("/api/login")
    @USE(validate({
        type: 'object',
        properties: {
            email: validationRules.user.email,
            password: validationRules.user.password
        },
        required: ['email', 'password'],
        additionalProperties: false,
        errorMessage: {
            properties: {
              email: "Invalid email!",
              password: "Password is too short!"
            }
        }
    }))
    @USE(passportAuth)
    public async loginUser(req: INextApiRequestExtended) {
        const { identity } = req;
        if (!identity) {
            throw new Error("User not Found");
        }
        return { identity };
    }
}