import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";




import { RecipesComponent } from "./recipes.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RouterModule } from "@angular/router";
import { AuthGuardService } from "../auth/auth-guard.service";



const recipesRoutes:Routes= [
    // {path:'' , redirectTo:'/recipes', pathMatch:'full'}, //only redirect if the full path is empty ''    
    // {path:'recipes', component:RecipesComponent, children:[
    {path:'', component:RecipesComponent, children:[  //we will be lading this 
        {path:'',component:RecipeStartComponent},    
        {path:'new',component:RecipeEditComponent}, 
        {path:':id', component:RecipeDetailComponent},           
        {path:':id/edit', component:RecipeEditComponent},        
        ],canActivate:[AuthGuardService]}
];
@NgModule({
    declarations:[],
    imports:[RouterModule.forChild(recipesRoutes)], //RouterModule.forRoot(recipesRoutes) valid only in root app module since 
                                                    //we no longer in a root module :->
                                                    //every feature routing module is a child module 
                                                    //her we should use : RouterModule.forChild(recipesRoutes)
                                                    //at the ned everything will be directly/indirectly imported in appModule
    exports:[RouterModule]
})

export class RecipesRoutingModule{

}



