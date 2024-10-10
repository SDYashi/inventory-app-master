import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './services/auth.guard';
import { InventoryReportComponent } from './inventory-report/inventory-report.component';
import { AddInventory2Component } from './add-inventory2/add-inventory2.component';
import { EditInventory2Component } from './edit-inventory2/edit-inventory2.component';
import { IssueInventory2Component } from './issue-inventory2/issue-inventory2.component';
import { ReceiveInventory2Component } from './receive-inventory2/receive-inventory2.component';
import { AssignmentHistoryComponent } from './assignment-history/assignment-history.component';
import { InvDashboardComponent } from './inv-dashboard/inv-dashboard.component';
import { CategoryAddComponent } from './category-add/category-add.component';
import { CategoryViewComponent } from './category-view/category-view.component';
import { CategorySubcategoryAddComponent } from './category-subcategory-add/category-subcategory-add.component';
import { CategorySubcategoryViewComponent } from './category-subcategory-view/category-subcategory-view.component';
import { InventoryReportPagewiseComponent } from './inventory-report-pagewise/inventory-report-pagewise.component';
import { UpcomingRetirementsComponent } from './upcoming-retirements/upcoming-retirements.component';
import { PurchageOrderAddComponent } from './purchage-order-add/purchage-order-add.component';
import { PurchageOrderUpdateComponent } from './purchage-order-update/purchage-order-update.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { PurchaseOrderViewComponent } from './purchase-order-view/purchase-order-view.component';
import { InvUserProfileComponent } from './inv-user-profile/inv-user-profile.component';
import { InvPasswordChangeProfileComponent } from './inv-password-change-profile/inv-password-change-profile.component';
import { InvInventorySearchComponent } from './inv-inventory-search/inv-inventory-search.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'login',
    pathMatch:'full'
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'home',
    component:HomeComponent,
    canActivate: [AuthGuard],
    children: [
      { path:'', redirectTo:'inventory-welcome',  pathMatch:'full' },
      { path: 'inventory-search', component:InvInventorySearchComponent },
      { path: 'inventory-user-profile', component:InvUserProfileComponent },
      { path: 'inventory-user-changepassword', component:InvPasswordChangeProfileComponent },
      { path: 'inventory-welcome', component:WelcomeComponent },
      { path: 'category-add', component:CategoryAddComponent },
      { path: 'category-view', component:CategoryViewComponent },
      { path: 'category-subcategory-add', component:CategorySubcategoryAddComponent },
      { path: 'category-subcategory-view', component:CategorySubcategoryViewComponent },
      { path: 'inventory-add', component:AddInventory2Component },
      { path: 'inventory-edit', component:EditInventory2Component },
      {path:'inventory-issue', component:IssueInventory2Component},
      {path:'inventory-recieve', component:ReceiveInventory2Component},
      {path:'inventory-assignment-history',component:AssignmentHistoryComponent},
      {path:'inventory-report',component:InventoryReportComponent},
      {path:'inventory-dashboard',component:InvDashboardComponent},
      {path:'inventory-report-all',component:InventoryReportComponent},
      {path:'inventory-report-page-wise',component:InventoryReportPagewiseComponent},
      {path:'employee-retirement-report',component:UpcomingRetirementsComponent},
      { path: 'purchase-order-add', component:PurchageOrderAddComponent },
      { path: 'purchase-order-view', component:PurchaseOrderViewComponent },
      { path: 'purchase-order-update', component:PurchageOrderUpdateComponent },
      
    ]     
  },
  { path: 'login', component: LoginComponent },  // Allow login page without guard
  { path: '**', redirectTo: '/login' },  // Wildcard route for non-authenticated routes
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
