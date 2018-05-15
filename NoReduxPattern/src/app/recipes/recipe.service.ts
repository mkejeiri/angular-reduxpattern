import {Recipe} from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/Ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs/Subject';
import { DataStorageService } from '../shared/data-storage.service';
import { Response } from '@angular/http';

@Injectable()
export class RecipeService {

  private recipes: Recipe[] = [
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
                ];

// recipeSelected = new EventEmitter<Recipe>();
recipeChanged = new Subject<Recipe[]>();

getRecipes(){
  return this.recipes.slice(); //will get a copy!
}


getRecipeById(index:number){
  return this.recipes[index]; //will get a copy!
}
  constructor(private slService:ShoppingListService) {}

  addIngredientToShoppingList(ingredients:Ingredient[]){
    this.slService.AddIngredients(ingredients);
  }

  addRecipe(recipe:Recipe){
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(recipeIndex:number,recipe:Recipe){
    this.recipes[recipeIndex]=recipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index:number){
    this.recipes.splice(index,1);
    this.recipeChanged.next(this.recipes);
  }

  setRecipes(recipes:Recipe[]){
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes); 
  }

  
}

