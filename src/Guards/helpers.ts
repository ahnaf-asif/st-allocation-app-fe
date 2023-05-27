import jwtDecode from 'jwt-decode';
import { IUser } from '@/Redux/Slices/AuthSlice/AuthSliceTypes';

export const checkJwtExpiration = (token: string) => {
  const { exp } = jwtDecode(token) as IUser;
  const time = new Date().getTime();
  return exp * 1000 - time > 0;
};
