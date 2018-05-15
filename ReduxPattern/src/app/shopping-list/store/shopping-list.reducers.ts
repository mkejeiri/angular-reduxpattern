import {Action} from  '@ngrx/store'
import {Ingredient} from '../../shared/Ingredient.model';

/**
 * it will bundle all exports from shopping-list.actions file in one JS Object
 * it's a namespace ShoppingListActionsNamespace
 */
import * as ShoppingListActions from './shopping-list.actions';


export interface State{
    ingredients: Ingredient[];
    editedIngredient:Ingredient;
    editedIngredientIndex:number;

}


const initialState: State = {
     ingredients:[
         new Ingredient('Apples',5),
         new Ingredient('Tomatoes',10)
     ],
     editedIngredient:null,
     editedIngredientIndex:-1
    };
/**
 * The argument of this func is passed auto by NgRX
 * this func will be trigged whenever an action is dispatched.
 * state will have an initialState if the state isn't present 1st time when we dispatch an
 * action and reach this reducer without having a current state.
 * 
 * Namespace.exportedclass
 * ShoppingListActions.ShoppingListActions
 * here we pick an action that change the state : not 'get data' through!
 */
export function shoppingListReducer (state=initialState, action:ShoppingListActions.ShoppingListActions){

    /**
     * What the reducer should do?
     * We have to return an new state based on an old one (not re-editing the old one though - immutable!)
     * Behind the NgRx replaces the old state with the new one. 
     * and we get upadated app state.
     */

     switch (action.type) {
         /**
          * swith statement relies on action.type (string describing the action)
          * to determine which actions is dispatched.
          */
         case ShoppingListActions.ADD_INGREDIENT:
                    return {
                        ...state, //taking old state object, so all property of old object state are added to this object
                        /**
                         * Since Action property has only the type and no payload we had to create ShoppingListActions which 
                         * implemented it and adding a new payload property (i.e holds the ingredient been added,removed ...)
                         */
                        ingredients :[...state.ingredients, action.payload]
                        } 
          case ShoppingListActions.ADD_INGREDIENTS:
                    return {
                        ...state, 
                        /**
                         * ...: we spread many ingredient elements
                         * because payload is Ingredient[], and we cannot
                         * do sth like:ingredients:[...state.ingredients,action.payload]
                         */
                        ingredients :[...state.ingredients, ...action.payload] 
                    }
        case ShoppingListActions.SET_INGREDIENTS:
        console.log('SET_INGREDIENTS');
                    return {
                        ...state, 
                        /**
                         * ...: we spread many ingredient elements
                         * because payload is Ingredient[], and we cannot
                         * do sth like:ingredients:[...state.ingredients,action.payload]
                         */
                        ingredients :[...action.payload] 
                    }
          case ShoppingListActions.UPDATE_INGREDIENT:

                    const oldIngredient = state.ingredients[state.editedIngredientIndex];
                    
                    /**
                     * action.payload.ingredient will overwrite the oldIngredient (spreading mechanism used to replace 
                     * data with same Prop) data with the new data, at the end we get an :
                     *  upadatedIngredient of type Ingredient.
                     */
                    const upadatedIngredient = {
                        ...oldIngredient,
                        //we pass the updated Prop which will overwrites other Prop (add or overwrite!)
                        ...action.payload
                    }

                    /**
                     * We just get or distribute old elements in an immutable way!
                     */
                    const upadatedIngredientArray = [...state.ingredients]; 
                    upadatedIngredientArray[state.editedIngredientIndex] = upadatedIngredient;

                    /**
                     * we return a new object which hold a old state elements (immutable way) 
                     * and also the new ingredients.
                     */
                    return {
                        ...state,
                        ingredients:upadatedIngredientArray,
                        editedIngredient:null,
                        editedIngredientIndex:-1
                    }

          case ShoppingListActions.DELETE_INGREDIENT:
                    const oldIngredientArray = [...state.ingredients];                   
                    return {
                        ...state,
                        ingredients: oldIngredientArray.splice(state.editedIngredientIndex,1),
                        editedIngredient:null, 
                        editedIngredientIndex:-1
                    }

          case ShoppingListActions.START_EDIT:
                    const editedIngredient = {...state.ingredients[action.payload]};
                return {
                    ...state,
                    editedIngredient:editedIngredient,
                    editedIngredientIndex:action.payload  
                }
          case ShoppingListActions.STOP_EDIT:               
                return {
                    ...state,
                    editedIngredient:null,
                    editedIngredientIndex:-1
                }


         default:
                    return state;
     } 
}

 