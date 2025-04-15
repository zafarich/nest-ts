import { SetMetadata } from '@nestjs/common';

export const AUTH_KEY = 'auth_required';
export const Auth = (...permissions: string[]) =>
  SetMetadata(AUTH_KEY, permissions);
