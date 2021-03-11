import { createAction, props } from '@ngrx/store';

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{
    username: string;
    token: string;
    expirationDate: Date;
    redirect: boolean;
  }>()
);

export const logout = createAction('[Auth] Logout');

export const loginStart = createAction(
  '[Auth] Login Start',
  props<{ username: string; password: string }>()
);

export const authenticateFail = createAction(
  '[Auth] Authenticate Fail',
  props<{ errorMessage: string }>()
);

export const signupStart = createAction(
  '[Auth] Signup Start',
  props<{ email: string; username: string; password: string }>()
);

export const signupSuccess = createAction('[Auth] Signup Success');

export const clearError = createAction('[Auth] Clear Error');

export const autoLogin = createAction('[Auth] Auto Login');
