import { IAuthState, IUser } from './AuthSliceTypes';

export const EMPTY_USER: IUser | null = null;

export const EMPTY_AUTH_STATE: IAuthState = {
  loading: false,
  dispatched: false,
  error: null,
  user: null
};
