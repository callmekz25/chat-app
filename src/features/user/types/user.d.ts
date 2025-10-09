export enum Gender {
  FEMALE = 'female',
  MALE = 'male',
}
export enum Role {
  USER = 'user',
  LEADER = 'leader',
  ADMIN = 'admin',
}
export type User = {
  _id: string;
  userName: string;
  fullName: string;
  avatar?: {
    avatarUrl: string;
    avatarPublicId: string;
  };
  roles: Role[];
  bio?: string;
  gender: Gender;
  totalFollowers: number;
  totalFollowings: number;
};
