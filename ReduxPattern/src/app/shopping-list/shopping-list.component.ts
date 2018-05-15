import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';


import {Ingredient} from '../shared/Ingredient.model';

import * as shoppingListActions from   './store/shopping-list.actions';
import * as fromApp from '../store/app.reducers';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
 
})
export class ShoppingListComponent implements OnInit {
  // ingredientsDeprecated:Ingredient[];
  shoppingListState: Observable<{ingredients:Ingredient[]}>;
  // private subscription:Subscription;
  
  constructor(private store: Store<fromApp.AppState>) {}
fromApp
  ngOnInit() {   
     
      /**
       * we got an observable:this.store.select('shoppingList')
       */
      this.shoppingListState = this.store.select('shoppingList');
     
  }
  onStartEdit(index:number){ 
  this.store.dispatch(new shoppingListActions.StartEdit(index));
  }

  onSaveIngredients(){
    // this.httpService.saveIngredients()
  }

  onGetIngredients(){
    // this.httpService.getIngredients();    
  }
}
