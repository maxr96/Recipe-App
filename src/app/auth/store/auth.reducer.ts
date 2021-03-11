import { Action, createReducer, on } from '@ngrx/store';
import { User } from '../user.model';
import * as AuthActions from './auth.actions';

export interface State {
  user: User | null;
  authError: string | null;
  loading: boolean;
}

const initialState: State = {
  user: null,
  authError: null,
  loading: false,
};

const _authReducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, (state, action) => ({
    ...state,
    authError: null,
    user: new User('', action.username, action.token, action.expirationDate),
    loading: false,
  })),
  on(AuthActions.logout, (state) => ({
    ...state,
    user: null,
  })),
  on(AuthActions.loginStart, AuthActions.signupStart, (state) => ({
    ...state,
    authError: null,
    loading: true,
  })),

  on(AuthActions.authenticateFail, (state, action) => ({
    ...state,
    user: null,
    authError: action.errorMessage,
    loading: false,
  })),
  on(AuthActions.clearError, (state) => ({
    ...state,
    authError: null,
  })),
  on(AuthActions.signupSuccess, (state) => ({
    ...state,
    authError: null,
    loading: false,
  }))
);

export function authReducer(state: State | undefined, action: Action) {
  return _authReducer(state, action);
}
