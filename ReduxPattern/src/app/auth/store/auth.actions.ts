import { Action } from "@ngrx/store";


export const TRY_SIGNUP='TRY_SIGNUP';
export const TRY_SIGNIN='TRY_SIGNIN';
export const SIGN_UP='SIGN_UP';
export const SIGN_IN='SIGN_IN';
export const LOG_OUT='LOG_OUT';
export const SET_TOKEN='SET_TOKEN';

export class TrySignUp implements Action {
  readonly type = TRY_SIGNUP;
  constructor(public payload:{username:string, password:string}){}
}

export class TrySignIn implements Action {
  readonly type = TRY_SIGNIN;
  constructor(public payload:{username:string, password:string}){}
}

export class SignUp implements Action {
  readonly type = SIGN_UP;
}

export class SignIn implements Action {
    readonly type = SIGN_IN;
  }

export class LogOut implements Action {
   readonly type = LOG_OUT;
  }

export class SetToken implements Action {
  readonly type = SET_TOKEN;
  constructor(public payload:string){}
}

  export type AuthActions = SignUp|SignIn|LogOut|SetToken|TrySignUp|TrySignIn;