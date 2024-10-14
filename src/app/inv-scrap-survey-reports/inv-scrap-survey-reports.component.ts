import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { InventoryService } from '../services/inventory.service';
import { AssetParticular } from '../data-type';

@Component({
  selector: 'app-inv-scrap-survey-reports',
  templateUrl: './inv-scrap-survey-reports.component.html',
  styleUrls: ['./inv-scrap-survey-reports.component.css']
})
export class InvScrapSurveyReportsComponent implements OnInit {
  years: number[] = [];
  list_of_make:String[]=['HP','Dell','Cisco'];
  list_of_product:String[]=['Computer','Laptops','Printers'];
  assetParticulars_response: AssetParticular[] = [];
  scrapSurveyForm = {
    selectedAssetParticulars: "IP Phone",
    no_of_quantity: "10",
    estimate_cost_items: "15070.71",
    Total_estimate_cost_items: "15070.71",
    selectedYear: "2011",
    serviceStatus: "Serviceable",
    description: "Installed under RAPDRP Scheme and used for dedicated MPLS network. Now dedicated network available and these IP phones are not in use.",
    po_numbers_date: "201",
    survey_report_remark: "Hence article's become proposed for survey off.",
    total_amount_sum: "15070.71",
    total_amount_sum1: "",
    total_amount_sum2: "",
    total_amount_sum3: "",
    depreciation_rate: "10%",
    depreciation_rate1: "",
    depreciation_rate2: "",
    depreciation_rate3: "",
    salvage_value: "",
    salvage_value1: "",
    salvage_value2: "",
    salvage_value3: "",
    useful_life: "",
    useful_life1: "",
    useful_life2: "",
    useful_life3: "",
    total_depreciation: "13563.13",
    total_depreciation1: "",
    total_depreciation2: "",
    total_depreciation3: "",
    add_10perc_depreciation_value: "1507.00",
    add_10perc_depreciation_value1: "",
    add_10perc_depreciation_value2: "",
    add_10perc_depreciation_value3: "",
    current_value_after: "1507.00",
    current_value_after1: "",
    current_value_after2: "",
    current_value_after3: "",
    scrap_equipment_make: "CISCO",
    scrap_equipment_product: "7942",
    total_cost_scap: "1507.00",
    survey_report_sanctionorderno: "05",
    survey_report_sanction_date: "05/08/2024",
    final_sancation_amounts_scap: "1507.00",
};

  constructor(private cd: ChangeDetectorRef,private InventoryService:InventoryService){}

