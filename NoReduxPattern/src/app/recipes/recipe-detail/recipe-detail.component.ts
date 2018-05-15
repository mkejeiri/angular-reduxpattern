import { Component, OnInit} from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Ingredient } from '../../shared/Ingredient.model';
@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit{
  //@Input('recipeDetail') recipe:Recipe;
  recipe:Recipe;
  id:number;
  constructor(private recipeService:RecipeService, private route: ActivatedRoute, private router:Router ) { }

  ngOnInit() {
    this.route.params.subscribe((params:Params) =>{
      this.id = +params['id'];
      this.recipe = this.recipeService.getRecipeById(this.id);           
      // console.log(this.recipe.ingredients);
    });    
    
  }

  onEditRecipe(){
    /*
    * this highlight a more complex use of navigate method, here we set already on '/recipes/id'
    * this.router.navigate(['../..','recipes',this.id,'edit'],{relativeTo:this.route});
    * We use a simple approach here after:
    * */    
    this.router.navigate(['edit'],{relativeTo:this.route});    
  }

  onAddToShoppingList(){  
    this.recipeService.addIngredientToShoppingList(this.recipe.ingredients);    
  } 
  onDelete(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['../'],{relativeTo:this.route});
  }
}
