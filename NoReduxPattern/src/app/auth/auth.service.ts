import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Injectable()
/**
 * this service will be responsible for authentication
 */
export class AuthService {

  constructor(private router:Router) { }
  token:string = null;
  signUpUser(email:string, password:string){
    //this a promise we could listen to, here we are interested in any potential errors    
    return firebase.auth().createUserWithEmailAndPassword(email,password)
    .catch(
     (err) => {
       console.log(err);
      });
  }

  signInUser(email:string, password:string){
    //we could return a promise and handles it in the component 
    //or handles it here
    firebase.auth().signInWithEmailAndPassword(email,password)
    .then(
      (res)=>{       
        firebase.auth().currentUser.getIdToken()
        .then(
          (token:string) =>{
          this.token = token;
        });  
        this.router.navigate(['/']);    
      })
      .catch(
          (err) => {
            console.log(err);
      });
  }

  /**
   * getToken(forceRefresh?: boolean): Promise<any>;
   * firebase will fetch async the token in the backend (not localstorage) 
   * The app can't wait for a promise:
   *  1- we need to store the token inside 'token' prop when the user signin
   *  2- update the token whenever we can through getToken() method
   * as might happens temporarely, the user could get an expired token but then we will get 
   * a valid one when we try again!, we have to handle this through messages
   */

  getToken(){
    firebase.auth().currentUser.getIdToken()
    .then(
      (token:string) =>{
      this.token = token;
    });
    return this.token; 
  }

  isAuthenticated():boolean{
    return this.token != null;
  }

  logOut(){
    this.token=null;
    firebase.auth().signOut();
  }
}