  ngOnInit() {
    this.years = this.generateLastYears();
    this.get_itequipmenttype_TS();    
  this.resetFormValues();  // Initialize form values to default

  }  
  onAssetParticularsChange() {
    const selectedAssetParticular = this.assetParticulars_response.find(asset => asset.asset_particulars === this.scrapSurveyForm.selectedAssetParticulars);
    if (selectedAssetParticular) {
      this.scrapSurveyForm.depreciation_rate = selectedAssetParticular.depreciation_rate;
      this.scrapSurveyForm.salvage_value = selectedAssetParticular.salvage_value;
      this.scrapSurveyForm.useful_life = selectedAssetParticular.useful_life.toString();
      this.scrapSurveyForm.no_of_quantity = '0';
      this.scrapSurveyForm.estimate_cost_items = '0';
      this.scrapSurveyForm.Total_estimate_cost_items = '0';
      this.scrapSurveyForm.total_amount_sum = '0';
      this.scrapSurveyForm.total_amount_sum1 = '0';
      this.scrapSurveyForm.total_amount_sum2 = '0';
      this.scrapSurveyForm.total_amount_sum3 = '0';
      this.scrapSurveyForm.depreciation_rate1 = '0';
      this.scrapSurveyForm.depreciation_rate2 = '0';
      this.scrapSurveyForm.depreciation_rate3 = '0';
      this.scrapSurveyForm.salvage_value1 = '0';
      this.scrapSurveyForm.salvage_value2 = '0';
      this.scrapSurveyForm.salvage_value3 = '0';
      this.scrapSurveyForm.useful_life1 = '0';
      this.scrapSurveyForm.useful_life2 = '0';
      this.scrapSurveyForm.useful_life3 = '0';
      this.scrapSurveyForm.total_depreciation = '0';
      this.scrapSurveyForm.total_depreciation1 = '0';
      this.scrapSurveyForm.total_depreciation2 = '0';
      this.scrapSurveyForm.total_depreciation3 = '0';
      this.scrapSurveyForm.add_10perc_depreciation_value = '0';
      this.scrapSurveyForm.add_10perc_depreciation_value1 = '0';
      this.scrapSurveyForm.add_10perc_depreciation_value2 = '0';
      this.scrapSurveyForm.add_10perc_depreciation_value3 = '0';
      this.scrapSurveyForm.current_value_after = '0';
      this.scrapSurveyForm.current_value_after1 = '0';
      this.scrapSurveyForm.current_value_after2 = '0';
      this.scrapSurveyForm.current_value_after3 = '0';
      this.scrapSurveyForm.total_cost_scap = '0';
      this.scrapSurveyForm.final_sancation_amounts_scap = '0';
      this.cd.detectChanges(); // Trigger change detection
    }
  }
  resetFormValues() {
    this.scrapSurveyForm.no_of_quantity = '0';
    this.scrapSurveyForm.estimate_cost_items = '0';
    this.scrapSurveyForm.Total_estimate_cost_items = '0';
    this.scrapSurveyForm.total_amount_sum = '0';
    this.scrapSurveyForm.total_amount_sum1 = '0';
    this.scrapSurveyForm.total_amount_sum2 = '0';
    this.scrapSurveyForm.total_amount_sum3 = '0';
    this.scrapSurveyForm.depreciation_rate1 = '0';
    this.scrapSurveyForm.depreciation_rate2 = '0';
    this.scrapSurveyForm.depreciation_rate3 = '0';
    this.scrapSurveyForm.salvage_value1 = '0';
    this.scrapSurveyForm.salvage_value2 = '0';
    this.scrapSurveyForm.salvage_value3 = '0';
    this.scrapSurveyForm.useful_life1 = '0';
    this.scrapSurveyForm.useful_life2 = '0';
    this.scrapSurveyForm.useful_life3 = '0';
    this.scrapSurveyForm.total_depreciation = '0';
    this.scrapSurveyForm.total_depreciation1 = '0';
    this.scrapSurveyForm.total_depreciation2 = '0';
    this.scrapSurveyForm.total_depreciation3 = '0';
    this.scrapSurveyForm.add_10perc_depreciation_value = '0';
   this.scrapSurveyForm.add_10perc_depreciation_value1 = '0';
    this.scrapSurveyForm.add_10perc_depreciation_value2 = '0';
    this.scrapSurveyForm.add_10perc_depreciation_value3 = '0';
    this.scrapSurveyForm.current_value_after = '0';
    this.scrapSurveyForm.current_value_after1 = '0';
    this.scrapSurveyForm.current_value_after2 = '0';
    this.scrapSurveyForm.current_value_after3 = '0';
    this.scrapSurveyForm.total_cost_scap = '0';
    this.scrapSurveyForm.final_sancation_amounts_scap = '0';
    this.cd.detectChanges(); // Trigger change detection
  }
  generateLastYears(): number[] {
    const currentYear = new Date().getFullYear();
    const years: number[] = [];
    for (let i = 0; i < 50; i++) {
      years.push(currentYear - i);
    }
    return years;
  }
  get_itequipmenttype_TS(){
    this.InventoryService.invDeviecs_surveyreport_itequipmenttype().subscribe({
       next:succcess=>{
        this.assetParticulars_response=succcess;
      
       },
       error:errors=>{
        alert(errors);

       }
    });
  }
}
