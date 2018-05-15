import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import * as fromRecipes from '../store/recipe.reducers';
import { Observable } from 'rxjs/Observable';
import * as RecipeActions from '../store/recipe.actions';
import 'rxjs/add/operator/take';



@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit{ 
  recipeState:Observable<fromRecipes.State>;
  id:number;
  constructor(private route: ActivatedRoute, 
              private router:Router,
              private store:Store<fromRecipes.FeaturesState>) {}

  ngOnInit() {
    this.route.params.subscribe((params:Params) =>{
      this.id = +params['id'];
      this.recipeState = this.store.select('recipesState');
    });    
    
  }

  onEditRecipe(){   
    this.router.navigate(['edit'],{relativeTo:this.route});    
  }

  onAddToShoppingList(){  
    this.store.select('recipesState')
    /**
     * take(1) to get one event and thereafter stop listening to it!
     * to make sure that it won't fire on every state change but ONLY ONCE!.
     */
    .take(1)
    .subscribe((recipe:fromRecipes.State)=>{      
      this.store.dispatch(new ShoppingListActions.AddIngredients(recipe.recipes[this.id].ingredients));
    });
  } 
  onDelete(){
    this.store.dispatch(new RecipeActions.DeleteRecipe(this.id));
    this.router.navigate(['../'],{relativeTo:this.route});
  }
}
