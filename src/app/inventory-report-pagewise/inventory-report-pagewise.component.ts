import { Component } from '@angular/core';
import { InventoryService } from '../services/inventory.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-inventory-report-pagewise',
  templateUrl: './inventory-report-pagewise.component.html',
  styleUrls: ['./inventory-report-pagewise.component.css']
})
export class InventoryReportPagewiseComponent {
  equipment: any[] = [];
  totalCount: number = 0;
  pageNumber: number = 1;
  pageSize: number = 100;
  totalPages: number = 0;
  search: string = '';
  loading = true;

  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.loadEquipment();
  }

  loadEquipment(): void {
    this.inventoryService.invDeviecs_ViewEquipmentList(this.pageNumber, this.pageSize, this.search)
      .subscribe((response: { results: any[]; total_count: number; page_number: number; page_size: number; total_pages: number; }) => {
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


  downloadExcel(): void {
    const equipmentData = this.equipment;
    const worksheet = XLSX.utils.json_to_sheet(equipmentData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Equipment');
  
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'equipment');
  }
  
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    const url = window.URL.createObjectURL(data);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${fileName}.xlsx`;
    link.click();
    window.URL.revokeObjectURL(url);
  }
}