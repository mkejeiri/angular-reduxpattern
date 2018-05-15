 import { Component, OnInit,ElementRef,ViewChild,Output, OnDestroy } from '@angular/core';
import { Ingredient } from '../../shared/Ingredient.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';



/**
 * ShoppingListActionsNamespace is bundles variable (a sort of namespace)
 */
import * as ShoppingListActionsNamespace from '../store/shopping-list.actions';
import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.reducers';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // //local reference 'nameInput'
  // @ViewChild('nameInput') nameInputRef:ElementRef;

  // //local reference 'amountInput'
  // @ViewChild('amountInput') amountInputRef:ElementRef;
  @ViewChild('f') editForm:NgForm;
  editMode:boolean=false;
  editedIngredient:Ingredient;
  // editIngredientIndex:number;
  subscription:Subscription;

 
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {

    this.subscription = this.store.select("shoppingList")
    .subscribe(
      (data) =>{
        if (data.editedIngredientIndex>-1) {
          this.editedIngredient = data.editedIngredient;
          this.editMode=true;
          this.editForm.setValue({
            name:this.editedIngredient.name,
            amount:this.editedIngredient.amount
          }); 
        } else {
          this.editMode=false;
        }      
     });
    
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingListActionsNamespace.StopEdit())
    this.editMode=false;
    this.editedIngredient=null;
  }

  onSubmit(){
    if (this.editMode) {
      let newIngredient = new Ingredient(this.editForm.value.name, this.editForm.value.amount);
      this.store.dispatch(new ShoppingListActionsNamespace.UpdateIngredient(newIngredient));

    } else {
  
      
      const newIngredient = new Ingredient(this.editForm.value.name,this.editForm.value.amount);

      /**
       * Here we add a new ingredient, so here we need to dispatch a new action AddIngredient(payload).
       */
      this.store.dispatch(new ShoppingListActionsNamespace.AddIngredient(newIngredient));
      
    }
    this.editMode=false;  
    this.onClear();     
  }

  onClear(){
    this.editForm.reset();
    this.editMode=false;
    this.editedIngredient=null;
  }

  onDelete(){    
    this.store.dispatch(new ShoppingListActionsNamespace.DeleteIngredient())   
    this.onClear();
  }
}
