import { Component } from '@angular/core';
import { InventoryService } from '../services/inventory.service';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent {

  response_msg: string = '';
  isError: boolean = false;
  current_date=new Date();  
  isSuccess: boolean | undefined;
  login_user=sessionStorage.getItem('login_user');
  categorys = {
    category: ''
    // default_subcategory: ''    
  };
  constructor(private InventoryService:InventoryService){}

  invDeviecs_addCategory_TS() {
    this.InventoryService.invDeviecs_addCategory(this.categorys).subscribe({
      next:success=>{
        // alert( JSON.stringify(success))
        // this.response_msg = JSON.stringify(success);
        this.response_msg = success.message; 
        this.isSuccess = true;
      },      
      error: (error) => {
        this.response_msg=error.message;
        // alert(error.message);
       }  


    })
  }

  resetAll() {
    this.categorys = {
      category: '',
      // default_subcategory: 'default'    
    };
  }

}
