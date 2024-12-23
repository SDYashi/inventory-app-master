import Integer from "@zxing/library/esm/core/util/Integer"

export interface signUp{
    id:string
    role:string,
    username:string,
    password:string,
    mobile:number,
    name:string,
    designation:string

}

export interface login{
    username:string,
    password:string
}

export interface inventoryItem{
    make: string,
    model: string,
    category: string,
    order_id: number, //This is PO number id of po table
    receipt_date: string,
    warranty_expiration: string,
    serial_number: string, // Updated form control for multiple serial numbers
    status: string,
    assignment_id:number,
    notes: string,
    sub_category:string,
    condition:string,
    equipment_id:number,
    price:number
}

export interface issueInventory{
    assignee_id:number,
    assigned_type:string,
    assigned_condition:string,
    assigned_date:string,
    equipment_id:number,
    notes:string
   
}

export interface Order {
    id: number;    
    order_number: string;
    po_number: string;
    po_type: string;
    project_id: string;
    project_name: string;
    supplier_id: string;
    supplier_name: string;
    purchase_date: string;
    created_by: string;
    created_on: string;
    updated_by?: string | null;
    updated_on?: string | null;
  }
  
  export interface Assignment {
    id: number;
    equipment: number;
    assigned_to: number;
    assigned_to_details:string
    assigned_type: string;
    assigned_date: string;
    letter_for_issue?: string | null;
    return_date?: string | null;
    assigned_condition: string;
    issue_person_name?: string | null;
    issue_person_code?: string | null;
    returned_condition?: string | null;
    letter_for_return?: string | null;
    return_person_name?: string | null;
    return_person_code?: string | null;
    notes?: string | null;
    created_by: string;
    created_on: string;
    updated_by?: string | null;
    updated_on?: string | null;
  }
  
  export interface InventoryReport {
    id: number;
    order: Order;
    category: string;
    sub_category: string;
    make: string;
    model: string;
    serial_number: string;
    price: string;
    receipt_date: string;
    warranty_expiration: string;
    status: string;
    condition: string;
    assignment_id?: number | null;
    notes: string;
    created_by: string;
    created_on: string;
    updated_by?: string | null;
    updated_on?: string | null;
    assignment?: Assignment | null;
  }
  
  
export interface EmployeeRetirement {
  assigned_condition: string;
  assigned_date: string;
  assigned_to: number;
  assigned_type: string;
  category: string;
  date_of_birth: string;
  designation: string;
  email_address: string;
  employee_name: string;
  employee_number: number;
  equipment_id: number;
  id: number;
  is_retired: boolean;
  issue_person_code: string;
  issue_person_name: string;
  letter_for_issue: string | null;
  make: string;
  model: string;
  notes: string;
  office: string;
  oic_name: string;
  oic_no: number;
  original_date_of_hire: string;
  phone_no: string;
  actual_sepration_date: number;
  return_date: string | null;
  serial_number: string;
  sub_category: string;
  user_person_type: string;
  office_name: string;
}
export interface Equipment{
    id:number,
    category: string,
    sub_category: string,
    make: string,
    model: string,
    serial_number:string,
    price: number,
    receipt_date: string,
    warranty_expiration:string,
    status: string,
    condition: string,
    assignment_id: number ,
    notes: string,
    assignment?: Assignment | null,
    created_by: string,
    created_on: string,
    order?:Order|null,

}

export interface AssetParticular {
  id: number;
  asset_particulars: string;
  depreciation_rate: string;
  salvage_value: string;
  useful_life: number;
}

export interface ScrapSurveyForm {
  article_description: string;
  article_type: string;
  quantity: string;
  item_unit_cost: string;
  item_total_cost: string;
  receipt_date: string;
  article_condition: string;
  cause_explanation_by_oic: string;
  order_number: string;
  remark: string;
  total_value: string;
  depreciation_percent: string;
  salvage_percent: string;
  salvage_value: string;
  article_age: string;
  depreciated_value: string;
  current_value: string;
  sanctioned_order_no: string;
  sanctioned_order_date: string;
  sanctioned_by: string;
  equipment_ids?: number[]; // Add this line
}


export interface EquipmentResponse {
  status: string;
  message: string;
  data: ArticleData;
}

export interface ArticleData {
  id: number;
  article_description: string;
  article_type: string;
  quantity: number;
  item_unit_cost: string;
  item_total_cost: string;
  receipt_date: string;
  article_condition: string;
  current_value: string;
  created_by: string;
  created_on: string;
  equipment: Equipment[];
}

export interface Equipment {
  id: number;
  model: string;
  category: string;
  price: number;
  serial_number: string;
  receipt_date: string;
  warranty_expiration: string;
  status: string;
  condition: string;
}

 