import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../services/inventory.service';
import { EmployeeRetirement } from '../data-type';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-upcoming-retirements',
  templateUrl: './upcoming-retirements.component.html',
  styleUrls: ['./upcoming-retirements.component.css']
})
export class UpcomingRetirementsComponent implements OnInit{  
  employeeList: EmployeeRetirement[] = [];
  paginatedList: EmployeeRetirement[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 50;
  totalPages: number = 0;
  constructor(private inventoryService:InventoryService){}
  
  ngOnInit() {
    this.getEmployeeRetirementData();
  }

  getEmployeeRetirementData(){
    this.inventoryService.getEmployeeRetirementList().subscribe({next:(result:EmployeeRetirement[])=>{
    console.log(result);
    this.employeeList = result;
    this.totalPages = Math.ceil(this.employeeList.length / this.itemsPerPage);
    this.paginateList();
    },
    error:(error)=>{
     // this.errorMessage=error.message;
     console.warn(error.message);
    }    
  });
  }
  getRetirementDate(dateOfBirth: string): string {
    const birthDate = new Date(dateOfBirth);
    const retirementDate = new Date(birthDate.setFullYear(birthDate.getFullYear() + 62));
    return retirementDate.toISOString().split('T')[0]; // Return in YYYY-MM-DD format
  }
  

  search() {
    const filteredList = this.employeeList.filter(employee => 
      employee.employee_name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      employee.designation.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      employee.office_name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.totalPages = Math.ceil(filteredList.length / this.itemsPerPage);
    this.paginatedList = filteredList.slice(0, this.itemsPerPage);
  }

  paginateList() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedList = this.employeeList.slice(start, end);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginateList();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateList();
    }
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
