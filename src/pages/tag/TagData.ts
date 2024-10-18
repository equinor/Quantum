export interface TagItem {
  TagId: string;
  TagNo: string;
  Description: string;
  Status: string;
  Commpkg: string;
  CommpkgId: string;
  Mcpkg: string;
  McpkgId: string;
  TagMountedOn: string;
  Location: string;
  Register: string;
  Discipline: string;
}

export interface TagConnection {
  items: TagItem[];
  endCursor: string | null;
  hasNextPage: boolean;
}

export interface TagData {
  tags: TagConnection;
}

export const updateTag = `
        mutation updateTag(
            $tagId: String!,
            $tagNo: String!,
            $description: String!,
            $discipline: String!,
            $register: String!,
            $location: String!,
            $status: String!,
        ) {
        updateTag(TagId: $tagId,
          item: {
            TagNo: $tagNo,
            Description: $description,
            Discipline: $discipline,
            Register: $register
            Status: $status
            Location: $location
          }
        ) {
          result
        }
      }
    `;
export const createTag = `
            mutation createTag(
        $tagId: String!,
        $tagNo: String!,
        $description: String!,
        $discipline: String!,
        $register: String!,
        $location: String!,
        $status: String!,

      ) {
        createTag(
          item: {
            TagId: $tagId,
            TagNo: $tagNo,
            Description: $description,
            Discipline: $discipline,
            Register: $register
            Status: $status
            Location: $location
        
          }
        ) {
          result
        }
      }
    `;
