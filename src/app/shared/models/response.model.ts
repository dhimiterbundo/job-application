export type JobId = 'id';
export interface JobModel {
  id?: number;
  title: string;
  description: string;
  postDate: string;
  postedBy: string;
  email: string;
  skills?: string[];
  image?: string;
}

export interface UserModel {
  id: number;
  name: string;
  lastname: string;
  role: Role;
}

export enum Role {
  USER= 'USER',
  RECRUITER = 'RECRUITER'
}
