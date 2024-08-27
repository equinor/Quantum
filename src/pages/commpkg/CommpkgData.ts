export interface CommpkgItem {
  CommissioningPackageNo: string;
  Facility: string;
  Priority3: string;
  CommissioningPhase: string;
}

export interface CommpkgConnection {
  items: CommpkgItem[];
  endCursor: string | null;
  hasNextPage: boolean;
}

export interface CommpkgData {
  commissioningPackages: CommpkgConnection;
}
