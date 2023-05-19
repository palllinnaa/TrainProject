import validator from 'validator';
import container from '../container';
const bcrypt = require('bcrypt');

export default async function findUserWithEmailAndPassword(email, password) {
    const user = await container.resolve("UserService").loginUser(email, password);
    return user;
}