export interface CommpkgItem {
  CommissioningPackageNo: string;
  Facility: string;
  Priority3: string;
  CommissioningPhase: string;
}

export interface CommpkgData {
  commissioningPackages: {
    items: CommpkgItem[];
  };
}
