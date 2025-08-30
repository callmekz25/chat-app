export enum Gender {
  FEMALE = 'female',
  MALE = 'male',
}
export enum Role {
  USER = 'user',
  LEADER = 'leader',
  ADMIN = 'admin',
}
export type Profile = {
  _id: string;
  user_name: string;
  full_name: string;
  avatar_url?: string;
  avatar_public_id?: string;
  roles: Role[];
  bio?: string;
  gender: Gender;
  total_followers: number;
  total_following: number;
};
