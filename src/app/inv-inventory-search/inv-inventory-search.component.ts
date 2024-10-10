import { Component } from '@angular/core';
import { InventoryService } from '../services/inventory.service';

@Component({
  selector: 'app-inv-inventory-search',
  templateUrl: './inv-inventory-search.component.html',
  styleUrls: ['./inv-inventory-search.component.css']
})
export class InvInventorySearchComponent {
  subcategorys = {
    assignedTypes: ['', 'employee', 'location'],
    assigned_to: ''
  };
  selectedType: string = '';
  response_msg: any;
  isSuccess: any;
  data:any=[];
  searchform_value=false;

  constructor(private InventoryService: InventoryService) { }

  postSearch() {
    this.InventoryService.invDeviecs_SearchInventoryByEMP_LOC(this.selectedType, this.subcategorys.assigned_to).subscribe({
      next: (result: any) => {    
        this.data = result;    
        this.searchform_value=true;    
        this.isSuccess = true;      
        this.response_msg = "Inventory Record Fetched Successfully....";
      },     
      error: (error) => {
        this.response_msg = error.message;
        this.isSuccess = false;   
        this.searchform_value=false;     
       }     
    });  
  }
}
