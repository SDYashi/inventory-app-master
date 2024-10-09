import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InventoryService } from '../services/inventory.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-issue-inventory2',
  templateUrl: './issue-inventory2.component.html',
  styleUrls: ['./issue-inventory2.component.css']
})

export class IssueInventory2Component implements OnInit {
  issueFormStatus = false
  issueForm: boolean = false
  selectedFile: File | null = null;
  searchForm: FormGroup;
  assignment_id!: number;
  receiptType: string = 'issue';
  assignmentCondition: string[] = [];
  issueInventoryForm!: FormGroup;
  errorMessage!: string;
  assignedTypes = ['', 'Employee', 'Location', 'Vendor'];
  itemCondition: string[] = [];
  printReceipt: boolean = false
  @ViewChild('barcodeInput') barcodeInput!: ElementRef;
  response_msg: string = '';
  isSuccess: boolean | undefined;
  constructor(
    private fb: FormBuilder,
    private inventoryService: InventoryService, private datePipe: DatePipe,
    private route: Router) { this.searchForm = this.fb.group({ serialNumber: ['', Validators.required], }) }

  ngOnInit(): void {
    this.getLov();
    this.issueInventoryForm = this.fb.group({
      category_subCategory: [''],
      make_model: [''],
      id: [''],
      order_id: [''],
      receipt_date: [''],
      warranty_expiration: [''],
      condition: [''],
      status: [''],
      serial_number: [''],
      notes: [''],
      assigned_type: ['', Validators.required],
      assignee_id: ['', Validators.required],
      assigned_date: ['', Validators.required],
      assigned_to_details: ['', Validators.required],
      assigned_condition: ['', Validators.required],
      remark: [''],
      issue_person_code: [''],
      issue_person_name: [''],

    });
  }
  ngAfterViewInit(): void {
    // Automatically focus the input field when the component is initialized
    this.barcodeInput.nativeElement.focus();
  }

