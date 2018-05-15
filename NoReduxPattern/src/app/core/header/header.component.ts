import { Component,Output ,EventEmitter}  from '@angular/core';
import { DataStorageService } from '../../shared/data-storage.service';
import { RecipeService } from '../../recipes/recipe.service';
import { Response } from '@angular/http';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
@Component({
    selector:'app-header',
    templateUrl:'./header.component.html',
    styleUrls:['./header.component.css']
})
export class HeaderComponent{ 
    constructor(private httpService: DataStorageService,
                private recipeService:RecipeService,
                public authService:AuthService,
                private router:Router){}
    
    onSaveData(){
        this.httpService.saveData()
        .subscribe((response:Response)=>{
            if (response.status == 200) {
                console.info('Data is successfully saved');
                this.httpService.IsDataSaved.next(true);
            } 
            console.log(response);            
        },
        (error:Response)=>{
            console.error(error);
        });
    }
    onFetchData(){
        this.httpService.fetchData();
        /**
         * if we deal with observable!
         */
        //     this.httpService.fetchData()
        //     .subscribe((recipes)=>{
        //         this.recipeService.updateRecipes(recipes);   
        //     },(error:Response) =>{
        //         console.error(error);
        //     }
        // );

    
    }
    onLogout(){
        this.authService.logOut();
        this.router.navigate(['/signin']);

      }
    
}