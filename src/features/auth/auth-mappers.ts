import type { VerifyTokenDataDto } from './auth-dtos';
import type { AuthenticatedUser } from './auth-types';

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
