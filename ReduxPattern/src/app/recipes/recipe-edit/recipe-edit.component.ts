import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Ingredient } from '../../shared/Ingredient.model';
import * as fromRecipes from '../store/recipe.reducers';
import * as RecipeActions from '../store/recipe.actions';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
editMode:boolean=false;
private id:number;
recipeForm:FormGroup;

  constructor(private route:ActivatedRoute, 
              private store:Store<fromRecipes.FeaturesState>, 
              private router:Router) { }

  ngOnInit() {
    this.init_form();
    this.route.params.subscribe((params:Params) => {
      this.editMode= params['id'] != null; 
      if (this.editMode) {
        this.id = +params['id'];
        this.init_form();
      }
    });
   
  }

  init_form(){
  let recipeName:string='';
  let recipeImagePath:string='';
  let recipeDescription:string='';
  let recipeIngredients =  new FormArray([]);
    if (this.editMode) {
      this.store.select('recipesState')
      .take(1)
      .subscribe((recipes:fromRecipes.State)=>{       
        const editedRecipe = recipes.recipes[this.id];;
        recipeName = editedRecipe.name;
        recipeImagePath = editedRecipe.imagePath;
        recipeDescription = editedRecipe.description;
        if (editedRecipe['ingredients']) {
          for(let ingredient of editedRecipe.ingredients){ 
            const control = new FormGroup({
              'name': new FormControl(ingredient.name,[Validators.required]),
              'amount':  new FormControl(ingredient.amount,[Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            });
            (<FormArray>(recipeIngredients)).push(control);
          }
        }
      })
    }
    this.recipeForm = new FormGroup({     
      'name':new FormControl(recipeName,[Validators.required]), 
      'imagePath':new FormControl(recipeImagePath,[Validators.required]),
      'description':new FormControl(recipeDescription,[Validators.required]),
      'ingredients': recipeIngredients
    });     
  }
  getRecipeForm():FormArray {
    return <FormArray>(this.recipeForm.get('ingredients'));
  }


  onSubmit(){      
    if (this.editMode) {
      this.store.dispatch(new RecipeActions.UpdateRecipe({index:this.id, updatedRecipe:this.recipeForm.value}))           
    } else {
      this.store.dispatch(new RecipeActions.AddRecipe(this.recipeForm.value));
    }

    this.router.navigate(['../'],{relativeTo:this.route});
  }

  onAddIngredient(){
    const control = new FormGroup({
      'name': new FormControl(null,[Validators.required]),
      'amount':  new FormControl(null,[Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    });
    (<FormArray>this.recipeForm.get('ingredients')).push(control);    
  }

  onCancel(){
    this.router.navigate(['../'],{relativeTo:this.route});
  }

  onDeleteIngredient(index:number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);

  }
}
