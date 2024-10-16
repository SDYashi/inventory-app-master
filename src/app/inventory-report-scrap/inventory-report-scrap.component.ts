import { Component } from '@angular/core';
import { InventoryService } from '../services/inventory.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-inventory-report-scrap',
  templateUrl: './inventory-report-scrap.component.html',
  styleUrls: ['./inventory-report-scrap.component.css']
})
export class InventoryReportScrapComponent {
  equipment: any;
  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.inventoryService.ViewScrapSurvey_ReportsList()
      .subscribe({
        next:response=>{
          this.equipment = response;
        
        },
        error:errors=>{
        alert(errors);
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
