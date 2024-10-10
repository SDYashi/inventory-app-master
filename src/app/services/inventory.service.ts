import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployeeRetirement, Equipment, inventoryItem, InventoryReport, issueInventory, Order } from '../data-type';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { API_BASE_URL } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private baseUrl = `${API_BASE_URL}`
  constructor(private http: HttpClient, private authService: AuthService) { }

  userLogin(data: { username: string; password: string }): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(this.baseUrl + '/user/login/', data, { headers });
  }

  submitInventory(itemList: inventoryItem[]): Observable<any> {
    // Prepare the request body
    // Get the access token (you should retrieve this from your authentication service)
    const accessToken = this.authService.getAccessToken(); // Replace with the actual access token
    // Prepare the headers
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    });
    // Make the HTTP POST request
    return this.http.post(this.baseUrl + '/equipment/create_equipment_list/', itemList, { headers }).pipe(catchError(this.handleError));
  }


  getInventoryBySerialNumber(serialNumber: string): Observable<any> {
    const accessToken = this.authService.getAccessToken(); // Replace with the actual access token

    // Prepare the headers
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    });
    return this.http.get(`${this.baseUrl}/equipment/get_equipment_list/?serial_number=${serialNumber}`, { headers }).pipe(catchError(this.handleError));
  }

  updateInventory(inventoryId: number, inventoryItem: inventoryItem): Observable<any> {
    const accessToken = this.authService.getAccessToken(); // Replace with the actual access token
    // Prepare the headers
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    });
    console.warn(`${this.baseUrl}/equipment/update_equipment/${inventoryId}/`);
    return this.http.put(`${this.baseUrl}/equipment/update_equipment/${inventoryId}/`, inventoryItem, { headers }).pipe(catchError(this.handleError));
  }

  getAssigneeDetails(assignedType: string, assigneeId: number):Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.baseUrl}/assignee/${assignedType}/${assigneeId}/`, { headers }).pipe(catchError(this.handleError));
  }

  getHeaders() {
    //get token from session storage
    const accessToken = this.authService.getAccessToken();
    // Prepare the headers
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${accessToken}` });
    return headers;
  }

  issueInventory(formData: FormData): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(`${this.baseUrl}/assignment/issue_equipment/`, formData, { headers }).pipe(catchError(this.handleError));
  }

  returnInventory(assigned_id: number, formData: FormData): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put(`${this.baseUrl}/assignment/receive_equipment/${assigned_id}/`, formData, { headers }).pipe(catchError(this.handleError));
  }
  getStatusLov():Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.baseUrl}/misc/status/`, { headers }).pipe(catchError(this.handleError));
  }
  getItemConditionLov():Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.baseUrl}/misc/condition/`, { headers }).pipe(catchError(this.handleError));
  }
  //to get the PO list for LOV 
  getOrderList():Observable<Order[]> {
    const headers = this.getHeaders();
    return this.http.get<Order[]>(`${this.baseUrl}/order/get_order_list/`, { headers }).pipe(catchError(this.handleError));
  }
  


  getInventoryAssignmentDetail(assignment_id: number): Observable<any> {
    const headers = this.getHeaders();
    console.log(`${this.baseUrl}/assignment/get_assignment_list/${assignment_id}`);
    return this.http.get(`${this.baseUrl}/assignment/get_assignment_list/${assignment_id}/`, { headers }).pipe(catchError(this.handleError));
   
  }


  getCategoryLov(): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<any[]>(`${this.baseUrl}/misc/category/`, { headers }).pipe(catchError(this.handleError));
  }
  getSubCategoryLov(category: string): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<any[]>(`${this.baseUrl}/misc/subcategory/${category}/`, { headers }).pipe(catchError(this.handleError));
  }

  // Centralized error handling method
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (error.status === 0) {
      // Network error
      errorMessage = 'Network/Server error : Please check your internet connection or Server availability';
    } else if (error.status >= 400 && error.status < 500) {
      // Client-side error
      if (error.error?.message) {
        errorMessage = `Client error: ${error.error.message}`;
      } else {
        errorMessage = 'Bad request: Please check the input values.';
      }
    } else if (error.status >= 500) {
      // Server-side error
      errorMessage = 'Server error: Something went wrong on the server. Please try again later.';
    } else {
      // Other unexpected errors
      errorMessage = 'An unexpected error occurred. Please try again.';
    }
    console.error('Error occurred:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
// Get receipt template
getReceiptTemplate(receiptType: string, assignment_id: number): Observable<string> {
  const headers = this.getHeaders();
  const url = receiptType==='receive'?`${this.baseUrl}/assignment/get_return_slip/${assignment_id}/`:`${this.baseUrl}/assignment/get_issue_slip/${assignment_id}/`;  
  return this.http.get(url, { headers, responseType: 'text' }).pipe(catchError(this.handleError));
}

// Get inventory report
getInventoryReport(): Observable<InventoryReport[]> {
  const headers = this.getHeaders();
  return this.http.get<InventoryReport[]>(`${this.baseUrl}/equipment/get_equipment_list_with_serializer/`, { headers })
    .pipe(catchError(this.handleError));
}

    
getAssignmentHistory(serialNumber:string): Observable<any>{
      const headers = this.getHeaders();  
      return this.http.get<any[]>(`${this.baseUrl}/assignment/get_assignment_history/?serial_number=${serialNumber}`,{ headers})
      .pipe(catchError(this.handleError) // Add centralized error handling
      );
      }

      getImageApi(imageUrl:string): Observable<any>{
        const headers = this.getHeaders();  
        return this.http.get(`${this.baseUrl}/utility/download/file/?file_name=${imageUrl}`,{headers,responseType: 'blob'});
      }

      getEmployeeRetirementList() : Observable<EmployeeRetirement[]>{
        const headers = this.getHeaders();  
        return this.http.get<EmployeeRetirement[]>(`${this.baseUrl}/assignment/retirement_report/`,{ headers}).pipe(catchError(this.handleError));
      }

      getequipmentoverview_dashboard():Observable<any>{
        const headers = this.getHeaders(); 
        return this.http.get(`${this.baseUrl}/equipment/get_equipment_overview/`,{ headers});

      }
      getcondition_summary_dashboard():Observable<any>{
        const headers = this.getHeaders(); 
        return this.http.get(`${this.baseUrl}/equipment/get_equipment_condition_summary/`,{ headers});

      }
      get_assignment_overview_dashboard():Observable<any>{
        const headers = this.getHeaders(); 
        return this.http.get(`${this.baseUrl}/assignment/get_assignment_overview/`,{ headers});

      }
      get_purchase_and_warranty_summary_dashboard():Observable<any>{
        const headers = this.getHeaders(); 
        return this.http.get(`${this.baseUrl}/equipment/get_purchase_and_warranty_summary/`,{ headers});

      }

      
invDeviecs_ViewEquipmentList(pageNumber: number, pageSize: number,search:any):  Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.baseUrl}/equipment/get_equipment_list_with_pagination/?page_number=${pageNumber}&page_size=${pageSize}&search=${search}`,{headers});
  }



  invDeviecs_addCategory(new_category: any): Observable<any> {
    // const payload = JSON.stringify(new_category);
    const headers = this.getHeaders();
    return this.http.post(`${this.baseUrl}/misc/add-category/ `, new_category,{headers}).pipe(catchError(this.handleError));
  }
  invDeviecs_viewSubCategory(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/misc/category_subcategory_all/`);
  }
  invDeviecs_addSubCategory(sub_category: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(`${this.baseUrl}/misc/add-subcategory/`, sub_category,{headers}).pipe(catchError(this.handleError));
  
  }
  invDeviecs_viewCategory(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/categories`).pipe(catchError(this.handleError));
  }

  invDeviecs_addPruchaseOrder(purchaseorder: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(`${this.baseUrl}/order/create_order/`, purchaseorder,{headers}).pipe(catchError(this.handleError));
  
  }

  invDeviecs_UpdatePruchaseOrder(purchaseorder: any): Observable<any> {
    const headers = this.getHeaders();
    const purchase_id = purchaseorder.id;
    alert(purchaseorder)
    return this.http.put(`${this.baseUrl}/order/update_order/${purchase_id}/`, purchaseorder,{headers}).pipe(catchError(this.handleError));
  
  }
    //to get the PO list for LOV 
    invDeviecs_ViewPruchaseOrderbyid(order_number:any):Observable<Order[]> {
      // alert(order_number);
      const headers = this.getHeaders();
      return this.http.get<Order[]>(`${this.baseUrl}/order/get_order_list/?po_number=${order_number}`, { headers }).pipe(catchError(this.handleError));
    }
    //to get the PO list for LOV 
    invDeviecs_ViewPruchaseOrder():Observable<Order[]> {
      const headers = this.getHeaders();
      return this.http.get<Order[]>(`${this.baseUrl}/order/get_order_list/`, { headers }).pipe(catchError(this.handleError));
    }
    //to get the PO list for LOV 
    invDeviecs_ViewUserProfile(user_name:any):Observable<any> {
      const headers = this.getHeaders();
      // alert(user_name);
      return this.http.get<any>(`${this.baseUrl}/user/get_user/${user_name}/`, { headers }).pipe(catchError(this.handleError));
    }
    //to get the PO list for LOV 
    invDeviecs_UpdatePasswordforUserProfile(user_name:any,password:any):Observable<any> {
      const headers = this.getHeaders();
      const payload = JSON.stringify(password);
      //  alert(payload);
      return this.http.put(`${this.baseUrl}/user/update_user/${user_name}/`, payload,{ headers }).pipe(catchError(this.handleError));
    }
    //to get the PO list for LOV 
    invDeviecs_SearchInventoryByEMP_LOC(assigned_type:string,assigned_to:string):Observable<any> {
      const headers = this.getHeaders();  
      return this.http.get(`${this.baseUrl}/assignment/get_assignment_history_by_assignee/?assigned_type=${assigned_type}&assigned_to=${assigned_to}`,{ headers }).pipe(catchError(this.handleError));
    }

}
