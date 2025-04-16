import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { environment } from '../../../config/environment';

interface JwtPayload {
  sub: string;
  phoneNumber: string;
  role: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: environment().jwtSecret,
    });
  }

  validate(payload: JwtPayload): {
    id: string;
    phoneNumber: string;
    role: string;
  } {
    return {
      id: payload.sub,
      phoneNumber: payload.phoneNumber,
      role: payload.role,
    };
  }
}
