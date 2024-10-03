export interface CommpkgItem {
  CommpkgId: string;
  CommpkgNo: string;
  ProjectMilestone: string;
  Comment: string;
  HandoverStatus: string;
  PlannedStart: Date;
  PlannedEnd: Date;
  ActualStart: Date | null;
  ActualEnd: Date | null;
  Responsible: string;
  Progress: number;
  Estimate: number;
  Description: string;
  SubSystemNo: string;
  SubSystemId: string;
  Identifier: string;
  Phase: string;
  CommStatus: string;
  MCStatus: string;
  SafetyMilestone: string;
}
export interface CommpkgConnection {
  items: CommpkgItem[];
  endCursor: string | null;
  hasNextPage: boolean;
}

export interface CommpkgData {
  commpkgs: CommpkgConnection;
}
