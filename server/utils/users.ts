import validator from 'validator';
import Users from '../models/user';
const bcrypt = require('bcrypt');

export default async function findUserWithEmailAndPassword(email, password) {
    const userEmail = validator.normalizeEmail(email);
    const user = await Users.findOne({
        where: { email },
        raw: true
    })
    if (user && (await bcrypt.compare(password, user.password))) {
        return user;
    }
    return null;
}