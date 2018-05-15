import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ShoppingListComponent } from "./shopping-list.component";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { FormsModule } from "@angular/forms";
import { ShoppingListRoutingModule } from "./shopping-list-routing.module";

@NgModule({
    declarations:[
        ShoppingListComponent,
        ShoppingEditComponent
        ],
    imports:[
            CommonModule,           
            FormsModule,
            ShoppingListRoutingModule
        ]
        
})
export class ShoppingListModule{

}