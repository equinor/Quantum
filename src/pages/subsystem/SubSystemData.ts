export interface SubSystemItem {
  SubSystemId: string;
  SubSystemNo: string;
  SystemId: string;
  SystemNo: string;
  Description: string;
}

export interface SubSystemData {
  subSystems: {
    items: SubSystemItem[];
  };
}

export const updateSubSystem = `
      mutation updateSubSystem(
        $subSystemId: String!,
        $subSystemNo: String!,
        $systemNo: String!,
        $description: String!
      ) {
       updateSubSystem(
       SubSystemId: $subSystemId,
          item: {
            SubSystemNo: $subSystemNo,
            SystemNo: $systemNo,
            Description: $description
          }
        ) {
          result
        }
      }
    `;

export const createSubSystem = `
    mutation createSubSystem(
      $subSystemId: String!,
      $subSystemNo: String!,
      $systemId: String!,
      $systemNo: String!,
      $description: String!
    ) {
      createSubSystem(
        item: {
          SubSystemId: $subSystemId,
          SubSystemNo: $subSystemNo,
          SystemId: $systemId,
          SystemNo: $systemNo,
          Description: $description
        }
      ) {
        result
      }
    }
  `;
