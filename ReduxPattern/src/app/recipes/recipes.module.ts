
/**
 * Required modules by angular
 */
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";


/**
 * Typescript language features required from a technical perspective!!!
 */
import { RecipesComponent } from "./recipes.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { ReactiveFormsModule } from "@angular/forms";
import { RecipesRoutingModule } from "./recipes-routing.module";
import { SharedModule } from "../shared/shared.module";
import { StoreModule } from "@ngrx/store";
import { RecipeReducer } from "./store/recipe.reducers";
import { EffectsModule } from "@ngrx/effects";
import { RecipeEffects} from './store/recipe.effects'


@NgModule({
    declarations:[
        RecipesComponent,
        RecipeListComponent,
        RecipeDetailComponent,
        RecipeItemComponent,
        RecipeStartComponent,
        RecipeEditComponent
        ],
    imports:[
        CommonModule, //to be accurate we don't have to add this into every feature module,
                      //CommonModule would give access to common directives (e.g ngClass, ngIf,...) 
                      //chances are highly that featurse module use one of this directive!
                      /**
                       *  in app.module we BrowserModule: this has in addition to CommonModule features, 
                       *                                  features that are needed only at the app startup, that why we should 
                       *                                  use BrowserModule in AppModule and CommonModule in feature modules 
                       */
        ReactiveFormsModule,
        RecipesRoutingModule,
        SharedModule,
        StoreModule.forFeature('recipesState',RecipeReducer),
        EffectsModule.forFeature([RecipeEffects])
    ],
    exports:[],
    providers:[]   
})

/**
 * 
                                Modules structure :
                1- Typescript features: there are language features and simply required from a technical perspective,
                    e.g where to find a class, interface, or where it lives..., this is not related to angular module in anyway, 
                    only typescript need those import, and at the end webpack which used by the CLI will bundle these imports
                    in one final file!  

                2- Module feature: it has a declarations, imports, providers and boostrap, exports array: 
					declarations array: mainly contains the components	
                    imports array: contains built-in module and user modules, e.g FormsModule which simply defines 
                                    a bunch of directive we can use, like ngModel and ngForm...
					exports array: exportable modules used by others modules which imports the current one.
					providers array: mainly contains services
					bootstrap: array contains the app entry point components (root component)
					

					
					            WHY Use Feature Modules?
                    - It 's a great enghancement of code structuring: custom module would be a feature module	which 
                        contains its own components, directives, services which makes a only a simple feature in the apps, 
                        so we could group them together (e.g recipe books)... the apps will be boosted, linear and easy to maintain, 
                        it's much easier to know which component, services or modules belong to which specific feature, if we have 
                        a change request we know that we have to go only for a specific feature and quickly we can ID which 
                        dependency we have.
                    - Using feature modules will speedup the app and increase the performance, reduce the file size.
                    
                    
                     RecipeService use globally, it isn't a feature. BUT:
                     if we move this RecipeService to RecipesModule, 
                     the app will still work, because all modules loaded 
                     at app startup will be merged into a single root injector! 
			
 */


export class RecipesModule{

}