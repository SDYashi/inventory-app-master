import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { InventoryService } from '../services/inventory.service';
import { AssetParticular, Equipment, ScrapSurveyForm } from '../data-type';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';


@Component({
  selector: 'app-inv-scrap-survey-reports',
  templateUrl: './inv-scrap-survey-reports.component.html',
  styleUrls: ['./inv-scrap-survey-reports.component.css']
})
export class InvScrapSurveyReportsComponent implements OnInit {

  constructor(private cd: ChangeDetectorRef, private InventoryService: InventoryService) { }
  response_msg: string = '';
  doplimit: number = 0;
  isSuccess: boolean | undefined;
  status: string = 'AVAILABLE';
  assetParticulars_response: AssetParticular[] = [];
  ScrapReport_Response: any[] = [];
  ScrapReport_Response_Flag = false;
  equipment_scrap: Equipment[] = [];
  equipment_scrap_listids: any[] = [];
  totalCount: number = 0;
  pageNumber: number = 1;
  pageSize: number = 10000;
  totalPages: number = 0;
  search: string = '';
  categories: string[] = [];
  subcategories: string[] = [];
  category: string = '';
  subcategory: string = '';
  searchInput: string = '';
  Scrap_Report_Form_SelectList = true;
  Scrap_Report_Form_Submit = false;
  ScrapReport_Response_Flag_FormPDF = false;
  error_value_search = false;
  error_value_search_validate = false;
  survey_no = "";
  scrapSurveyForm: ScrapSurveyForm = {
    article_description: "",
    article_type: "",
    quantity: "",
    item_unit_cost: "",
    item_total_cost: "",
    receipt_date: "",
    article_condition: "",
    cause_explanation_by_oic: "",
    order_number: "",
    remark: "",
    total_value: "",
    depreciation_percent: "",
    salvage_percent: "",
    salvage_value: "",
    article_age: "",
    depreciated_value: "",
    current_value: "",
    sanctioned_order_no: "",
    sanctioned_order_date: "",
    sanctioned_by: "",
    equipment_ids: [],
  };

