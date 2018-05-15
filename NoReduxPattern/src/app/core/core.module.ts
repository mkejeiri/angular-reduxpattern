/**
 * The core module will be ONLY imported by the root module (AppModule)
 */

import { NgModule } from "@angular/core";
import { HeaderComponent } from "./header/header.component";
import { HomeComponent } from "./home/home.component";
import { SharedModule } from "../shared/shared.module";
import { AppRoutingModule } from "../app-routing.module";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { RecipeService } from "../recipes/recipe.service";
import { DataStorageService } from "../shared/data-storage.service";
import { AuthService } from "../auth/auth.service";
import { AuthGuardService } from "../auth/auth-guard.service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "../shared/auth-interceptor";
import { LoggingInterceptor } from "../shared/logging-interceptor";

@NgModule({
    declarations:[
        /**
         * those are part of the root apps
         */
        HeaderComponent,
        HomeComponent],
    imports:[        
        SharedModule, //definetely we need it because of the dropdown diretive used by HeaderComponent
        AppRoutingModule //we need the routing functionality in our header
    ],
    exports:[
        AppRoutingModule, // it's  needed here and also in the root module (because it has the routing)
                          //AppComponent has a main <router-outlet>
                            
        HeaderComponent, // because needed in the AppComponent <app-header>
    ],
    providers:[ShoppingListService, 
               RecipeService, //RecipeService use globally, it isn't a feature. BUT:
                              //if we move this RecipeService to RecipesModule, 
                              //the app will still work, because all modules loaded 
                              //at app startup will be merged into a single root injector! 
               DataStorageService,
               AuthService,
               AuthGuardService,
               {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
               {provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true }             
    ]
})

export class CoreModule{
}
