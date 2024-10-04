import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyComponentHomeComponent } from './my-component-home.component';
import { AuthGuard } from '../services/auth.guard';
import { AddInventory2Component } from '../add-inventory2/add-inventory2.component';
import { EditInventory2Component } from '../edit-inventory2/edit-inventory2.component';
import { AddInventoryComponent } from './MyComponents/add-inventory/add-inventory.component';
import { EditInventoryComponent } from './MyComponents/edit-inventory/edit-inventory.component';
import { IssueInventoryComponent } from './MyComponents/issue-inventory/issue-inventory.component';
import { RecieveInventoryComponent } from './MyComponents/recieve-inventory/recieve-inventory.component';
import { AssignmentHistoryComponent } from '../assignment-history/assignment-history.component';
import { InventoryReportComponent } from './MyComponents/inventory-report/inventory-report.component';
import { InvDashboardComponent } from './MyComponents/inv-dashboard/inv-dashboard.component';

const routes: Routes = [  
  {
    path:'home',
    component:MyComponentHomeComponent,
    canActivate: [AuthGuard],
    children: [
      { path:'', redirectTo:'inventory-dashboard',  pathMatch:'full' },
      { path: 'inventory-add', component:AddInventoryComponent},
      { path: 'inventory-edit', component:EditInventoryComponent },
      {path:'inventory-issue', component:IssueInventoryComponent},
      {path:'inventory-recieve', component:RecieveInventoryComponent},
      {path:'inventory-assignment-history',component:AssignmentHistoryComponent},
      {path:'inventory-report',component:InventoryReportComponent},
      {path:'inventory-dashboard',component:InvDashboardComponent},
      
    ]     
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryTrackRoutingModule { }
