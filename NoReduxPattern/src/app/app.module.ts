import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
// import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { HttpClientModule } from '@angular/common/http';

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
    // ShoppingListModule,
    AuthModule,
    CoreModule //this exports : AppRoutingModule, HeaderComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
