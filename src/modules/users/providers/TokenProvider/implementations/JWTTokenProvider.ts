import { sign } from 'jsonwebtoken';

import authConfig from '@config/auth';

import ITokenProvider from '../models/ITokenProvider';

class TokenProvider implements ITokenProvider {
  generateToken(payload: string): string {
    const { secret, expiresIn } = authConfig.jwt;

    return sign({}, secret, {
      subject: payload,
      expiresIn,
    });
  }
}

export default TokenProvider;
