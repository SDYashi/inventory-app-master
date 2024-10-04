import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { InventoryService } from '../services/inventory.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';


@Component({
  selector: 'app-assignment-history',
  templateUrl: './assignment-history.component.html',
  styleUrls: ['./assignment-history.component.css']
})
export class AssignmentHistoryComponent implements OnInit {
  isSuccess: boolean | undefined;
  assignment_historyflag = false;
  assignmentHistory: any[] = [];
  errorMessage: string | null = null; // Variable to store the error message
  searchForm: FormGroup;
  @ViewChild('barcodeInput') barcodeInput!: ElementRef;
  constructor(private inventoryService: InventoryService, private fb: FormBuilder, private dialog: MatDialog) {
    this.searchForm = this.fb.group({ serialNumber: ['', Validators.required], })
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    // Automatically focus the input field when the component is initialized
    this.barcodeInput.nativeElement.focus();
  }

  getAssignmentHistory() {
    this.assignment_historyflag = false;
    this.assignmentHistory = [];

    const serialNumber = this.searchForm.value.serialNumber;
    if (serialNumber.trim()) {
      this.inventoryService.getAssignmentHistory(serialNumber).subscribe({
        next: (result) => {
          this.assignment_historyflag = true
          this.assignmentHistory = result;
          console.log('Inventory item fetched successfully:', result);
          this.isSuccess = true
          this.errorMessage = "Inventory item fetched successfully"; // Clear any previous error
          this.barcodeInput.nativeElement.focus();
        },
        error: (error) => {
          // Display error message returned by the centralized error handling service in inventory service
          this.errorMessage = error.message;
          this.isSuccess = false
        }
      });
    } else {
      this.errorMessage = 'Please enter a valid serial number.';
    }
    // Reset the form after searching and focus back on the input field
    this.searchForm.reset();
    this.barcodeInput.nativeElement.focus();
  }

  // Method to fetch and display the letter (image/pdf) in a popup
  viewLetter(fileUrl: string): void {
    this.inventoryService.getImageApi(fileUrl).subscribe({
      next: (fileBlob: Blob) => {
        const fileType = fileBlob.type;

        // Check if the file is an image
        if (fileType.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = () => {
            const imageUrl = reader.result as string;
            this.openDialog(imageUrl, 'image');  // Display the image in a dialog
          };
          reader.readAsDataURL(fileBlob);
        }
        // Check if the file is a PDF
        else if (fileType === 'application/pdf') {
          const pdfUrl = URL.createObjectURL(fileBlob);
          this.openDialog(pdfUrl, 'pdf');  // Display the PDF in a dialog
        } else {
          console.error('Unsupported file type:', fileType);
        }
      },
      error: (error) => {
        console.error('Error fetching the file:', error);
      }
    });
  }
  openDialog(fileUrl: string, fileType: string): void {
    const dialogConfig = {
      data: { fileUrl, fileType },
      width: fileType === 'pdf' ? '90vw' : 'auto',  // Adjust width for PDF
      height: fileType === 'pdf' ? '90vh' : 'auto',  // Adjust height for PDF
      maxWidth: '90vw',       // Set maximum width to 90% of the viewport width for both types
      maxHeight: '90vh',      // Set maximum height to 90% of the viewport height for both types
      panelClass: 'custom-dialog-container'
    };

    const dialogRef = this.dialog.open(ImageDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
