import {Action} from  '@ngrx/store';
import { Ingredient } from '../../shared/Ingredient.model';


/**
 * this is a unique and verbose identifier of what the action does!
 */
export const ADD_INGREDIENT = 'ADD_INGREDIENT';

export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
export const SET_INGREDIENTS = 'SET_INGREDIENTS';
export const UPDATE_INGREDIENT = 'UPDATE_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const START_EDIT = 'START_EDIT';
export const STOP_EDIT = 'STOP_EDIT';

/**
 * We are to create this class because we need a payload.
 * the interface Action doesn't force us to use any payload because 
 * some actions doesn't require it.
 */
export class AddIngredient implements Action{
    /**
     * Only a readonly property to implement for interface Action
     */
    readonly type = ADD_INGREDIENT;
    

    //PayLoad
    // payload:Ingredient;
    constructor(public payload:Ingredient){}
}


export class AddIngredients implements Action{
    readonly type = ADD_INGREDIENTS;    
    constructor(public payload:Ingredient[]){}
}


export class SetIngredients implements Action{
    readonly type = SET_INGREDIENTS;    
    constructor(public payload:Ingredient[]){}
}



export class UpdateIngredient implements Action{
    readonly type = UPDATE_INGREDIENT;    
    constructor(public payload:Ingredient){}
}


export class DeleteIngredient implements Action{
    readonly type = DELETE_INGREDIENT; 
}


export class StartEdit implements Action{
    readonly type = START_EDIT;    
    constructor(public payload:number){}
}

export class StopEdit implements Action{
    readonly type = STOP_EDIT;    
}


/**
 * a type is a TS feature (string), here we define our own type
 * we are using the of AddIngredient class and we are exporting it
 * as ShoppingListActions, this becomes usefull when we add more actions
 */

                         //pipe '|' is union here
export type ShoppingListActions = AddIngredient | 
                                  AddIngredients| 
                                  UpdateIngredient
                                 |DeleteIngredient
                                 |StartEdit
                                 |StopEdit
                                 |SetIngredients;