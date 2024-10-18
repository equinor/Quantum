export interface CommpkgItem {
  CommpkgId: string;
  CommpkgNo: string;
  SubSystemNo: string;
  SubSystemId: string;
  Description: string;
  ProjectMilestone: string;
  SafetyMilestone: string;
  Responsible: string;
  Identifier: string;
  Phase: string;
  Comment: string;
  PlannedStart: Date | null;
  PlannedEnd: Date | null;
  ActualStart: Date | null;
  ActualEnd: Date | null;
  Progress: number;
  Estimate: number;
  CommStatus: string;
  MCStatus: string;
  HandoverStatus: string;
}
export interface CommpkgConnection {
  items: CommpkgItem[];
  endCursor: string | null;
  hasNextPage: boolean;
}

export interface CommpkgData {
  commpkgs: CommpkgConnection;
}

export const updateCommpkg = `
mutation update(
  $commpkgId: String!
  $description: String!
  $projectMilestone: String!
  $safetyMilestone: String!
  $responsible: String!
  $phase: String!
  $identifier: String!
  $comment: String!
  $progress: Int!,
  $estimate: Decimal!,
  $plannedStart: DateTime!,
  $plannedEnd: DateTime!,

) {
  updateCommpkg(CommpkgId: $commpkgId,item:{
    Description: $description
    ProjectMilestone:  $projectMilestone
    SafetyMilestone: $safetyMilestone
    Responsible: $responsible
    Phase: $phase
    Identifier: $identifier
    Comment: $comment
    Progress: $progress
    Estimate: $estimate
    PlannedStart: $plannedStart
    PlannedEnd: $plannedEnd

  } ) {result}
}
  `;

export const getCommpkg = `query getData(){
      commpkgs() {
        items {
          CommpkgId
          CommpkgNo
          PlannedEnd
          ProjectMilestone
          Comment
          HandoverStatus
          PlannedStart
          ActualStart
          ActualEnd
          Responsible
          Progress
          Estimate
          Description
          SubSystemNo
          SubSystemId
          Identifier
          Phase
          CommStatus
          MCStatus
          SafetyMilestone
        }
      }
    }`;

export const createCommpkg = `
    mutation createCommpkg(
      $commpkgId: String!,
      $commpkgNo: String!,
      $subSystemId: String!,
      $subSystemNo: String!,
      $description: String!,
      $projectMilestone: String!,
      $safetyMilestone: String!,
      $responsible: String!,
      $identifier: String!,
      $phase: String!
      $comment: String!,
      $progress: Int!,
      $estimate: Decimal!,
      $plannedStart: DateTime!,
      $plannedEnd: DateTime!,


    ) {
      createCommpkg(
        item: {
          CommpkgId: $commpkgId
          CommpkgNo: $commpkgNo
          SubSystemId: $subSystemId
          SubSystemNo: $subSystemNo
          Description: $description
          ProjectMilestone: $projectMilestone
          SafetyMilestone: $safetyMilestone
          Responsible: $responsible
          Identifier: $identifier
          Phase: $phase
          Comment:  $comment
          Progress: $progress
          Estimate: $estimate
          PlannedStart: $plannedStart
          PlannedEnd: $plannedEnd

        }
      ) {
        result
      }
    }
  `;

export enum Responsible {
  Aker = "Aker",
  Equinor = "Equinor",
  Aibel = "Aibel",
  IKM = "IKM",
}
