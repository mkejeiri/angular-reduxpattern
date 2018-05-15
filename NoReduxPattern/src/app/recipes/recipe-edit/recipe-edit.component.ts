import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Form, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Ingredient } from '../../shared/Ingredient.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
editMode:boolean=false;
private id:number;
recipeForm:FormGroup;

  constructor(private route:ActivatedRoute, private recipeServive:RecipeService, private router:Router ) { }

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
      const recipe = this.recipeServive.getRecipeById(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe['ingredients']) {
        for(let ingredient of recipe.ingredients){
          // console.log(ingredient);
          const control = new FormGroup({
            'name': new FormControl(ingredient.name,[Validators.required]),
            'amount':  new FormControl(ingredient.amount,[Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
          });
          (<FormArray>(recipeIngredients)).push(control);
        }
      }
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
    // const recipe = this..getRecipeById(this.id);
    // constructor(public recipeId:number, public name:string,
    //    public description:string, public imagePath:string,public ingredients:Ingredient[]){}   
    // const recipeName = this.recipeForm.value['name'];
    // const imagePath = this.recipeForm.get('imagePath').value;
    // const description = this.recipeForm.get('description').value;
    // const recipeIngredients:Ingredient[] =(<Ingredient[]> (<FormArray>this.recipeForm.get('ingredients')).value);
    // const recipe = new Recipe(this.id,recipeName,imagePath,description,recipeIngredients);

    /**
     * we made sure that the model and the values provided by recipeForm have the same object 
     * structure so we could pass the values directly to the addRecipe/updateRecipe
     */
    
    //  console.log(this.recipeForm.value);
    
    if (this.editMode) {
      this.recipeServive.updateRecipe(this.id, this.recipeForm.value);      
    } else {
      this.recipeServive.addRecipe(this.recipeForm.value);      
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
