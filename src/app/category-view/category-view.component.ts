import { Component } from '@angular/core';
import { InventoryService } from '../services/inventory.service';

@Component({
  selector: 'app-category-view',
  templateUrl: './category-view.component.html',
  styleUrls: ['./category-view.component.css']
})
export class CategoryViewComponent {

 
  viewCategory: any[] = [];
  pageSize: number = 10;
  pageCount: number | undefined;
  pages: number[] = [];

  constructor(private InventoryService:InventoryService){}

  ngOnInit(): void {
    
    this.InventoryService.getCategoryLov().subscribe({
      next: (result:any) => {
        this.viewCategory=result.category_list;        
        console.warn("category lov: ",this.viewCategory);      
      },
      error: (error) => {
              console.error('Error:', error);
              alert(`Error: ${error.message}`);
       }     
    });  
  }
}


