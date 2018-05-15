import { Component, OnInit, OnDestroy} from '@angular/core';
import {Recipe}  from '../recipe.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromRecipes from '../store/recipe.reducers'
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit{
  recipesState:Observable<fromRecipes.State>;  
  constructor(private route:ActivatedRoute, 
              private router:Router, 
              private store:Store<fromRecipes.FeaturesState>) { }

  ngOnInit() {
    this.recipesState = this.store.select('recipesState');     
  }
  onNewRecipe(){
    this.router.navigate(['new'],{relativeTo:this.route});
  }
}
