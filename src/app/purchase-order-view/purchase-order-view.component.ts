import { Component } from '@angular/core';
import { InventoryService } from '../services/inventory.service';
import { Order } from '../data-type';

@Component({
  selector: 'app-purchase-order-view',
  templateUrl: './purchase-order-view.component.html',
  styleUrls: ['./purchase-order-view.component.css']
})
export class PurchaseOrderViewComponent {

  orders: Order[]=[];
  
  constructor(private inventoryService:InventoryService){}

  ngOnInit(): void {
    this.inventoryService.invDeviecs_ViewPruchaseOrder().subscribe(orders => {
      this.orders = orders;
    });
  }
}


