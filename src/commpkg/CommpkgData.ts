export type CommpkgData = {
  data: {
    commissioningPackages: {
      items: {
        CommissioningPackageNo: string;
        Facility: string;
        Priority3: string;
        CommissioningPhase: string;
      }[];
    };
  };
};
