import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { InventoryService } from '../services/inventory.service';

@Component({
  selector: 'app-inv-dashboard',
  templateUrl: './inv-dashboard.component.html',
  styleUrls: ['./inv-dashboard.component.css']
})
export class InvDashboardComponent {
  
  totalEquipmentCount: number | null = null;
  categorySummary: any[] | null = null;
  statusSummary: any[] | null = null;
  available_summary: any[] | null = null;
  conditionSummary: any[] | null = null;
  assignedCount: number | null = null;
  availableCount: number | null = null;
  topAssignees: any[] | null = null;
  recentAssignments: any[] | null = null;
  warrantyStatusSummary: any | null = null;
  upcomingWarrantyExpirations: any[] | null = null;
  sessionuser: any = '';
Object: any;

  constructor(private http: HttpClient, private inventoryservice:InventoryService) { }

  ngOnInit(): void {  this.fetchDataFromApis(); 
    this.sessionuser=sessionStorage.getItem('username');
   }
   categoryCount: { [category: string]: number } = {};
  fetchDataFromApis(): void {
    this.inventoryservice.getequipmentoverview_dashboard().subscribe((response: any) => {
      this.totalEquipmentCount = response.data.total_equipment_count;
      this.categorySummary = response.data.category_summary;

    //  alert(this.categorySummary) 
      this.statusSummary = response.data.status_summary;
      this.available_summary=response.data.available_summary;

      
    });

  
    this.inventoryservice.getcondition_summary_dashboard().subscribe((response: any) => {
      this.conditionSummary = response.data.condition_summary;
    });

    this.inventoryservice.get_assignment_overview_dashboard().subscribe((response: any) => {
      this.assignedCount = response.data.assigned_count;
      this.availableCount = response.data.available_count;
      this.topAssignees = response.data.top_assignees;
      this.recentAssignments = response.data.recent_assignments;
    }); 

    this.inventoryservice.get_purchase_and_warranty_summary_dashboard().subscribe((response: any) => {
      this.warrantyStatusSummary = response.data.warranty_status_summary;
      this.upcomingWarrantyExpirations = response.data.upcoming_warranty_expirations;
    });

    
  }
  
  
}
