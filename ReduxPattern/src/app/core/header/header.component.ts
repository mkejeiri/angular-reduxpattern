import { Component,Output ,EventEmitter, OnInit}  from '@angular/core';
import { Response } from '@angular/http';
import { Router } from '@angular/router';
import * as fromReducers from '../../store/app.reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromAuth from '../../auth/store/auth.reducers';
import * as fromAuthActions from '../../auth/store/auth.actions';
import * as RecipeActions from '../../recipes/store/recipe.actions';

@Component({
    selector:'app-header',
    templateUrl:'./header.component.html',
    styleUrls:['./header.component.css']
})
export class HeaderComponent implements OnInit{ 
    authState:Observable<fromAuth.AuthState>;
    constructor(private router:Router,
                private store:Store <fromReducers.AppState>){}
    ngOnInit(){      
        this.authState = this.store.select('auth').map((data)=>{           
            return data;
        });
    }
    
    onSaveData(){
       this.store.dispatch(new RecipeActions.StoreRecipes());
    }
    onFetchData(){
        this.store.dispatch(new RecipeActions.FetchRecipes());
    }
    onLogout(){
        this.store.dispatch(new fromAuthActions.LogOut());             
      }    
} 