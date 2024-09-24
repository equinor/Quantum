export interface ChecklistItem {
  ChecklistId: string;
  SignedDate: Date;
  VerifiedDate: Date;
  HandoverPlan: Date;
  FormType: string;
  FormGroup: string;
  FormDiscipline: string;
  TagNo: string;
  TagId: string;
  Facility: string;
  Project: string;
  FormResponsible: string;
  Status: string;
}

export interface ChecklistData {
  checklists: {
    items: ChecklistItem[];
  };
}
