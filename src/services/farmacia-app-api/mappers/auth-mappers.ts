import type { AuthenticatedUser } from '@/domain/models/authenticated-user';

import type { VerifyTokenDataDto } from '../dtos/auth-dtos';

export function mapVerifyTokenDtoToAuthenticatedUser(
  dto: VerifyTokenDataDto,
): AuthenticatedUser {
  return {
    ...dto.user,
    roles: dto.roles,
    permissions: dto.permissions,
    lastLoginAt: dto.user.lastLoginAt
      ? new Date(dto.user.lastLoginAt)
      : null,
    createdAt: new Date(dto.user.createdAt),
  };
}
