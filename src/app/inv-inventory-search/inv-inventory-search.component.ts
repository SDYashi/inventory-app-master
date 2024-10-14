import { Component } from '@angular/core';
import { InventoryService } from '../services/inventory.service';

import * as XLSX from 'xlsx';

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
        // this.response_msg = "Inventory Record Fetched Successfully....";
      },     
      error: (error) => {
        this.response_msg = error.message;
        this.isSuccess = false;   
        this.searchform_value=false;     
       }     
    });  
  }

  downloadTable() {
    const table = document.getElementById('myTable');
  
    if (table instanceof HTMLTableElement) {
      const data = this.getTableData(table);
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(data);
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
      const blob = new Blob([XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' })], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'table_data.xlsx';
      a.click();
      URL.revokeObjectURL(url); // Clean up the URL object
    } else {
      console.error('Table element not found or is not a table');
    }
  }
  
  getTableData(table: HTMLTableElement) {
    const data = [];
    const rows = table.rows;
  
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const rowData = [];
      for (let j = 0; j < row.cells.length; j++) {
        rowData.push(row.cells[j].textContent);
      }
      data.push(rowData);
    }
    
    return data;
  }
}
