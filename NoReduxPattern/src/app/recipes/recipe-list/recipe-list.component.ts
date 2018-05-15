import { Component, OnInit, OnDestroy} from '@angular/core';
import {Recipe}  from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { DataStorageService } from '../../shared/data-storage.service';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  // @Output('recipeClicked') recipeSelected = new EventEmitter <Recipe>(); 
  recipes: Recipe[];
  hideMessage=true;
  IsDataSavedSubscription:Subscription;
  private subscription:Subscription;
  constructor(private recipeService:RecipeService, private route:ActivatedRoute, private router:Router
    , private httpService:DataStorageService) { }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes(); 
    this.subscription = this.recipeService.recipeChanged.subscribe(
      (recipes:Recipe[]) => {
                this.recipes = recipes;
      });

      this.IsDataSavedSubscription=this.httpService.IsDataSaved.subscribe((isDataSaved:boolean)=>{
        if (isDataSaved) {
          this.hideMessage=false; 
          setTimeout(()=>{
            this.hideMessage=true;
          },1000); 
        }
      })
  }

  onNewRecipe(){
    // this.router.navigate(['../recipes/edit'],{relativeTo:this.route});
    this.router.navigate(['new'],{relativeTo:this.route});
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
    this.IsDataSavedSubscription.unsubscribe();
    
  }


 

}
