import { Component } from '@angular/core';
import { InventoryService } from '../services/inventory.service';

@Component({
  selector: 'app-inv-scrap-return-to-store',
  templateUrl: './inv-scrap-return-to-store.component.html',
  styleUrls: ['./inv-scrap-return-to-store.component.css']
})
export class InvScrapReturnToStoreComponent {
  equipment: any;
  error_value_search_validate = false;
  filteredEquipment: any[] = [];
  ReturntoStorForm:any={
    quantity:"",
    category:"",
  }
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
  onAssetParticularChange(event: any) {
    const selectedSurveyNo = event.target.value;
    const filteredEquipment = this.equipment.filter((item: { survey_no: any; }) => item.survey_no === selectedSurveyNo);
    this.error_value_search_validate = true;
    this.filteredEquipment = filteredEquipment;
  }
  onSubmitChangeData(){


  }
}