  getLov() {
    this.inventoryService.getItemConditionLov().subscribe({
      next: (result: any) => {
        if (result) {
          this.itemCondition = result.condition_list;
          console.warn("condition lov=", this.itemCondition);
        }
      },
      error: (error) => {
        this.errorMessage = error.message;
      }
    });

  }
  onFileSelected(event: Event) {
    if (!event) {
      console.error('File input event is undefined');
      return;
    }
    const input = event.target as HTMLInputElement;  // Cast to HTMLInputElement

    if (input?.files && input.files.length > 0) {   // Check if files exist
      const file: File = input.files[0];
      if (file.size <= 1 * 1024 * 1024) { // Check if file size is less than 10 MB
        this.selectedFile = file;
      } else {
        alert('File size exceeds 10 MB. Please select a smaller file.');
        input.value = '';
        return;
      }
      // Check file type
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        alert('Invalid file type. Please select a PDF or image file.');
        input.value = '';
        return; // Exit if file type is not allowed
      }
    }
  }
  onAssigneeIdChange() {
    const assignee_id = this.issueInventoryForm.get('assignee_id')?.value;
    const assigned_type = this.issueInventoryForm.get('assigned_type')?.value;
    if (assignee_id && assigned_type) {
      this.issueInventoryForm.patchValue({ assigned_to_details: '' });
      // Update other fields with employee/location details
      this.inventoryService.getAssigneeDetails(assigned_type, assignee_id).subscribe({
        next: (result: any) => {
          console.log('Assignee details:', result);
          if (result && result.employee_name) {
            // You can now set these details in your form or display them
            this.issueInventoryForm.patchValue({
              // Update other fields with employee/location details
              assigned_to_details: result.employee_name + " # " + result.designation + " # " + result.work_location
            });
          } else if (result && result.location_name) {
            this.issueInventoryForm.patchValue({ assigned_to_details: result.location_name });
          }else if (result && result.vendor_name) {
            this.issueInventoryForm.patchValue({ assigned_to_details: result.vendor_name });
          }
          // {"vendor_code": 1001, "vendor_name": "DATA CENTER"}
        },
        error: (error) => {
          // this.errorMessage=error.message;

          if (error.status == 404 ) {
            // Client-side error

            this.response_msg = ' Invalid Employee_No OR Loation_Code';


          }
          else {
            this.response_msg = error.message;
          }
        }
      });
    }
  }

  searchInventory() {
    const serialNumber = this.searchForm.value.serialNumber;
    if (serialNumber.trim()) {
      this.printReceipt = false
      this.issueInventoryForm.reset();
      this.inventoryService.getInventoryBySerialNumber(serialNumber).subscribe({
        next: (result: any) => {
          if (result) {
            if (result[0].status === 'ISSUED') {
              alert("This item is already issued. you can not issue it.");
              this.searchForm.reset();
              return;
            }
            this.issueFormStatus = true
            this.issueInventoryForm.patchValue(result[0]);
            this.issueInventoryForm.controls['warranty_expiration'].patchValue(this.datePipe.transform(result[0].warranty_expiration, 'dd-MM-yyyy'));
            this.issueInventoryForm.controls['receipt_date'].patchValue(this.datePipe.transform(result[0].receipt_date, 'dd-MM-yyyy'));
            this.issueInventoryForm.controls['category_subCategory'].patchValue(result[0].category + "  |  " + result[0].sub_category);
            this.issueInventoryForm.controls['make_model'].patchValue(result[0].make + "  |  " + result[0].model);
            this.issueInventoryForm.controls['assigned_condition'].patchValue(result[0].condition);
            this.searchForm.reset();
            this.errorMessage = '';
          } else {
            this.errorMessage = 'No inventory item found with this serial number.';
          }
        },
        error: (error) => {
          alert(error.message);
        }
      });
    } else {
      this.errorMessage = 'Please enter a valid serial number.';
    }
    // Reset the form after searching and focus back on the input field
    this.searchForm.reset();
    this.barcodeInput.nativeElement.focus();
  }

  onSubmit() {
    const formData: FormData = new FormData();
    // // Append form values
    if (this.issueInventoryForm.valid) {
      // Append form values to FormData
      formData.append('assigned_condition', this.issueInventoryForm.value.assigned_condition);
      formData.append('assigned_type', this.issueInventoryForm.value.assigned_type);
      formData.append('assignee_id', this.issueInventoryForm.value.assignee_id);
      formData.append('assigned_to_details', this.issueInventoryForm.value.assigned_to_details);
      formData.append('notes', this.issueInventoryForm.value.remark);
      formData.append('equipment_id', this.issueInventoryForm.value.id);
      formData.append('issue_person_code', this.issueInventoryForm.value.issue_person_code);
      formData.append('issue_person_name', this.issueInventoryForm.value.issue_person_name);

      // Safely transform the assigned_date, and handle null/undefined values
      const assignedDateValue = this.issueInventoryForm.value?.assigned_date;
      const formattedDate = assignedDateValue ? this.datePipe.transform(assignedDateValue, 'yyyy-MM-dd') : '';
      formData.append('assigned_date', formattedDate || '');

      // Append file if selected
      if (this.selectedFile) {
        formData.append('file', this.selectedFile);
      }

      this.inventoryService.issueInventory(formData).subscribe({
        next: (result: any) => {
          // console.log('Inventory items successfully submitted', result);
          if (result.status === 'success') {
            this.assignment_id = result.assignment_id;
            this.printReceipt = true;
            alert(result.message);
            this.issueInventoryForm.reset();
            this.barcodeInput.nativeElement.focus();
            // this.issueFormStatus=false;          
          }
        },
        error: (error) => {
          this.errorMessage = error.message;
          alert(error.message);
        }
      });
    }
  }
  onCancel(): void {
    this.printReceipt = false;
    this.issueInventoryForm.reset();
  }

  resetForm(): void {
    this.printReceipt = false;
    this.issueInventoryForm.reset();
    this.searchForm.reset();
    this.barcodeInput.nativeElement.focus();
  }

  onPrintReceipt() {
    this.inventoryService.getReceiptTemplate(this.receiptType, this.assignment_id).subscribe({
      next: (htmlTemplate: string) => {
        if (htmlTemplate) {
          // Open a new window or tab
          const printWindow = window.open('', '_blank', 'width=800,height=600');
          if (printWindow) {
            // Write the HTML template to the new window
            printWindow.document.open();
            printWindow.document.write(htmlTemplate);
            printWindow.document.close();
            // Focus and trigger the print
            printWindow.focus();
            printWindow.print();
            this.barcodeInput.nativeElement.focus();
          }
        } else {
          alert('Error: Could not retrieve receipt template.');
        }
      },
      error: (error) => {
        this.errorMessage = error.message;
      }
    });
  }


}