import { Component } from '@angular/core';
import { InventoryService } from '../services/inventory.service';

@Component({
  selector: 'app-purchage-order-add',
  templateUrl: './purchage-order-add.component.html',
  styleUrls: ['./purchage-order-add.component.css']
})
export class PurchageOrderAddComponent {
  response_msg: string = '';
  isSuccess: boolean | undefined;
  current_date=new Date();  
  viewCategory: any[] = [];

  login_user=sessionStorage.getItem('login_user');
  create_order = {
    order_number: '',
    po_number: '',  
    po_type: '',  
    project_id: '',  
    project_name: '',  
    supplier_id: '',  
    supplier_name: '',  
    purchase_date: ''
  };

  constructor(private InventoryService:InventoryService){}
  
  invDeviecs_addPurchageOrder_TS(){    
    this.InventoryService.invDeviecs_addPruchaseOrder(this.create_order).subscribe({
      next:success=>{        
        this.response_msg = success.message; 
        this.isSuccess = true;
      },      
      error: (error) => {
        this.response_msg=error.message;
       }  

    })

  }

}
