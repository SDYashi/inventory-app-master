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
  conditionSummary: any[] | null = null;
  assignedCount: number | null = null;
  availableCount: number | null = null;
  topAssignees: any[] | null = null;
  recentAssignments: string[] | null = null;
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
      this.statusSummary = response.data.status_summary;
      
    });

    // this.categoryCount = this.categorySummary?.reduce((acc, current) => {
    //   if (acc[current.category]) {
    //     acc[current.category] += current.count;
    //   } else {
    //     acc[current.category] = current.count;
    //   }
    //   return acc;
    // }, {});

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