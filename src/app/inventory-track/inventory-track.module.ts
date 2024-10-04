import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryTrackRoutingModule } from './inventory-track-routing.module';
import { AddInventoryComponent } from './MyComponents/add-inventory/add-inventory.component';
import { InventoryAssignHistoryComponent } from './MyComponents/inventory-assign-history/inventory-assign-history.component';
import { EditInventoryComponent } from './MyComponents/edit-inventory/edit-inventory.component';
import { ImagedailogComponent } from './MyComponents/imagedailog/imagedailog.component';
import { InventoryReportComponent } from './MyComponents/inventory-report/inventory-report.component';
import { ItemDetailsDailogComponent } from './MyComponents/item-details-dailog/item-details-dailog.component';
import { RecieveInventoryComponent } from './MyComponents/recieve-inventory/recieve-inventory.component';
import { IssueInventoryComponent } from './MyComponents/issue-inventory/issue-inventory.component';
import { SerialNumberDetailsComponent } from './MyComponents/serial-number-details/serial-number-details.component';
import { MyComponentHomeComponent } from './my-component-home.component';


@NgModule({
  declarations: [
    AddInventoryComponent,
    InventoryAssignHistoryComponent,
    EditInventoryComponent,
    ImagedailogComponent,
    InventoryReportComponent,
    ItemDetailsDailogComponent,
    RecieveInventoryComponent,
    IssueInventoryComponent,
    SerialNumberDetailsComponent,
    MyComponentHomeComponent,
  ],
  imports: [
    CommonModule,
    InventoryTrackRoutingModule
  ]
})
export class InventoryTrackModule { }
