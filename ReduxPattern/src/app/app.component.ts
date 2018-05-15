import { Component, OnInit } from '@angular/core';
// import { elementClass } from '@angular/core/src/render3/instructions';
import * as firebase from 'firebase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 
  ngOnInit(){   
    /**
     * Firebase get intitialized at app startup
     * 
     *  
     * initializeApp expects JS object which we could retrieve in our backend!
       var config = {
          apiKey: "AIzaSyAMLsnJmBvXsihgvvqQPrSmeDHV3k9jHPY",
          authDomain: "recipes-1978.firebaseapp.com",
          databaseURL: "https://recipes-1978.firebaseio.com",
          projectId: "recipes-1978",
          storageBucket: "recipes-1978.appspot.com",
          messagingSenderId: "160523325534"
        };
        firebase.initializeApp(config);
     */
      firebase.initializeApp( {
        apiKey: "AIzaSyAMLsnJmBvXsihgvvqQPrSmeDHV3k9jHPY",
        authDomain: "recipes-1978.firebaseapp.com",
        databaseURL: "https://recipes-1978.firebaseio.com",
        projectId: "recipes-1978",
        storageBucket: "recipes-1978.appspot.com",
        messagingSenderId: "160523325534"
      });
  } 

}
