import { IPaginationFilter, IResult } from './../interfaces/common';
import BaseServerContext from "../baseServerContext";
import validator from 'validator';
import { IUserModel } from "../interfaces/users";
import { Op } from "sequelize";
import { MESSAGE_TYPE } from '../constants';
const bcrypt = require('bcrypt');
const slug = require('slug')

export default class UserService extends BaseServerContext {
    public async findUserById(id: number) {
        const { Users } = this.di;
        let result: IResult = {};
        result.data = await Users.findByPk(id);
        result.message = 'User which id is ' + id + ' was ' + (result.data ? '' : ' not ') + 'found';
        result.messageType = result.data ? MESSAGE_TYPE.SUCCEEDED_CONSOLE : MESSAGE_TYPE.ERROR_CONSOLE;
        return result;
    }

    public async findAllUsersPagination(page: number, perPage: number, filter?: IPaginationFilter) {
        let result: IResult = {};
        const offset: number = (page - 1) * perPage;
        const limit: number = perPage;
        result = await this.findUsersWherePagination(offset, limit, filter?.columnName, filter?.columnLabel, filter?.value, filter?.action)
        result.totalCount = await this.countAllUsersPagination(filter?.columnName, filter?.value, filter?.action)
        return result;
    }

    public async findUsersWherePagination(offset: number, limit: number, columnName?: string, columnLabel?: string, value?: string, action?: string) {
        const { Users } = this.di;
        const data = await Users.findAll({
            where: {
                ...(action === '=' ? {
                    [columnName]: value
                } : action === '<' ? {
                    [columnName]: { [Op.lt]: value }
                } : action === '>' ? {
                    [columnName]: { [Op.gt]: value }
                } : {})
            },
            ...(!value ? {} : value === "downSort" ? {
                order: [[columnName, 'DESC']]
            } : {
                order: [[columnName, 'ASC']]
            }),
            ...(offset ? { offset: offset } : {}),
            ...(limit ? { limit: limit } : {})
        });
        const message = action ?
            'All users which ' + columnLabel + ' ' + (
                action === '=' ? ' is ' :
                    action === ' < ' ? ' less ' : ' bigger '
            ) + ' ' + value + ' was ' + (data ? '' : 'not') + ' found' :
            value ? 'All users ' + (
                value === 'downSort' ? 'down' : 'up'
            ) + ' sorted by ' + columnLabel + ' was found' :
                'All users was ' + (data ? '' : ' not') + ' found';
        const messageType = data ? MESSAGE_TYPE.SUCCEEDED_TOAST : MESSAGE_TYPE.ERROR_TOAST;
        return ({ data: data, message: message, messageType: messageType })
    }

    public async countAllUsersPagination(columnName?: string, value?: string, action?: string) {
        const { Users } = this.di;
        return await Users.count({
            ...(action === '=' ? { where: { [columnName]: value } } : {}),
        });
    }

    public async countAllUsers() {
        const { Users } = this.di;
        let result: IResult = {};
        result.data = await Users.count();
        result.message = 'All users was ' + (result.data ? '' : ' not ') + 'counted';
        result.messageType = result.data ? MESSAGE_TYPE.SUCCEEDED_CONSOLE : MESSAGE_TYPE.ERROR_CONSOLE;
        return result;
    }

    public async findUserByEmail(email: string) {
        const { Users } = this.di;
        return await Users.findOne({
            where: { email },
        });
    }

    public async loginUser(email: string, password: string) {
        const user = await this.findUserByEmail(email);
        if (user && (await bcrypt.compare(password, user.password))) {
            return user;
        }
    }

    public async registerUser(body: any) {
        const { Users } = this.di;
        let { firstName, lastName, email, role, password } = body;

        email = validator.normalizeEmail(email);
        if (!validator.isEmail(email)) {
            throw new Error('The email you entered is invalid.');
        }
        let user: IUserModel = await Users.findOne({
            where: { email },
            raw: true
        })
        if (user) {
            throw new Error('The email has already been taken.');
        }

        const slugName = slug(firstName + ' ' + lastName, '.');
        let dbSlug;
        const userForSlug: any = await Users.findOne({
            where: {
                firstName: { [Op.regexp]: firstName },
                lastName: { [Op.regexp]: lastName },
            },
            order: [['createdAt', 'DESC']]
        })
        if (userForSlug) {
            const userSlug = userForSlug.slug;
            const slugId = userSlug.split('.').pop();
            const parsed = parseInt(slugId, 10) + 1;
            if (!isNaN(parsed)) {
                dbSlug = slugName + '.' + parsed;
            } else {
                dbSlug = slugName + '.' + 1;
            }
        } else {
            dbSlug = slugName;
        }

        const userData = {
            firstName,
            lastName,
            email,
            role,
            password: password,
            slug: dbSlug
        }
        user = await Users.create(userData);
        return user;
    }

    public async findUserWithEmailAndPassword(email, password) {
        const user = await this.loginUser(email, password);
        return user;
    }
}