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
