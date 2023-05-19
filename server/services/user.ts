import BaseContext from "../baseContext";
import validator from 'validator';
import { IUserModel } from "../interfaces/users";
import { Op } from "sequelize";
import container from '../container';
const bcrypt = require('bcrypt');
const slug = require('slug')

export default class UserService extends BaseContext {
    public findUserById(userId: number) {
        const { Users } = this.di;
        return Users.findByPk(userId, {
            raw: true
        });
    }

    public findAllUsers() {
        const { Users, Reviews } = this.di;
        return Users.findAll({
            raw: true
        });
    }

    public findUserByEmail(email: string) {
        const { Users } = this.di;
        return Users.findOne({
            where: { email },
            raw: true
        })
    }
    public async loginUser(email: string, password: string) {
        const { Users } = this.di;
        const userEmail = validator.normalizeEmail(email);
        const user = await container.resolve("UserService").findUserByEmail(email);
        if (user && (await bcrypt.compare(password, user.password))) {
            return user;
        }
        return null;
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
        return (user)
    }
}