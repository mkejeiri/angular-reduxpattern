import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/app.reducers';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth/store/auth.effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

 
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, // this has in addition to CommonModule features, features that are needed only at the app startup
    // AppRoutingModule,    
    // HttpModule,
    HttpClientModule,
    // RecipesModule,
    SharedModule,
    /* * * * * *
     * We remove ShoppingListModule to enable lazy loading
     * * * * * */
    ShoppingListModule,
    AuthModule,
    CoreModule, //this exports : AppRoutingModule, HeaderComponent


    
    /**
     * shoppingList part of the app and we point there to shoppingListReducers
     * 
     * NgRx will set up a store, register shoppingListReducer as an element which can edit the store and
     * taking into account that the initial state as one piece of overall app state.  
     */
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AuthEffects]),
    StoreRouterConnectingModule,
    /**
     * remember that this should be added after StoreModule.forRoot(reducers)
     * StoreDevtoolsModule.instrument() not added when in PRD mode!
     */
    !environment.production? StoreDevtoolsModule.instrument():[] //<-pass an empty array when in PRD mode
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
