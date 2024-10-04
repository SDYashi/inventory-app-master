import { Component } from '@angular/core';
import { InventoryService } from '../services/inventory.service';

@Component({
  selector: 'app-category-subcategory-view',
  templateUrl: './category-subcategory-view.component.html',
  styleUrls: ['./category-subcategory-view.component.css']
})
export class CategorySubcategoryViewComponent {

    
  // viewSubCategory: any[] = [];
  data: any[] = [];
  pageSize: number = 10;
  pageCount: number | undefined;
  currentPageData: any[] = [];
  pages: number[] = [];
  constructor(private InventoryService:InventoryService){}

  ngOnInit(): void {
      this.InventoryService.invDeviecs_viewSubCategory().subscribe({
          next: (success) => {
              // alert(JSON.stringify(success));
              console.log(success);
              this.currentPageData = success;
          },
          error: (error) => {
              console.error('Error:', error);
              alert(`Error: ${error.message}`);
          }
      });
  }

}



