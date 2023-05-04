import { IUserModel } from './../../server/interfaces/users';
import type { NextApiRequest, NextApiResponse } from 'next'
import { createRouter } from 'next-connect';
import Users from '../../server/models/user';
import validator from 'validator';
import { Op } from 'sequelize';
const slug = require('slug')

const router = createRouter<NextApiRequest, NextApiResponse>();
router
  .post(async (req, res) => {
    let { firstName, lastName, email, role, password } = req.body;

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
    res.status(200).json(user) 
  })

export async function registerUser({ req, res }) {
  return router.run(req, res);
}

export default router.handler({
  onError: (err, req, res) => {
    console.error(err);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
});