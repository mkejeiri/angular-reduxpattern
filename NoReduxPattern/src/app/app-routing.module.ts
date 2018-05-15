import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./core/home/home.component";
import { AuthGuardService } from "./auth/auth-guard.service";

const appRoutes:Routes = [        
       // {path:'' , redirectTo:'/recipes', pathMatch:'full'}, //only redirect if the full path is empty ''
    {path:'' , component:HomeComponent}, 
    {path:'recipes',loadChildren:'./recipes/recipes.module#RecipesModule',canActivate:[AuthGuardService]}, //here where the leazy loading occurs
    {path:'shopping-list',loadChildren:'./shopping-list/shopping-list.module#ShoppingListModule',canActivate:[AuthGuardService]} //here where the leazy loading occurs
    

    ];      
@NgModule({
    declarations:[], 
    /*
    * Unlike components (selectors), we DO NOT need to declare components 
    * (e.g. SignupComponent,SigninComponent) in order to use the routing 
    imports:[RouterModule.forRoot(appRoutes,{preloadingStrategy:PreloadAllModules, useHash:true})],
    */
    imports:[RouterModule.forRoot(appRoutes,{useHash:true})],
    exports:[RouterModule],
  })
export class AppRoutingModule{

}