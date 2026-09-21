export type UserStatus = 'active' | 'inactive' | 'suspended';

export type AuthenticatedUser = {
  id: number;
  publicId: string;
  firebaseUid: string;
  pharmacyId: number;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  phone: string | null;
  avatarUrl: string | null;
  status: UserStatus;
  roles: string[];
  permissions: string[];
  lastLoginAt: Date | null;
  createdAt: Date;
};
