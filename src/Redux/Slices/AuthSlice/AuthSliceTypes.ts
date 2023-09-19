export interface IUser {
  id: number;

  name: string;

  email: string;

  student_id?: string;

  course?: string;

  section?: number;

  isAdmin: boolean;

  isSuperAdmin: boolean;

  iat: number;

  exp: number;
}

export interface IAuthState {
  loading: boolean;

  dispatched: boolean;

  error: any;

  user: IUser | null;
}
