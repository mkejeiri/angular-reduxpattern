import {Action} from  '@ngrx/store'
import {Ingredient} from '../../shared/Ingredient.model';
import {Recipe} from '../recipe.model';
import * as RecipeActionsBundle  from './recipe.actions';
import * as fromApp from '../../store/app.reducers';

export interface FeaturesState extends fromApp.AppState{
    /**
     * the name 'recipesState' should match the name in  RecipeModule: 
     * StoreModule.forFeature('recipesState',RecipeReducer)
     * 
     * export interface AppState{
     *  shoppingList:fromShoppingListReducers.State;
     *  auth: fromAuth.AuthState; }
     */
    recipesState:State;

}
export interface State{
    recipes:Recipe[]
}

const initialState: State = {
    recipes:[
        new Recipe(1,'A test recipe 1','This is simply a test 1',
                  'http://ifoodreal.com/wp-content/uploads/2016/11/mexican-turkey-meatballs-4.jpg',
                   [
                      new Ingredient('Mexican Turkey',1),
                      new Ingredient('Meatballs',3)
                   ]
                  ),
        new Recipe(2,'A test recipe 2','This is simply a test 2',
                  'https://imagesvc.timeincapp.com/v3/mm/image?url=http%3A%2F%2Fcdn-image.myrecipes.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Fmedium_2x%2Fpublic%2Fbest-ever-seafood-gumbo-sl.jpg%3Fitok%3D-pTK0I90&w=700&q=85',
                  [
                    new Ingredient('Falafel',2),
                    new Ingredient('French Fries',8)
                  ]
        ),
        new Recipe(3,'A test recipe 3','This is simply a test 3',
                  'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2012/2/29/0/0149359_Making-Taco_s4x3.jpg.rend.hgtvcom.616.462.suffix/1371603491866.jpeg',
                  [
                    new Ingredient('Taco',22),
                    new Ingredient('Meatballs',3),
                    new Ingredient('Harisa',10)
                  ]
        )
    ]
    };

export function RecipeReducer (state=initialState, action:RecipeActionsBundle.RecipeActions){
    switch (action.type) {
        case RecipeActionsBundle.SET_RECIPES:
        return {
            ...state,
            recipes:[...action.payload]
        };
        case RecipeActionsBundle.ADD_RECIPE:
        return {     
            ...state, 
            recipes:[...state.recipes,action.payload]                        
        };
        case RecipeActionsBundle.UPDATE_RECIPE:

        const updateRecipe = state.recipes[action.payload.index];
        const updatedRecipe = {
            ...updateRecipe, 
            ...action.payload.updatedRecipe
        };
        const updatedRecipes = [...state.recipes];
        updatedRecipes[action.payload.index] = action.payload.updatedRecipe;

        return {
            ...state,
            recipes:updatedRecipes
        };
        case RecipeActionsBundle.DELETE_RECIPE:
        const splicedRecipes = [...state.recipes];
        splicedRecipes.splice(action.payload,1)
        return {
            ...state,
            recipes:splicedRecipes
        };
        default:
        return state;
    }
    
}
