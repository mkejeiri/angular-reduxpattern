/**
 * this use to export all reducers apps wide!:
 * it a state which bundles all the other apps state!!!  
 */

import * as fromShoppingListReducers from '../shopping-list/store/shopping-list.reducers';
import * as fromAuth from '../auth/store/auth.reducers';
import { ActionReducerMap } from '@ngrx/store';


export interface AppState{
    shoppingList:fromShoppingListReducers.State;
    auth: fromAuth.AuthState; 
}

export const reducers: ActionReducerMap <AppState>= {
    /**
     * DO NOT USE () for shoppingListReducer or authReducers, i.e DO NOT EXEC
     * Using ActionReducerMap, We bundle all our local state (e.g. shoopingList and Auth)  into one 
     * global state for only eagerly loaded module...
     * however, the lazy loaded module (e.g. FeatureState), should extends their State to the global App state since
     * we DO NOT know for sure whether/when the lazy loaded feature will be loaded.
     */
    shoppingList:fromShoppingListReducers.shoppingListReducer,
    auth: fromAuth.authReducers
}