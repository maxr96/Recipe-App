import { createAction, props } from "@ngrx/store";

export const authenticateSuccess = createAction('[Auth] Authenticate Success',
    props<{
        username: string;
        token: string;
        expirationDate: Date;
        redirect: boolean;
    }>()
)

export const logout = createAction('[Auth] Logout');

export const loginStart = createAction(
    '[Auth] Login Start', props<{ username: string; password: string}>());

export const authenticateFail = createAction('[Auth] Authenticate Fail',
    props<{errorMessage: string}>())

export const signupStart = createAction('[Auth] Signup Start',
    props<{ email: string; username: string; password: string}>())

export const clearError = createAction('[Auth] Clear Error');

export const autoLogin = createAction('[Auth] Auto Login');
