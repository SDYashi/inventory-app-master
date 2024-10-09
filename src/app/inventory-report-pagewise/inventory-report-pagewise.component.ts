import { Component } from '@angular/core';
import { InventoryService } from '../services/inventory.service';
import * as XLSX from 'xlsx';
import { Equipment, InventoryReport } from '../data-type';
import { ItemDetailDialogComponent } from '../item-detail-dialog/item-detail-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { SerialNumberDetailsComponent } from '../serial-number-details/serial-number-details.component';
@Component({
  selector: 'app-inventory-report-pagewise',
  templateUrl: './inventory-report-pagewise.component.html',
  styleUrls: ['./inventory-report-pagewise.component.css']
})
export class InventoryReportPagewiseComponent {
  equipment: Equipment[] = [];
  totalCount: number = 0;
  pageNumber: number = 1;
  pageSize: number = 100;
  totalPages: number = 0;
  search: string = '';
  loading = true;

  constructor(private inventoryService: InventoryService,private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadEquipment();
  }

  loadEquipment(): void {
    this.inventoryService.invDeviecs_ViewEquipmentList(this.pageNumber, this.pageSize, this.search)
      .subscribe((response: { results: Equipment[]; total_count: number; page_number: number; page_size: number; total_pages: number; }) => {
        this.loading = false;
        this.equipment = response.results;
        this.totalCount = response.total_count;
        this.pageNumber = response.page_number;
        this.pageSize = response.page_size;
        this.totalPages = response.total_pages;
      });
  }

  paginate(pageNumber: number): void {
    this.pageNumber = pageNumber;
    this.loadEquipment();
  }

  getPageNumbers(): number[] {
    const startPage = Math.max(1, this.pageNumber - 1);
    const endPage = Math.min(this.totalPages, this.pageNumber + 1);
    return Array(endPage - startPage + 1).fill(0).map((_, i) => startPage + i);
  }

  onFilterChange(search_input: string): void {
    this.search = search_input;
    this.pageNumber = 1; // Reset page number to 1 when searching
    this.loadEquipment();
  }


  // downloadExcel(): void {
  //   const equipmentData = this.equipment;
  //   const worksheet = XLSX.utils.json_to_sheet(equipmentData);
  //   const workbook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(workbook, worksheet, 'Equipment');
  
  //   const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  //   this.saveAsExcelFile(excelBuffer, 'equipment');
  // }
  
  // private saveAsExcelFile(buffer: any, fileName: string): void {
  //   const data: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
  //   const url = window.URL.createObjectURL(data);
  //   const link = document.createElement('a');
  //   link.href = url;
  //   link.download = `${fileName}.xlsx`;
  //   link.click();
  //   window.URL.revokeObjectURL(url);
  // }

  downloadExcel() {
    // Define the data structure
    const worksheetData = this.equipment.map((item, index) => ({
      'S.No': index + 1,
      'Category': item.category,
      'SubCategory': item.sub_category,
      'Make': item.make,
      'Model': item.model,
      'Serial Number': item.serial_number,
      'Condition': item.condition,
      'Status': item.status,
      'Receipt Date': item.receipt_date ? new Date(item.receipt_date).toLocaleDateString() : '',
      'Assignment Type': item.assignment?.assigned_type || '',
      'Assigned To': item.assignment?.assigned_to || '',
      'Assigned To Details': item.assignment?.assigned_to_details || ''
    }));
  
    // Create a worksheet
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(worksheetData);
  
    // Create a new workbook and add the worksheet
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Equipment Data');
  
    // Export the Excel file
    XLSX.writeFile(workbook, 'Equipment_Data.xlsx');
  }
  openItemDetails(element: any): void {
    if (element.assignment) {
      this.dialog.open(ItemDetailDialogComponent, {
        width: '400px',
        data: {
          assignment: element.assignment  // Pass the assignment details to the dialog
        }
      });
    }
  }
  openSerialNumberDetails(equipment: Equipment): void {
    const dialogRef = this.dialog.open(SerialNumberDetailsComponent, {
      width: '500px',
      data: equipment
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog was closed');
    });
  }
  
}