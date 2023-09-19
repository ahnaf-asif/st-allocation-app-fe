import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';

import { axios } from '@/Config';
import { EMPTY_AUTH_STATE } from './AuthSliceConstants';
import { IUser } from './AuthSliceTypes';

const initialState = EMPTY_AUTH_STATE;

export const loginUser = createAsyncThunk(
  'auth/login',
  async (formData: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/auth/login', formData);

      const jwtToken = data.token as string;
      axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
      localStorage.setItem('jwtToken', jwtToken);

      const resp = jwtDecode(jwtToken) as { user: IUser };

      const user: IUser = {
        id: resp.user.id,
        name: resp.user.name,
        email: resp.user.email,
        student_id: resp.user.student_id,
        course: resp.user.course,
        section: resp.user.section,
        iat: resp.user.iat,
        exp: resp.user.exp,
        isAdmin: resp.user.isAdmin,
        isSuperAdmin: resp.user.isSuperAdmin
      };

      return user;
    } catch (e) {
      console.log(e);
      const message = 'The email or password is incorrect';
      return rejectWithValue(message);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuth: (state) => {
      state.loading = false;
      state.dispatched = true;
      state.error = null;
      state.user = null;
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('jwtToken');
    },
    updateAuth: (state, action) => {
      const token = action.payload;
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      const resp = jwtDecode(token) as { user: IUser };
      const user: IUser = {
        id: resp.user.id,
        name: resp.user.name,
        email: resp.user.email,
        student_id: resp.user.student_id,
        course: resp.user.course,
        section: resp.user.section,
        iat: resp.user.iat,
        exp: resp.user.exp,
        isAdmin: resp.user.isAdmin,
        isSuperAdmin: resp.user.isSuperAdmin
      };

      state.loading = false;
      state.dispatched = true;
      state.error = null;
      state.user = user;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state, action) => {
      state.loading = true;
      state.dispatched = false;
      state.error = null;
      state.user = null;
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.dispatched = true;
      state.error = null;
      state.user = action.payload as IUser;
    });

    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.dispatched = true;
      state.error = action.payload as string;
      state.user = null;
    });
  }
});

export const { clearAuth, updateAuth } = authSlice.actions;
export default authSlice.reducer;
