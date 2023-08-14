import { IResult } from './../interfaces/common';
import BaseController from "./baseController";
import { NextApiRequest } from "next";
import { INextApiRequestExtended } from "../interfaces/common";
import POST from "../decorators/post";
import USE from "../decorators/use";
import session from "../middleware/session";
import { passportAuth, passportInitialize, passportSession } from "../middleware/passport";
import validate from "../validations/validate";
import validationRules from "../validations/validationRules";
import { MESSAGE_TYPE } from '../constants';

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
        let result: IResult = {};
        result.data = await UserService.registerUser(req.body);
        result.message = result.data ? 'Register succeeded' : 'Register failed';
        result.messageType = result.data ? MESSAGE_TYPE.SUCCEEDED_TOAST : MESSAGE_TYPE.ERROR_TOAST;
        return result;
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
        let result: IResult = {};
        const { identity } = req;
        result.data = identity;
        result.message = identity ? 'Login succeeded' : 'Login failed';
        result.messageType = identity ? MESSAGE_TYPE.SUCCEEDED_TOAST : MESSAGE_TYPE.ERROR_TOAST;
        if (!identity) {
            throw new Error("User not Found");
        }
        return result;
    }
}