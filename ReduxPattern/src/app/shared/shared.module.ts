import { NgModule } from "@angular/core";
import { DropdownDirective } from "./dropdown.directive";
import { CommonModule } from "@angular/common";

@NgModule({
 declarations:[    
     DropdownDirective, //we cannot declare the same pipes or directive in more than one module
    //Otherwise we get an error : Uncaught Error: Type DropdownDirective is part of the declarations of 2 modules]
    ],
    imports:[],
 exports:[
     CommonModule, //importing CommonModule is optional we could export it without importing it
     DropdownDirective, //by default everything we setup in module is available only inside that module
                             //since here we will use DropdownDirective outside, we need to export it to make available
                            //outside. 
    ]
})

export class SharedModule {
}