export interface CommpkgItem {
  CommissioningPackageNo: string;
  Priority1: string;
  Priority2: string;
  Priority3: string;
  Description: string;
  Location: string;
  Status: string;
  Responsible: string;
  CommissioningPhase: string;
  Facility: string;
  commissioningPackageMilestone: commissioningPackageMilestone;
}

export interface commissioningPackageMilestone {
  items: commissioningPackageMilestoneItem[];
}

export interface commissioningPackageMilestoneItem {
  ForecastDate: Date;
  PlannedDate: Date;
  ActualDate: Date;
}
export interface CommpkgConnection {
  items: CommpkgItem[];
  endCursor: string | null;
  hasNextPage: boolean;
}

export interface CommpkgData {
  commissioningPackages: CommpkgConnection;
}
