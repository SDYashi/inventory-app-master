import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { InventoryService } from '../services/inventory.service';
import { AssetParticular, Equipment } from '../data-type';

@Component({
  selector: 'app-inv-scrap-survey-reports',
  templateUrl: './inv-scrap-survey-reports.component.html',
  styleUrls: ['./inv-scrap-survey-reports.component.css']
})
export class InvScrapSurveyReportsComponent implements OnInit {
  years: number[] = [];
  status:string='AVAILABLE';
  list_of_make:String[]=['HP','Dell','Cisco'];
  list_of_product:String[]=['Computer','Laptops','Printers'];
  assetParticulars_response: AssetParticular[] = [];
  equipment_scrap: Equipment[] = [];
  totalCount: number = 0;
  pageNumber: number = 1;
  pageSize: number = 100;
  totalPages: number = 0;
  search: string = '';
  response_msg: string = '';  
  categories:string[]=[];
  subcategories: string[]=[];
  category: string='';
  subcategory: string='';
  searchInput: string='';
  showScrapReportItemSerialNoList = true;
  error_value_search=false;
  error_value_search_validate=false;
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
    this.InventoryService.getCategoryLov().subscribe({
      next: (result:any) => {
        this.categories=result.category_list;        
        console.warn("category lov: ",this.categories);      
      },
      error: (error) => {
        this.response_msg=error.message;
       }     
    }); 
     // this.years = this.generateLastYears();
    this.get_itequipmenttype_TS();  

  } 
  onCategoryChange(event: Event) {
    const selectedCategory = (event.target as HTMLSelectElement).value;
     if (selectedCategory) {
      this.getSubcategoryLov(selectedCategory);
      // this.inventoryForm.get('subcategory')?.reset();  // Reset the subcategory form control when category changes
    } else {
      this.subcategories = [];
    }
    
  } 
  getSubcategoryLov(category:string){
    this.InventoryService.getSubCategoryLov(category).subscribe({
      next: (result: any) => {
        this.subcategories=result.subcategory_list
        console.warn("subcategory lov: ",this.subcategories);
      },
      error: (error) => {
        this.response_msg=error.message;
       }     
    });
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
  onFilterChange() {
    let searchInput = this.searchInput.trim();
    let serialNumbers = searchInput.replace(/\s+/g, ',').split(',');
    let equipmentArray: Equipment[] = [];
    let allRecordsFound = true; 
    
    if (!this.category || !this.subcategory) {
      alert('Please select a category and subcategory');
      return;
    }
  
    serialNumbers.forEach((serialNumber) => {
      this.InventoryService.invDeviecs_ViewEquipmentList_ScrapReport(this.pageNumber, this.pageSize, serialNumber, this.category, this.subcategory,this.status)
        .subscribe((response: { results: Equipment[]; total_count: number; page_number: number; page_size: number; total_pages: number; }) => {
          if (response.results && response.results.length > 0) {
            equipmentArray.push(...response.results);           
          } else {
            alert('No results found for serial number: ' + serialNumber);
            allRecordsFound = false;
          }
        });
    });  
    this.equipment_scrap = equipmentArray;   
    this.error_value_search = allRecordsFound; 
    if(this.error_value_search){
         this.error_value_search_validate=true;
    } 
    else{
      this.error_value_search_validate=false;
    }   
  }  
  onValidateClick() {
    this.showScrapReportItemSerialNoList = false;
  }



}
