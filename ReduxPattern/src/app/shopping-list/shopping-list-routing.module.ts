import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";



// import { ShoppingListComponent } from "./shopping-list.component";
import { AuthGuardService } from "../auth/auth-guard.service";
import { ShoppingListComponent } from "./shopping-list.component";

const routes:Routes = [
    //  {path:'', component:ShoppingListComponent},
];


@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]

})
export class ShoppingListRoutingModule{

}