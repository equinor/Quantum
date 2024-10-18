export interface SystemItem {
  SystemId: string;
  SystemNo: string;
  SystemDescription: string;
  CommissioningLead: string;
  SystemOwner: string;
  TechnicalIntegrityResponsible: string;
  OperationResponsible: string;
}

export interface SystemData {
  systems: {
    items: SystemItem[];
  };
}

export const updateSystem = `
    mutation 
      updateSystem(
        $systemId: String!, 
        $systemNo: String!,
        $systemOwner: String!,
        $systemDescription: String!,
        $technicalIntegrityResponsible:String!,
        $operationResponsible: String!
        $commissioningLead: String!
        ) {
      updateSystem(SystemId: $systemId,item:{
        SystemOwner: $systemOwner,
        SystemNo: $systemNo
        SystemDescription: $systemDescription,
        CommissioningLead: $commissioningLead,
        TechnicalIntegrityResponsible: $technicalIntegrityResponsible,
        OperationResponsible: $operationResponsible
      } )  {
   result
}
}
    `;

export const createSystem = `
      mutation 
        createSystem(
          $systemId: String!
          ,$systemNo: String!
          ,$systemDescription: String!
          ,$systemOwner: String!
          ,$commissioningLead: String!
          ,$technicalIntegrityResponsible: String!
          ,$operationResponsible: String!
          ) {
        createSystem(
          item:{
            SystemId: $systemId
            SystemNo: $systemNo
            SystemDescription: $systemDescription
            SystemOwner: $systemOwner
            CommissioningLead: $commissioningLead
            TechnicalIntegrityResponsible: $technicalIntegrityResponsible
            OperationResponsible: $operationResponsible
          }
        )  
        {
        result
        }
      }
      `;
