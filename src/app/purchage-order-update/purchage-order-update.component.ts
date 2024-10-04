import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InventoryService } from '../services/inventory.service';
import { Order } from '../data-type';

@Component({
  selector: 'app-purchage-order-update',
  templateUrl: './purchage-order-update.component.html',
  styleUrls: ['./purchage-order-update.component.css']
})
export class PurchageOrderUpdateComponent {
  response_msg: string = '';
  isSuccess: boolean | undefined;
  current_date=new Date();  
  viewdata: any[] = []; 
  login_user=sessionStorage.getItem('login_user');

  create_order = {
    id:'',
    order_number: '',
    po_number: '',  
    po_type: '',  
    project_id: '',  
    project_name: '',  
    supplier_id: '',  
    supplier_name: '',  
    purchase_date: ''
  };

  order_number_search = {
    order_numbers: '',
  };

  poNumberList :string[]=[];
  orderList:Order[]=[];

  constructor(private InventoryService:InventoryService){}

   invDevices_SearchPurchase_TS(){
    this.InventoryService.invDeviecs_ViewPruchaseOrderbyid(this.order_number_search.order_numbers).subscribe({
      next: (result:any) => {      
            
                console.log(result[0])
                this.create_order =result[0];
      },   
      error: (error) => {
        this.response_msg=error.message;
       }      
    }); 

    }

  invDeviecs_UpdatePurchageOrder_TS(){  

    this.InventoryService.invDeviecs_UpdatePruchaseOrder(this.create_order).subscribe({
      next:success=>{     
        alert(success)  
        this.response_msg = success.message; 
        this.isSuccess = true;
      },      
      error: (error) => {
        this.response_msg=error.message;
        alert(error)  
       }  

    })


  }

}
