
import { Injectable } from '@angular/core';
/**
 * this might handle all the side effects
 */
import {Effect, Actions} from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';

import {fromPromise} from 'rxjs/observable/fromPromise';

import * as firebase from 'firebase';
import { Router } from '@angular/router';


@Injectable() //like services we need this to inject
 export class AuthEffects{

     /* *   @Effect() Decorator: few words 
      * create a Prop with Effect decorators and run some code there.
      * we could use @Effect({dispatch:false}),then we MUST NOT have an action to dispatch, otherwise we get an error!.
      * Here we dispatch multiple actions: return[{type:AuthActions.SIGN_UP}, {type:AuthActions.SET_TOKEN, payload:token}
      */

     /**
      * we will watch for a specific list of occuring actions. if such actions is occured we need to run some 
      * specific code. here we need an action when the user signup and just before we successfully dispatch an signup action,
      * so the 'signup action' won't fit for this purpose. hence the need for TrySignUp action. 
      * we listen to this.store.dispatch(new AuthActions.TrySignUp({username:email, password:password})) and we chain more observables
      * to handle the side effects. it like reducers which rely in type but without changing the app state in the process.     
      */
    
         
     @Effect()
       /**
       * NgRx/Effect decorator will handle and register the property authSignUp on the ngrx/effects in the EffectsModule 
       * (in AppModule : EffectsModule.forRoot([AuthEffects]))and will listen for any actions (defined in the code below)
       * that we will have, and then will check for action type;  if action type =  TRY_SIGNUP 
       * it will continue data tranformation from reaching out to firebase creating user on the way,then
       * reach out and get a token, and if everything succeds, it will return two effects/actions merge into one observable of TYPE:
       *  <[{type:AuthActions.SIGN_UP},{type:AuthActions.SET_TOKEN, payload:token}]>
       * NOTE: AuthActions.TRY_SIGNUP will be handled excusively by an effet (AuthEffects) not by a reducer in anyway since it doesn't 
       * change the APP state.  
       */
     authSignUp = this.actions$
     .ofType(AuthActions.TRY_SIGNUP)
     .map((action:AuthActions.TrySignUp)=>{
         return action.payload;})
     .switchMap(
         (authData:{username:string, password:string})=>{
             //we need to create an observable because we get a promise here.
         return fromPromise(firebase.auth().createUserWithEmailAndPassword(authData.username,authData.password));
         })
      /**
       * get the token and dispatch action
       */
     .switchMap(()=>{ return fromPromise(firebase.auth().currentUser.getIdToken());})
     /**
      * since we want to dispatch 2 actions, we need to get ONLY observables and turn/merge them all into ONE!,
      * hence the need for mergeMap. 
      * here we return an array of JS objects which will be merge together: SignUp and SetToken actions.
      */
     .mergeMap((token:string) => {        
        this.router.navigate(['/']);
         //2 actions merge into one observable!
          return[
              {type:AuthActions.SIGN_UP},
              //AuthActions.SET_TOKEN expects a token!
              {type:AuthActions.SET_TOKEN, payload:token}
            ]});

     /**
      * 
      * @param actions$ : we use a $ sign (optional!) to highlight the fact that it is an observable, and to signal 
      * that it is a special Property in this class used for side effects.
      * 
      * 
      * ngrx/effects will be able automatically retrieve the actions registered in the store!, 
      * hence the need to register EffectsModule in the AppModule:  EffectsModule.forRoot([AuthEffects]).
      * 
      */
     constructor(private actions$:Actions, private router:Router){

     } 

     @Effect()
     AuthSignIn = this.actions$
     .ofType(AuthActions.TRY_SIGNIN)
     .map((action:AuthActions.TrySignIn)=>{
        return action.payload;})
    .switchMap(
        (authData:{username:string, password:string})=>{
         return fromPromise(firebase.auth().signInWithEmailAndPassword(authData.username,authData.password));
        })
    .switchMap(()=>{ return fromPromise(firebase.auth().currentUser.getIdToken());})    
    .mergeMap((token:string) => {
        this.router.navigate(['/']);        
         return[
             {type:AuthActions.SIGN_IN},
             {type:AuthActions.SET_TOKEN, payload:token}
           ]});

    @Effect({dispatch:false})
    AuthLogOut=this.actions$
    .ofType(AuthActions.LOG_OUT)
    /**
     * we could call .subscribe since we deal with observable, BUT:
     * we still need the effect to resolve into an absovable, ngrx still need to keep
     * that observable going, after all it need to run this observable through a reducers for the complete
     * logout e.g setting the token =null and Authenticated=false,
     * so we MUST NOT END this chain with subscribe ... 
     * that when 'do' operator comes into play!, it allows to run portion of the code without hindering
     * the other part to continue or consuming the observable...  
     */
    .do(()=>{
        this.router.navigate(['/']);
    });

 }