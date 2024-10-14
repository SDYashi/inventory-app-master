
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InventoryService } from '../services/inventory.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-issue-inventory-edit',
  templateUrl: './issue-inventory-edit.component.html',
  styleUrls: ['./issue-inventory-edit.component.css']
})



export class IssueInventoryEditComponent implements OnInit {
  recieveFormStatus = false;
  selectedFile: File | null = null;
  input:HTMLInputElement | undefined;
  searchForm: FormGroup;
  assignment_id!: number;
  assignmentCondition: string[] = [];
  issueInventoryEditForm!: FormGroup;
  errorMessage!: string;
  assignedTypes = ['Employee', 'Location', 'Other'];
  itemCondition: string[] = [];
  printReceipt: boolean = false;
  @ViewChild('barcodeInput') barcodeInput!: ElementRef;
  constructor(
    private fb: FormBuilder,
    private inventoryService: InventoryService, private datePipe: DatePipe,
  ) { this.searchForm = this.fb.group({ serialNumber: ['', Validators.required], }) }

  ngOnInit(): void {
    this.getLov();
    this.issueInventoryEditForm = this.fb.group({
      id: [''],
      warranty_expiration: [''],
      status: [''],
      serial_number: [''],
      notes: [''],
      assigned_type: [''],
      assigned_to: [''],
      assigned_date: [''],
      assigned_to_details: [''],
      assigned_condition: [''],
      issue_remark: [''],
      issue_person_name: ['', Validators.required],
      issue_person_code: ['', Validators.required],
      category_subCategory: [''],
      make_model: ['']

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
    this.input = event.target as HTMLInputElement;  // Cast to HTMLInputElement

    if (this.input?.files && this.input.files.length > 0) {   // Check if files exist
      const file: File = this.input.files[0];
      if (file.size <= 1 * 1024 * 1024) { // Check if file size is less than 10 MB
        this.selectedFile = file;
      } else {
        alert('File size exceeds 10 MB. Please select a smaller file.');
        this.input.value = '';
        return;
      }
      // Check file type
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        alert('Invalid file type. Please select a PDF or image file.');
        this.input.value = '';
        return; // Exit if file type is not allowed
      }
    }
  }

  searchInventory() {
    
    const serialNumber = this.searchForm.value.serialNumber;
    this.resetForm();
    this.issueInventoryEditForm.reset();
    if (serialNumber.trim()) {
      this.printReceipt = false
      this.resetForm();
      this.inventoryService.getInventoryBySerialNumber(serialNumber).subscribe({
        next: (result: any) => {
          if (result) {
            this.assignment_id = result[0].assignment_id;
            if (this.assignment_id == null) {
              alert("This item has not been issued. You cannot receive it.");
              return;
            } else {
              this.searchForm.reset();
              this.inventoryService.getInventoryAssignmentDetail(this.assignment_id).subscribe({
                next: (res: any) => {
                  if (res) {
                    this.recieveFormStatus = true;
                    this.issueInventoryEditForm.patchValue(res[0]);
                    this.issueInventoryEditForm.patchValue({ issue_remark: res[0].notes });
                    this.issueInventoryEditForm.controls['assigned_date'].patchValue(this.datePipe.transform(res[0].assigned_date, 'dd-MM-yyyy'));
                    } else {
                    this.errorMessage = 'No assignment detail found with this assignment_id=' + this.assignment_id;
                  }
                },
                error: (error) => {
                  console.error('Error fetching assignment detail :', error);
                  this.errorMessage = 'An error occurred while searching for the assignment detail.';
                }
              });
            }
            this.issueInventoryEditForm.patchValue(result[0]);
            this.issueInventoryEditForm.controls['warranty_expiration'].patchValue(this.datePipe.transform(result[0].warranty_expiration, 'dd-MM-yyyy'));
            this.issueInventoryEditForm.controls['category_subCategory'].patchValue(result[0].category + "  |  " + result[0].sub_category);
            this.issueInventoryEditForm.controls['make_model'].patchValue(result[0].make + "  |  " + result[0].model);
            this.errorMessage = '';
          } else {
            this.errorMessage = 'No inventory item found with this serial number.';
          }
        },
        error: (error) => {
          this.errorMessage = error.message;
        }
      });
    }
    else {
      this.errorMessage = 'Please enter a valid serial number.';
    }
    // Reset the form after searching and focus back on the input field
    this.searchForm.reset();
    this.barcodeInput.nativeElement.focus();
  }

  onSubmit() {
    const formData: FormData = new FormData();
    if (this.issueInventoryEditForm.valid) {
      // Append form values to FormData      
      formData.append('notes', this.issueInventoryEditForm.value.issue_remark);
      formData.append('issue_person_name', this.issueInventoryEditForm.value.issue_person_name);
      formData.append('issue_person_code', this.issueInventoryEditForm.value.issue_person_code);

      // Append file if selected
      if (this.selectedFile) {
        formData.append('file', this.selectedFile);
      }

      this.inventoryService.issueInventoryEdit(this.assignment_id, formData).subscribe({
        next:(result: any) =>{
          if (result.status === 'success') {
            this.printReceipt = true;
            this.barcodeInput.nativeElement.focus();
            alert(result.message);
          }
        },
        error: (error) => {
          this.errorMessage = error.message;
          alert(error.message);
        }
      });
    }

  }

  resetForm(): void {
    this.issueInventoryEditForm.reset(); // Reset the form
    this.assignment_id = 0; // Clear the assignment_id
    this.errorMessage = ''; // Optionally clear any error message
    this.printReceipt = false;
    this.searchForm.reset();
    this.barcodeInput.nativeElement.focus();
    if(this.input){
    this.input.value = '';}
  }

  onPrintReceipt() {
    this.inventoryService.getReceiptTemplate('issue', this.assignment_id).subscribe({
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