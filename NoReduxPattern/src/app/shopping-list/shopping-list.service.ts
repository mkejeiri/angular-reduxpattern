import {Ingredient} from '../shared/Ingredient.model';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
// import { EventEmitter } from '@angular/core';

@Injectable()
export class ShoppingListService {
  private ingredients: Ingredient[] = [
    new Ingredient('Apple', 5),
    new Ingredient('Tomatoes',10)
  ];

  // ingredientsChanged = new EventEmitter<Ingredient[]>();
  ingredientsChanged = new Subject<Ingredient[]>();
  editIngredientStarted = new Subject<number>();
  constructor() {}
 
  onIngedientAdded(ingredient: Ingredient){
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  getIngredients():Ingredient[]{
    return this.ingredients.slice();
  }

  getIngredient(index):Ingredient{
    return this.ingredients[index];
  }

  AddIngredients(ingredients: Ingredient[]){
    //ingredients.forEach((ingredient)=>{this.ingredients.push(ingredient);}); //use spread operator instead
    this.ingredients.push(...ingredients); //use spread operator instead
    this.ingredientsChanged.next(this.ingredients.slice());
    //not good: it raises a lot of unecessary events
    // for(let ingredient of ingredients)
    //   this.onIngedientAdded(ingredient);    
  } 

  onIngedientUpdate(index:number,ingredient: Ingredient){
    this.ingredients[index] =ingredient;
    this.ingredientsChanged.next(this.ingredients.slice());    
  }

  onDetete(index:number){
    this.ingredients.splice(index,1);
    this.ingredientsChanged.next(this.ingredients.slice());    
  }  

  setIngrendients(ingredients:Ingredient[]){
    this.ingredients = ingredients;
    this.ingredientsChanged.next(this.ingredients.slice());   
  }
  
}
  