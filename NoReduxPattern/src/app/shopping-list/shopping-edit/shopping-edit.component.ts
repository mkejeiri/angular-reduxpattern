import { Component, OnInit,ElementRef,ViewChild,Output, OnDestroy } from '@angular/core';
import { Ingredient } from '../../shared/Ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

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
  editIngredientIndex:number;
  subscription:Subscription;

 
  constructor(private shoppingListService:ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.shoppingListService.editIngredientStarted.subscribe((index:number)=>{
      this.editIngredientIndex = index 
      this.editedIngredient=this.shoppingListService.getIngredient(index);
      this.editMode=true;      
      this.editForm.setValue({
        name:this.editedIngredient.name,
        amount:this.editedIngredient.amount
      });    

    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onSubmit(){
    // const ingName =this.nameInputRef.nativeElement.value;
    // const ingAmount = this.amountInputRef.nativeElement.value;
    if (this.editMode) {
      let newIngredient = new Ingredient(this.editForm.value.name, this.editForm.value.amount);
      this.shoppingListService.onIngedientUpdate(this.editIngredientIndex,newIngredient);
    } else {
      const ingredient = new Ingredient(this.editForm.value.name,this.editForm.value.amount);
      this.shoppingListService.onIngedientAdded( ingredient);
      
    }
    this.editMode=false;  
    this.onClear();
    
  }

  onClear(){
    this.editForm.reset();
    this.editMode=false;
  }

  onDelete(){    
    this.shoppingListService.onDetete(this.editIngredientIndex);
    this.editMode=false;  
    this.onClear();
  }
}
