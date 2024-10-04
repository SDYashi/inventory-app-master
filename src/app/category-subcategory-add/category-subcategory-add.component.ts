import { Component } from '@angular/core';
import { InventoryService } from '../services/inventory.service';

@Component({
  selector: 'app-category-subcategory-add',
  templateUrl: './category-subcategory-add.component.html',
  styleUrls: ['./category-subcategory-add.component.css']
})
export class CategorySubcategoryAddComponent {




  response_msg: string = '';
  isSuccess: boolean | undefined;
  current_date=new Date();  
  viewCategory: any[] = [];

  login_user=sessionStorage.getItem('login_user');
  subcategorys = {
    category: '',
    subcategory: '',  
  };

  constructor(private InventoryService:InventoryService){}

  ngOnInit(): void {
    
    this.InventoryService.getCategoryLov().subscribe({
      next: (result:any) => {
        this.viewCategory=result.category_list;        
        console.warn("category lov: ",this.viewCategory);      
      },     
      error: (error) => {
        this.response_msg=error.message;
        // alert(error.message);
       }     
    });  
  }


  




  invDeviecs_addSubCategory_TS() {
    // alert( JSON.stringify(this.subcategorys))
    this.InventoryService.invDeviecs_addSubCategory(this.subcategorys).subscribe({
      next:success=>{
        //  alert( JSON.stringify(success))
        // this.response_msg = JSON.stringify(success);  
        this.response_msg = success.message 
        this.isSuccess = true;
      },     
      error: (error) => {
        this.response_msg=error.message;
        // alert(error.message);
       }  


    })
  }

  resetAll() {
    this.subcategorys = {
      category:'',
      subcategory: '',
    };
  }

}


