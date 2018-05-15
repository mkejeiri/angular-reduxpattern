
import { Injectable } from '@angular/core';
import {Effect, Actions} from '@ngrx/effects';
import * as RecipeActions from './recipe.actions';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/do';

import { Recipe } from '../recipe.model';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Store } from '@ngrx/store';
import * as fromRecipes from './recipe.reducers';

@Injectable()
 export class RecipeEffects{
      @Effect()
      recipeFetch = this.actions$
      .ofType(RecipeActions.FETCH_RECIPES)
      .switchMap((data) => {     
        console.log('Inside recipe effect FETCH_RECIPES get request');     
        return this.httpClient.get<Recipe[]>('https://recipes-1978.firebaseio.com/recipes.json',
                                {
                                  observe:'body',
                                  responseType:'json'
                                })})        
        .map((recipes) =>{
          for(const recipe of recipes){
            if (!recipe['ingredients']){         
              recipe['ingredients'] = []; 
            }
          }

          console.log('Inside recipe effect FETCH_RECIPES get request');
        return {
            type: RecipeActions.SET_RECIPES,
            payload:recipes
          };           
      });

      @Effect({dispatch:false})
      recipeStore = this.actions$
      .ofType(RecipeActions.STORE_RECIPES)
      /**
       * withLatestFrom: get a latest app state and return an observable 
       * it's also combine an action (chained type 'actions$') and the 'state', 
       * at the end we get an arry [action,state] which will be handle by map.
       */
      .withLatestFrom(this.store.select('recipesState'))
      .switchMap(([action, state])=>{
          // ,{reportProgress:true, params: new HttpParams().set('auth', token)} //we will use intercept
          const req = new HttpRequest('PUT','https://recipes-1978.firebaseio.com/recipes.json',
           state.recipes,{reportProgress:true});          
        console.log('Inside recipe effect STORE_RECIPES PUT request');
        return this.httpClient.request(req);
      });

      constructor(private actions$:Actions,
                  private httpClient:HttpClient,
                  private store:Store<fromRecipes.FeaturesState>){}            
 }