import { Action, State } from "@ngrx/store";
import * as AuthActions from './auth.actions';



export interface AppState{
    authState:AuthState;

}

export interface AuthState {
    token:string;
    authenticated:boolean; 
}


const initialAuthState:AuthState = {token : null, authenticated:false}

export function authReducers (state = initialAuthState, action:AuthActions.AuthActions){
    switch (action.type) {
        case AuthActions.SIGN_IN:                       
        case AuthActions.SIGN_UP:            
            return {...state, authenticated:true };

        case AuthActions.LOG_OUT:            
            return {...state,token:null, authenticated:false};
        
        case AuthActions.SET_TOKEN:            
            return {...state,token:action.payload};
        default:
            return state;
    } 
}