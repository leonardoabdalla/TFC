import * as Joi from 'joi';
import * as bcryptjs from 'bcryptjs';
import Users from '../database/models/usersModel';
import jwtService from './jwtService';

const authService = {
  validateBody: (data: object) => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });

    const { error, value } = schema.validate(data);

    if (error) {
      const e = new Error('All fields must be filled');
      e.name = 'ValidationError';
      throw e;
    }
    return value;
  },

  login: async (email: string, password: string) => {
    const user = await Users.findOne({ where: { email } });

    console.log(user);
    if (!user) {
      const e = new Error('Incorrect email or password');
      e.name = 'ValidaEmail';
      throw e;
    }
    const validacao = await bcryptjs.compare(password, user.password);

    if (!validacao) {
      const e = new Error('Incorrect email or password');
      e.name = 'ValidaEmail';
      throw e;
    }

    const token = jwtService.createToken(user);

    return token;
  },

  validateToken: (token: string) => {
    const data = jwtService.validateToken(token);
    return data;
  },

  // decryptToken: (autthorization: string) => {
  //  const data = Jwt.decodeToken(autthorization);
  // },
};

export default authService;
