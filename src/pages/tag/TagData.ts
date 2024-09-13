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

export interface TagData {
  tags: {
    items: TagItem[];
  };
}
