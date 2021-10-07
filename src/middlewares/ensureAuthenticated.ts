import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { AppError } from '../errors/AppError';
import { UsersRepository } from '../modules/accounts/repositories/implementations/UsersRepository';

// rentx-ignite MD5
const secret = '3801c65ac9fb750d2ebc102df465c930 ';

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { authorization } = request.headers;
  if (!authorization) {
    throw new AppError('Token missing!', 401);
  }
  const [, token] = authorization.split(' ');

  try {
    const { sub: user_id } = verify(token, secret) as IPayload;

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exists!', 401);
    }

    request.user = { id: user_id };
    next();
  } catch (error) {
    throw new AppError('Invalid Token!', 401);
  }
}
