import { Component } from '@angular/core';
import { InventoryService } from '../services/inventory.service';

@Component({
  selector: 'app-inv-scrap-return-to-store',
  templateUrl: './inv-scrap-return-to-store.component.html',
  styleUrls: ['./inv-scrap-return-to-store.component.css']
})
export class InvScrapReturnToStoreComponent {
  equipment: any;
  equipment_response: any;
  response_msg: string = '';
  isSuccess: boolean | undefined;
  error_value_search_validate = false;
  filteredEquipment: any[] = [];
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
    const selectedSurveyNo = event.target.value;
    this.filteredEquipment = this.equipment.filter((item: { survey_no: any; }) => item.survey_no === selectedSurveyNo);
    this.error_value_search_validate = true;
  }
  onSubmitChangeData(){
   this.inventoryService.invDeviecs_Returntostore_scrapitem(this.ReturntoStorForm).subscribe({
    next:success=>{   
      this.isSuccess=true;
      this.response_msg=success.message; 
      this.equipment_response = success.data;
    },
    error:error=>{
      this.isSuccess=false;
      this.response_msg=error.message;
    }
   });

  }
}
