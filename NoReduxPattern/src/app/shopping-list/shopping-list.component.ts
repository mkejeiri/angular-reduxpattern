import { Component, OnInit, OnDestroy } from '@angular/core';
import {Ingredient} from '../shared/Ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs/Subscription';
import { DataStorageService } from '../shared/data-storage.service';
import { Response } from '@angular/http';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
 
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients:Ingredient[];
  private subscription:Subscription;
  
  constructor(private shoppingListService:ShoppingListService,
              private httpService:DataStorageService) {}

  ngOnInit() {   
      this.ingredients= this.shoppingListService.getIngredients();
      this.subscription = this.shoppingListService.ingredientsChanged
      .subscribe((ingredientsData:Ingredient[])=>{
                  this.ingredients=ingredientsData;
        });
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onStartEdit(index:number){
  //  //get an ingredient and next
  //  let ingredient = this.shoppingListService.getIngredient(index);
   this.shoppingListService.editIngredientStarted.next(index);
  }

  onSaveIngredients(){
    this.httpService.saveIngredients().subscribe((response:Response)=>{      
        console.log('Ingredients saved!');        
    },(error)=>{
      console.error(error);
    });

  }

  onGetIngredients(){
    this.httpService.getIngredients();    
  }
}
