export const createCommpkg = `
      mutation createCommpkg(
        $commpkgId: String!,
        $commpkgNo: String!,
        $subSystemId: String!,
        $subSystemNo: String!,
        $description: String!,
        $projectMilestone: String!,
        $safetyMilestone: String!,
        $comment: String!,
        $progress: Int!,
        $estimate: Decimal!,
        $plannedStart: DateTime!,
        $plannedEnd: DateTime!,
        $responsible: String!,
        $identifier: String!,
        $phase: String!

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
            Comment:  $comment
            Progress: $progress
            Estimate: $estimate
            PlannedStart: $plannedStart
            PlannedEnd: $plannedEnd
            Responsible: $responsible
            Identifier: $identifier
            Phase: $phase
          }
        ) {
          result
        }
      }
    `;
