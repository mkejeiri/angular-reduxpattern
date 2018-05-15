
import { Injectable } from '@angular/core';
// import {Headers, Http,Response } from '@angular/http';
import {Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipes/recipe.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Subject } from 'rxjs/Rx';
import { RecipeService } from '../recipes/recipe.service';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Ingredient } from './Ingredient.model';
import { AuthService } from '../auth/auth.service';
import { HttpHeaders } from '@angular/common/http';
import { HttpParams, HttpRequest } from '@angular/common/http';

@Injectable()
export class DataStorageService {
private token:string='';
  // header = new Headers({'Content-Type':'application/json'});
  readonly headers = new HttpHeaders().set('Content-Type','application/json');

  constructor(private httpClient:HttpClient, private recipeService:RecipeService,
              private slService:ShoppingListService,
              private authService:AuthService) {}

/**
 * HttpClient/HttpClientModule vs Http/HttpModule 
 * HttpClient has 2 new feature :
 *    - Casting of the data : 
 */

  saveData():Observable<Object>{
    // const token = this.authService.getToken();    
    // return this.httpClient.put('https://recipes-1978.firebaseio.com/recipes.json',
    //                     this.recipeService.getRecipes(),
    //                     {
    //                       observe:'body',
    //                       headers:this.headers,
    //                       params: new HttpParams().set('auth', token)
    //                     })
    // .map((data)=>{
    //   this.IsDataSaved.next(false);
    //   return data;
    // });

    const req = new HttpRequest('PUT','https://recipes-1978.firebaseio.com/recipes.json', this.recipeService.getRecipes()
                    ,{reportProgress:true}
                      // ,{reportProgress:true, params: new HttpParams().set('auth', token)} //we will use intercept
                  )

     return this.httpClient.request(req);
  }


  // fetchData():Observable<Recipe[]>{
  //   return this.http.get('https://recipes-1978.firebaseio.com/recipes.json')
  //   .map((response:Response)=>{
  //     return (<Recipe[]>response.json()); 
  //   }).catch((error) => {
  //     return Observable.throw('Unable to fetch the data from the server');
  //   });
  // }


  fetchData(){
    // const token = this.authService.getToken();

    /**
     * HttpClient/HttpClientModule vs Http/HttpModule 
     * HttpClient has 2 new feature :
     *    - Casting of the data : e.g.  this.httpClient.get<Recipe[]>
     *    - Response body autoextract: e.g. we get directly the recipes
     
     * with HttpClient we could cast in the get the data (extracted response body) that we get
     * not that recipes doesn't need the cast afterwards!
     * 
     */
     
    // this.httpClient.get<Recipe[]>('https://recipes-1978.firebaseio.com/recipes.json?auth=' + token)
    this.httpClient.get<Recipe[]>('https://recipes-1978.firebaseio.com/recipes.json')
    /**
     * here we get a recipes because httpClient extract autolatically the body of the response
     */
    .subscribe((recipes) =>{
      //const recipes =<Recipe[]>response.json();
      //to keep the datamodel consistent
      //in case we remove all ingredient
      for(const recipe of recipes){
        if (!recipe['ingredients']){         
          recipe['ingredients'] = [];
        }
      }
      this.recipeService.setRecipes(recipes);
    })
  }
  IsDataSaved = new Subject<boolean>();

  saveIngredients(): Observable<Object>{   
    // const token = this.authService.getToken();    
    // return this.httpClient.put('https://recipes-1978.firebaseio.com/ingredients.json?auth=' + token,
    //                     this.slService.getIngredients(),
    //                     {headers:this.headers});

    return this.httpClient.put('https://recipes-1978.firebaseio.com/ingredients.json', this.slService.getIngredients())
  }

  getIngredients(){
    // const token = this.authService.getToken();    
    // this.httpClient.get<Ingredient[]>('https://recipes-1978.firebaseio.com/ingredients.json?auth=' + token)
    // .subscribe((ingredients) =>{
    //   this.slService.setIngrendients(ingredients);
    // })

    this.httpClient.get<Ingredient[]>('https://recipes-1978.firebaseio.com/ingredients.json')
    .subscribe((ingredients) =>{
      this.slService.setIngrendients(ingredients);
    })
  }
}