  ngOnInit() {
    this.InventoryService.getCategoryLov().subscribe({
      next: (result: any) => {
        this.categories = result.category_list;
        console.warn("category lov: ", this.categories);
      },
      error: (error) => {
        this.response_msg = error.message;
      }
    });
    // this.years = this.generateLastYears();
    this.get_itequipmenttype_TS();

  }
  onAssetParticularChange(event: any) {
    const selectedAssetParticular = this.assetParticulars_response.find(
      (assetParticular) => assetParticular.asset_particulars === event
    );
    if (selectedAssetParticular) {
      this.scrapSurveyForm.salvage_percent = parseFloat(selectedAssetParticular.salvage_value).toFixed(0);
      this.scrapSurveyForm.depreciation_percent = parseFloat(selectedAssetParticular.depreciation_rate).toFixed(0);
      const Total_Depreciation = (((parseInt(this.scrapSurveyForm.total_value) * parseFloat(selectedAssetParticular.depreciation_rate))) / 100) * (parseInt(this.scrapSurveyForm.article_age))
      if (Total_Depreciation <= (parseInt(this.scrapSurveyForm.total_value))) {
        this.scrapSurveyForm.depreciated_value = String(Total_Depreciation);
      }
      else {
        this.scrapSurveyForm.depreciated_value = String((parseInt(this.scrapSurveyForm.total_value)));
      }
      //  this.scrapSurveyForm.salvage_percent = String((((this.equipment_scrap[0].price) * (this.equipment_scrap.length))) / 10);
      this.scrapSurveyForm.current_value = String((parseInt(this.scrapSurveyForm.total_value)) - (parseInt(this.scrapSurveyForm.depreciated_value)) + parseInt(this.scrapSurveyForm.salvage_value))

    }
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
  getSubcategoryLov(category: string) {
    this.InventoryService.getSubCategoryLov(category).subscribe({
      next: (result: any) => {
        this.subcategories = result.subcategory_list
        console.warn("subcategory lov: ", this.subcategories);
      },
      error: (error) => {
        this.response_msg = error.message;
      }
    });
  }
  get_itequipmenttype_TS() {
    this.InventoryService.invDeviecs_surveyreport_itequipmenttype().subscribe({
      next: succcess => {
        this.assetParticulars_response = succcess;
      },
      error: errors => {
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
    if (!this.searchInput) {
      alert('Please Enter Equipment Serial Numbers here');
      return;
    }

    serialNumbers.forEach((serialNumber) => {
      this.InventoryService.invDeviecs_ViewEquipmentList_ScrapReport(this.pageNumber, this.pageSize, serialNumber, this.category, this.subcategory, this.status)
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
    if (this.error_value_search) {
      this.error_value_search_validate = true;
    }
    else {
      this.error_value_search_validate = false;
    }
  }
  onValidateClick() {
    const currentDate = new Date();
    this.Scrap_Report_Form_Submit = true;
    this.Scrap_Report_Form_SelectList = false;
    if (Array.isArray(this.equipment_scrap)) {
      if (this.equipment_scrap && this.equipment_scrap.length > 0 && this.equipment_scrap[0].order) {
        this.scrapSurveyForm.article_description = String((this.equipment_scrap[0].make) + " / " + (this.equipment_scrap[0].sub_category) + " / " + (this.equipment_scrap[0].model));
        this.scrapSurveyForm.quantity = String(this.equipment_scrap.length);
        this.scrapSurveyForm.item_unit_cost = String(this.equipment_scrap[0].price);
        this.scrapSurveyForm.item_total_cost = String((this.equipment_scrap[0].price) * (this.equipment_scrap.length));
        const receiptDate = new Date(this.equipment_scrap[0].receipt_date);
        const day = String(receiptDate.getDate()).padStart(2, '0');
        const month = String(receiptDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = receiptDate.getFullYear();
        this.scrapSurveyForm.receipt_date = `${year}-${month}-${day}`;
        // this.scrapSurveyForm.order_number = String((this.equipment_scrap[0].order.po_number) + "Dated:" + (this.equipment_scrap[0].order.purchase_date));
        this.scrapSurveyForm.order_number = String((this.equipment_scrap[0].order.order_number));
        this.scrapSurveyForm.salvage_value = String((((this.equipment_scrap[0].price) * (this.equipment_scrap.length))) / 10)
        this.scrapSurveyForm.total_value = String(((this.equipment_scrap[0].price) * (this.equipment_scrap.length)) - ((((this.equipment_scrap[0].price) * (this.equipment_scrap.length))) / 10))
        this.doplimit = parseInt(this.scrapSurveyForm.total_value);
        const receiptDate1 = new Date(this.equipment_scrap[0].receipt_date);
        const usefulLifeInYears = currentDate.getFullYear() - receiptDate1.getFullYear();
        this.scrapSurveyForm.article_age = String(usefulLifeInYears);
        alert("Items Validated Successfully")
      } else {
        console.error('Equipment data is undefined or empty');
      }
    }

    const ids = this.equipment_scrap.map(equipment => equipment.id);
    this.scrapSurveyForm.equipment_ids = ids;

  }
  AddScrapSurvey_Reports_TS() {
    this.InventoryService.AddScrapSurvey_Reports(this.scrapSurveyForm).subscribe({
      next: response => {
        this.Scrap_Report_Form_Submit = false;
        this.Scrap_Report_Form_SelectList = false;
        this.ScrapReport_Response_Flag_FormPDF = true;
        this.isSuccess = true;
        this.response_msg = response.message + ":-" + response.survey_no;
        this.survey_no = response.survey_no;
        this.ScrapReport_Response = response.data.equipment;
        this.ScrapReport_Response_Flag = true;
        this.error_value_search_validate = false;

        alert("Survey Report Validated Successfully...");

      },
      error: error => {
        this.isSuccess = false;
        this.response_msg = error;
      }
    });
  }

  generatePdf() {
    const doc = new jsPDF();
    const divToPrint = document.getElementById('ScrapReport_Response_Flag_FormPDF_Table');

    if (divToPrint) {
      const html = divToPrint.outerHTML;
      const options = { pagesplit: true };

      doc.html(html, {
        callback: (doc) => {
          const pdf = doc.output('blob');
          const url = window.URL.createObjectURL(pdf);
          const a = document.createElement('a');
          a.href = url;
          a.download = `SurveyReport${this.survey_no}.pdf`;
          a.click();
          window.URL.revokeObjectURL(url);
        },
        x: 15,
        y: 15,
      });
    } else {
      console.error('Failed to find element with id "ScrapReport_Response_Flag_FormPDF"');
    }
  }
  // printDiv() {
  //   window.print();
  // }

  printDiv() {
    const divToPrint = document.getElementById('printableDiv');
    if (divToPrint) {
      // Create a new window
      const printWindow = window.open('', '', 'width=800,height=600');
      if (printWindow) {
        // Add styles to the new window (optional)
        printWindow.document.write(`
          <html>
            <head>
              <title>Print Survey Report</title>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  margin: 0;
                  padding: 20px;
                }
                .container-fluid {
                  padding: 20px;
                  border: 1px solid #000;
                  background-color: #f9f9f9;
                } 
                  /* General Table Styling */
                  table {
                      width: 100%;
                      border-collapse: collapse;
                      font-family: Arial, sans-serif;
                      margin-top: 20px;
                  }

                  /* Header Styling */
                  th {
                      background-color: #f2f2f2;
                      text-align: center;
                      padding: 12px;
                      border: 1px solid #ddd;
                      font-weight: bold;
                  }

                  /* Table Body Styling */
                  td {
                      padding: 12px;
                      text-align: left;
                      border: 1px solid #ddd;
                      vertical-align: top;
                  }

                  /* For Specific Cell Styling */
                  td[colspan] {
                      text-align: left;
                  }

                  /* Responsive Font Sizes */
                  @media screen and (max-width: 768px) {
                      table, th, td {
                          font-size: 12px;
                      }
                  }

                  /* Specific Row Highlighting */
                  tr:nth-child(even) {
                      background-color: #f9f9f9;
                  }

                  tr:nth-child(odd) {
                      background-color: #fff;
                  }

                  /* Bold the Total Row */
                  td.total {
                      font-weight: bold;
                       text-align: left;
                  }

                  /* Signature Section Styling */
                  .signature-section {
                      margin-top: 40px;
                      text-align: left;
                      font-weight: bold;
                      font-size: 1rem;
                  }

                  .signature-section p {
                      margin: 10px 0;
                  }

              </style>
            </head>
            <body>
              ${divToPrint.innerHTML}
            </body>
          </html>
        `);
        printWindow.document.close(); // Close the document to apply styles
        printWindow.focus(); // Focus on the new window
        printWindow.print(); // Trigger the print
        printWindow.close(); // Close the window after printing
      }
    }
  }

}


