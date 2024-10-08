
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InventoryService } from '../services/inventory.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-inventory2',
  templateUrl: './edit-inventory2.component.html',
  styleUrls: ['./edit-inventory2.component.css'],
  providers: [DatePipe]
})

export class EditInventory2Component implements OnInit {
  issueFormStatus=false;
  inventoryId: number = 0;
  serialNumber: string = '';
  errorMessage: string = '';
  editInventoryForm: FormGroup;
  searchForm: FormGroup;
  categories:string[]=[];
  subcategories: string[] = [];
  itemCondition: string[] = [];
  statusLov: string[] = [];
  @ViewChild('barcodeInput') barcodeInput!: ElementRef;
  constructor(
    private fb: FormBuilder,
    private inventoryService: InventoryService,
    private route: Router,
    private datePipe: DatePipe
  ) {
    this.searchForm = this.fb.group({ serialNumber: ['', Validators.required], })

    this.editInventoryForm = this.fb.group({
      category: ['', Validators.required],
      sub_category: [''],
      make: ['', Validators.required],
      model: ['', Validators.required],
      order_id: ['', Validators.required],
      receipt_date: ['', Validators.required],
      warranty_expiration: ['', Validators.required],
      status: ['', Validators.required],
      serial_number: ['', Validators.required],
      condition: [''],
      price: [''],
      notes: ['']

    });
  }

  ngOnInit(): void {
    this.getLov();
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
    /*
    this.inventoryService.getStatusLov().subscribe({
      next: (result: any) => {
        if (result) {
          this.statusLov = result.status_list;
          console.warn("status lov=", this.statusLov);
        }
      },
      error: (error) => {
        this.errorMessage = error.message;
      }
    });
   
    this.inventoryService.getCategoryLov().subscribe({
      next: (result:any) => {
        this.categories=result.category_list;        
        console.warn("category lov: ",this.categories);      
      },
      error: (error) => {
        this.errorMessage=error.message;
       }     
    }); */

  }
 
    searchInventory(): void {
      const serialNumber = this.searchForm.value.serialNumber;
      if (serialNumber.trim()){
        this.inventoryService.getInventoryBySerialNumber(serialNumber).subscribe({
          next: (result: any) => {
            if (result) {
              this.issueFormStatus=true;
             // this.editForm = true
              console.warn("search result =", result);
              this.inventoryId = result[0].id;
              this.editInventoryForm.patchValue(result[0]);
              // Patch category and trigger onCategoryChange
             // this.editInventoryForm.controls['category'].patchValue(result[0].category);
             
             /* const simulatedEvent = { target: { value: result[0].category } } as unknown as Event;
              this.onCategoryChange(simulatedEvent);
              // Patch sub_category only after subcategories are updated
              setTimeout(() => {
                this.editInventoryForm.controls['sub_category'].patchValue(result[0].sub_category);
              }, 50); */
    
    
              // Handle receipt_date and warranty_expiration patching (extract only the date)
              const warranty_expiration = result[0].warranty_expiration.split('T')[0]; // Extract 'yyyy-MM-dd'
              const receipt_date = this.datePipe.transform(result[0].receipt_date, 'yyyy-MM-dd')
    
              // Patch the date values into the form controls
              this.editInventoryForm.controls['receipt_date'].patchValue(receipt_date);
              this.editInventoryForm.controls['warranty_expiration'].patchValue(warranty_expiration);
              this.errorMessage = '';
            } else {
              this.errorMessage = 'No inventory item found with this serial number.';
            }
          },
          error: (error) => {
           // this.errorMessage = error.message;
            alert(error.message);
          }
        });
       }else {
        this.errorMessage = 'Please enter a valid serial number.';
      }
   // Reset the form after searching and focus back on the input field
   this.searchForm.reset();
   this.barcodeInput.nativeElement.focus();
    }
    /*
  getSubcategoryLov(category:string){
    this.inventoryService.getSubCategoryLov(category).subscribe({
      next: (result: any) => {
        this.subcategories=result.subcategory_list
        console.warn("subcategory lov: ",this.subcategories);
      },
      error: (error) => {
        this.errorMessage=error.message;
       }     
    });
  } 
  onCategoryChange(event: Event) {
    const selectedCategory = (event.target as HTMLSelectElement).value;
    if (selectedCategory) {
      this.getSubcategoryLov(selectedCategory);
      this.editInventoryForm.get('subcategory')?.reset();  // Reset the subcategory form control when category changes
    } else {
      this.subcategories = [];
    }
  }
*/
  /*
      this.inventoryService.getOrderList().subscribe({
        next: (result: Order[]) => {
         this.orderList = result; // Assign API response to the class property
          this.poNumberList = this.orderList.map(order => order.po_number);
        },
        error: (error) => {
          this.errorMessage=error.message;
         }     
      }); */

  onSubmit(): void {
    if (this.editInventoryForm.valid) {
      this.inventoryService.updateInventory(this.inventoryId, this.editInventoryForm.value).subscribe({
        next: (result: any) => {
          if (result.status === 'success') {
            alert('Inventory item successfully updated.');
            this.barcodeInput.nativeElement.focus();
            this.editInventoryForm.reset();
            this.issueFormStatus=false;

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
    this.searchForm.reset();
    this.editInventoryForm.reset();
    this.barcodeInput.nativeElement.focus();
  }


}