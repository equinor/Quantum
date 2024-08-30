export interface CommpkgItem {
  CommissioningPackageNo: string;
  Facility: string;
  Priority3: string;
  CommissioningPhase: string;
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
