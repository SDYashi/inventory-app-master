import { Component } from '@angular/core';
import { InventoryService } from '../services/inventory.service';
import { EquipmentResponse } from '../data-type';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-inv-scrap-return-to-store',
  templateUrl: './inv-scrap-return-to-store.component.html',
  styleUrls: ['./inv-scrap-return-to-store.component.css']
})
export class InvScrapReturnToStoreComponent {
  equipment_response: any;
  equipment:any;
  response_msg: string = '';
  isSuccess: boolean | undefined;
  error_value_search_validate = false;

  ReturntoStorForm:any={
    survey_no:"",
    sanctioned_order_no:"",
    sanctioned_order_date:"",
    indent_number:"",
    indent_date:"",
    store_name:"",
  }
  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.inventoryService.ViewScrapSurvey_ReportsList()
      .subscribe({
        next:response=>{
          this.equipment = response;
          this.isSuccess=true;
          this.response_msg=response.message; 
        },
        error:errors=>{
          this.isSuccess=false;
          this.response_msg=errors.message;

        }
      });
  }
  onAssetParticularChange(event: any) {
    // const selectedSurveyNo = event.target.value;
    // this.filteredEquipment = this.equipment.filter((item: { survey_no: any; }) => item.survey_no === selectedSurveyNo);
    // this.error_value_search_validate = true;
  }
  onSubmitChangeData(){
   this.inventoryService.invDeviecs_Returntostore_scrapitem(this.ReturntoStorForm).subscribe({
    next:success=>{   
      this.isSuccess=true;
      this.response_msg=success.message; 
      this.equipment_response = success;
    },
    error:error=>{
      this.isSuccess=false;
      this.response_msg=error.message;
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
